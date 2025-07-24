/**
 * Servicio de Tokenización
 * Maneja toda la lógica de tokenización incluyendo integración tiktoken y métodos de respaldo
 */

class TokenizationService {
    constructor() {
        this.encoder = null;
        this.isInitialized = false;
        this.initPromise = this.initializeTokenizer();
    }

    /**
     * Inicializa el tokenizador tiktoken
     * @returns {Promise<void>}
     */
    async initializeTokenizer() {
        try {
            console.log('Esperando carga de tiktoken...');
            
            // Esperar hasta que tiktoken esté disponible (real o respaldo)
            let attempts = 0;
            const maxAttempts = 20; // 10 segundos máximo
            
            while (attempts < maxAttempts) {
                if (typeof window !== 'undefined' && window.tiktokenLoaded) {
                    break;
                }
                await new Promise(resolve => setTimeout(resolve, 500));
                attempts++;
            }
            
            console.log('Verificando disponibilidad de tiktoken...');
            
            // Intentar diferentes formas de acceder a tiktoken
            let tiktokenLib = null;
            
            // Verificar en contexto global
            if (typeof tiktoken !== 'undefined') {
                tiktokenLib = tiktoken;
                console.log('tiktoken encontrado en contexto global');
            }
            // Verificar en window
            else if (typeof window !== 'undefined' && window.tiktoken) {
                tiktokenLib = window.tiktoken;
                console.log('tiktoken encontrado en window');
            }
            
            if (tiktokenLib && typeof tiktokenLib.get_encoding === 'function') {
                try {
                    console.log('Inicializando encoder cl100k_base...');
                    this.encoder = tiktokenLib.get_encoding('cl100k_base');
                    this.isInitialized = true;
                    
                    // Determinar si es tiktoken real o respaldo
                    const isRealTiktoken = !window.tiktokenFallback;
                    console.log(isRealTiktoken ? 'Tiktoken REAL inicializado correctamente' : '🔧 Tiktoken RESPALDO inicializado correctamente');
                    
                    // Hacer una prueba rápida
                    const testTokens = this.encoder.encode('Hola mundo');
                    console.log('Prueba de tokenización:', {
                        texto: 'Hola mundo',
                        tokens: testTokens,
                        tipo: isRealTiktoken ? 'IDs REALES' : 'IDs APROXIMADOS'
                    });
                    
                    // Guardar el tipo para referencia
                    this.isRealTiktoken = isRealTiktoken;
                    
                } catch (error) {
                    console.error('Error al inicializar encoder tiktoken:', error);
                    this.isInitialized = false;
                }
            } else {
                console.error('tiktoken no está disponible después de esperar');
                this.isInitialized = false;
            }
        } catch (error) {
            console.error('Error durante la inicialización del tokenizador:', error);
            this.isInitialized = false;
        }
    }

    /**
     * Espera a que el tokenizador sea inicializado
     * @returns {Promise<void>}
     */
    async waitForInitialization() {
        await this.initPromise;
    }

    /**
     * Tokeniza texto usando el método apropiado
     * @param {string} text - Texto a tokenizar
     * @param {string} modelId - Identificador del modelo
     * @returns {Promise<{tokens: Array, count: number}>}
     */
    async tokenizeText(text, modelId) {
        if (!text.trim()) {
            return { tokens: [], count: 0 };
        }

        await this.waitForInitialization();

        const modelInfo = MODELS_DATA[modelId];
        let tokenCount = 0;
        let tokens = [];

        // Intentar usar tiktoken para obtener IDs reales y precisos
        if (this.isInitialized && this.encoder && modelInfo.encoding === MODEL_ENCODINGS.CL100K_BASE) {
            try {
                console.log('Tokenizando con tiktoken para obtener IDs precisos...');
                
                // Codificar el texto para obtener los IDs numéricos reales
                const encoded = this.encoder.encode(text);
                tokenCount = encoded.length;
                
                console.log(`Texto: "${text}" → ${tokenCount} tokens`);
                console.log('IDs codificados:', encoded);
                
                // Aplicar ratio específico del modelo para modelos no-OpenAI
                if (modelInfo.tokenRatio) {
                    tokenCount = Math.round(tokenCount * modelInfo.tokenRatio);
                }

                // Crear objetos de token con IDs reales de tiktoken
                tokens = this.createTokensFromEncoding(text, encoded, modelId);
                
                // Verificar que tenemos los IDs correctos
                const idsVerification = tokens.map(t => t.tokenId);
                console.log('Verificación de IDs capturados:', idsVerification);
                
            } catch (error) {
                console.error('Error de tokenización tiktoken:', error);
                return this.fallbackTokenization(text, modelId);
            }
        } else {
            console.log('Usando tokenización de respaldo (tiktoken no disponible)');
            // Tokenización de respaldo para otras codificaciones o cuando tiktoken falla
            return this.fallbackTokenization(text, modelId);
        }

        return {
            tokens: tokens,
            count: tokenCount
        };
    }

    /**
     * Crea tokens visuales desde la codificación tiktoken
     * @param {string} text - Texto original
     * @param {Array} encoded - Array de tokens codificados
     * @param {string} modelId - Identificador del modelo
     * @returns {Array} Objetos de token para visualización
     */
    createTokensFromEncoding(text, encoded, modelId) {
        try {
            // Verificar que tenemos el encoder y los datos codificados
            if (!this.encoder || !encoded || encoded.length === 0) {
                console.warn('Encoder no disponible o datos vacíos');
                return this.createTokensFallback(text, encoded);
            }

            const tokens = [];
            const isApproximate = !this.isRealTiktoken; // Marcar si son IDs aproximados
            
            // Decodificar cada token individual para obtener el texto exacto
            for (let i = 0; i < encoded.length; i++) {
                const tokenId = encoded[i]; // Este es el ID numérico del token
                
                try {
                    // Decodificar solo este token para obtener su texto exacto
                    const tokenText = this.encoder.decode([tokenId]);
                    
                    // Determinar el tipo de token basado en su contenido
                    let type = 'palabra';
                    if (/^\s+$/.test(tokenText)) {
                        type = 'espacio_en_blanco';
                    } else if (/^\d+$/.test(tokenText.trim())) {
                        type = 'number';
                    } else if (/^[.,!?;:'"()\[\]{}]+$/.test(tokenText.trim())) {
                        type = 'punctuation';
                    } else if (tokenText.length === 1 && /[^\w\s]/.test(tokenText)) {
                        type = 'special';
                    } else if (tokenText.startsWith(' ')) {
                        type = 'palabra_con_espacio';
                    } else if (tokenText.length <= 2 && !/^\s+$/.test(tokenText)) {
                        type = 'subword';
                    }

                    tokens.push({
                        text: tokenText,
                        type: type,
                        id: `token_${i}`,
                        tokenId: tokenId, // El ID numérico del token
                        index: i,
                        isApproximate: isApproximate // Marcar si es aproximado
                    });
                } catch (decodeError) {
                    console.warn(`Error decodificando token ${tokenId}:`, decodeError);
                    // Si no se puede decodificar, usar el ID como texto
                    tokens.push({
                        text: `[${tokenId}]`,
                        type: 'unknown',
                        id: `token_${i}`,
                        tokenId: tokenId,
                        index: i,
                        isApproximate: true // Siempre aproximado si hay error
                    });
                }
            }

            const typeMessage = isApproximate ? 'IDs APROXIMADOS' : 'IDs REALES';
            console.log(`Tokens creados (${typeMessage}):`, tokens.map(t => `"${t.text}" → ${t.tokenId}`));
            return tokens;
        } catch (error) {
            console.error('Error en createTokensFromEncoding:', error);
            return this.createTokensFallback(text, encoded);
        }
    }

    /**
     * Método de respaldo para crear tokens cuando falla la decodificación individual
     * @param {string} text - Texto original
     * @param {Array} encoded - Array de tokens codificados
     * @returns {Array} Objetos de token para visualización
     */
    createTokensFallback(text, encoded) {
        // Crear tokens visuales basados en el texto
        const words = text.match(/\S+|\s+/g) || [];
        const tokens = [];
        
        // Distribuir tokens entre palabras proporcionalmente
        const avgTokensPerWord = encoded.length / words.length;
        let tokenIndex = 0;
        
        words.forEach((word, index) => {
            if (/\s/.test(word)) {
                tokens.push({
                    text: word,
                    type: 'espacio en blanco',
                    id: `token_${tokens.length}`,
                    tokenId: encoded[tokenIndex] || 0
                });
                tokenIndex++;
            } else if (/^\d+$/.test(word)) {
                tokens.push({
                    text: word,
                    type: 'number',
                    id: `token_${tokens.length}`,
                    tokenId: encoded[tokenIndex] || 0
                });
                tokenIndex++;
            } else if (/^[.,!?;:'"()\[\]{}]+$/.test(word)) {
                tokens.push({
                    text: word,
                    type: 'punctuation',
                    id: `token_${tokens.length}`,
                    tokenId: encoded[tokenIndex] || 0
                });
                tokenIndex++;
            } else {
                // For longer words, might be split into subwords
                if (word.length > 6 && avgTokensPerWord > 1.3) {
                    const mid = Math.ceil(word.length / 2);
                    tokens.push({
                        text: word.slice(0, mid),
                        type: 'palabra',
                        id: `token_${tokens.length}`,
                        tokenId: encoded[tokenIndex] || 0
                    });
                    tokenIndex++;
                    tokens.push({
                        text: word.slice(mid),
                        type: 'subword',
                        id: `token_${tokens.length}`,
                        tokenId: encoded[tokenIndex] || 0
                    });
                    tokenIndex++;
                } else {
                    tokens.push({
                        text: word,
                        type: 'palabra',
                        id: `token_${tokens.length}`,
                        tokenId: encoded[tokenIndex] || 0
                    });
                    tokenIndex++;
                }
            }
        });

        return tokens;
    }

    /**
     * Método de tokenización de respaldo cuando tiktoken no está disponible
     * @param {string} text - Texto a tokenizar
     * @param {string} modelId - Identificador del modelo
     * @returns {{tokens: Array, count: number}}
     */
    fallbackTokenization(text, modelId) {
        const modelInfo = MODELS_DATA[modelId];
        
        console.log('Usando tokenización de respaldo - IDs no serán precisos');
        
        // Tokenización base - aproximadamente 4 caracteres por token para inglés
        let baseTokens = Math.ceil(text.length / 4);
        
        // Ajustar para límites de palabras - estimación más realista
        const words = text.split(/\s+/).filter(w => w.length > 0);
        const avgWordLength = text.length / words.length;
        
        // Aproximación más sofisticada
        if (avgWordLength > 6) {
            baseTokens = Math.ceil(baseTokens * 1.1); // Palabras más largas = más tokens de subpalabras
        } else if (avgWordLength < 4) {
            baseTokens = Math.ceil(baseTokens * 0.9); // Palabras más cortas = menos tokens
        }
        
        // Aplicar multiplicadores específicos del modelo
        let tokenCount = baseTokens;
        if (modelInfo.tokenRatio) {
            tokenCount = Math.round(tokenCount * modelInfo.tokenRatio);
        }

        // Crear tokens simples para visualización con IDs consistentes (no precisos)
        const segments = text.match(/\S+|\s+/g) || [];
        const tokens = segments.map((segment, index) => {
            // Crear un ID determinista basado en el contenido y posición
            // Esto no es el ID real de tiktoken, pero será consistente
            const deterministicId = this.createDeterministicId(segment, index);
            
            return {
                text: segment,
                type: /\s/.test(segment) ? 'espacio_en_blanco' : 
                      /^\d+$/.test(segment) ? 'number' :
                      /^[.,!?;:'"()\[\]{}]+$/.test(segment) ? 'punctuation' : 'palabra',
                id: `token_${index}`,
                tokenId: deterministicId, // ID determinista, NO el ID real de tiktoken
                index: index,
                isApproximate: true // Marcar como aproximado
            };
        });

        return { tokens, count: tokenCount };
    }

    /**
     * Crea un ID determinista para el método de respaldo
     * @param {string} text - Texto del token
     * @param {number} index - Índice del token
     * @returns {number} ID determinista
     */
    createDeterministicId(text, index) {
        // Crear un hash simple y determinista del contenido
        let hash = 0;
        for (let i = 0; i < text.length; i++) {
            const char = text.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convertir a 32-bit integer
        }
        // Combinar con el índice para unicidad y mantener en rango razonable
        return Math.abs(hash + index * 1000) % 100000 + 10000;
    }

    /**
     * Obtiene el nombre de visualización para una codificación de tokenizador
     * @param {string} encoding - Identificador de codificación
     * @returns {string}
     */
    getTokenizerName(encoding) {
        const names = {
            [MODEL_ENCODINGS.O200K_BASE]: 'Tokenizador GPT-4o',
            [MODEL_ENCODINGS.CL100K_BASE]: 'Tokenizador GPT-4',
            [MODEL_ENCODINGS.P50K_BASE]: 'Tokenizador GPT-3',
            [MODEL_ENCODINGS.R50K_BASE]: 'Tokenizador GPT-2'
        };
        return names[encoding] || encoding;
    }

    /**
     * Obtiene la descripción del algoritmo para un modelo
     * @param {string} modelId - Identificador del modelo
     * @returns {string}
     */
    getAlgorithmName(modelId) {
        if (modelId.includes('gpt-4o')) return 'o200k_base (GPT Más Reciente)';
        if (modelId.includes('gpt')) return 'cl100k_base (BPE)';
        if (modelId.includes('claude')) return 'Tokenización Claude (~20% más tokens)';
        if (modelId.includes('llama')) return 'Tokenización Llama (~15% menos tokens)';
        if (modelId.includes('gemini') || modelId.includes('palm')) return 'Google SentencePiece (~10% más)';
        if (modelId.includes('mistral')) return 'Tokenización Mistral (~10% menos)';
        if (modelId.includes('command')) return 'Tokenización Cohere (~5% más)';
        return 'Tokenización Aproximada';
    }
}

// Hacer la clase disponible globalmente
if (typeof window !== 'undefined') {
    window.TokenizationService = TokenizationService;
}
