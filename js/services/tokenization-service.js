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
            // Esperar a que tiktoken se cargue
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Verificar si tiktoken está disponible
            if (typeof tiktoken !== 'undefined') {
                try {
                    // Inicializar codificación cl100k_base (tokenizador GPT-4)
                    this.encoder = tiktoken.get_encoding('cl100k_base');
                    this.isInitialized = true;
                    console.log('✅ Tiktoken inicializado correctamente');
                } catch (error) {
                    console.warn('⚠️ No se pudo inicializar tiktoken:', error);
                    this.isInitialized = false;
                }
            } else {
                console.warn('⚠️ Librería tiktoken no encontrada, usando tokenización de respaldo');
                this.isInitialized = false;
            }
        } catch (error) {
            console.warn('Error durante la inicialización del tokenizador:', error);
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

        if (this.isInitialized && this.encoder && modelInfo.encoding === MODEL_ENCODINGS.CL100K_BASE) {
            try {
                // Usar tokenización real tiktoken para modelos compatibles
                const encoded = this.encoder.encode(text);
                tokenCount = encoded.length;
                
                // Aplicar ratio específico del modelo para modelos no-OpenAI
                if (modelInfo.tokenRatio) {
                    tokenCount = Math.round(tokenCount * modelInfo.tokenRatio);
                }

                // Crear objetos de token para visualización
                tokens = this.createTokensFromEncoding(text, encoded, modelId);
            } catch (error) {
                console.warn('Error de tokenización:', error);
                return this.fallbackTokenization(text, modelId);
            }
        } else {
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
        // Crear tokens visuales basados en el texto
        const words = text.match(/\S+|\s+/g) || [];
        const tokens = [];
        
        // Distribuir tokens entre palabras proporcionalmente
        const avgTokensPerWord = encoded.length / words.length;
        
        words.forEach((word, index) => {
            if (/\s/.test(word)) {
                tokens.push({
                    text: word,
                    type: 'espacio en blanco',
                    id: `token_${tokens.length}`
                });
            } else if (/^\d+$/.test(word)) {
                tokens.push({
                    text: word,
                    type: 'number',
                    id: `token_${tokens.length}`
                });
            } else if (/^[.,!?;:'"()\[\]{}]+$/.test(word)) {
                tokens.push({
                    text: word,
                    type: 'punctuation',
                    id: `token_${tokens.length}`
                });
            } else {
                // For longer words, might be split into subwords
                if (word.length > 6 && avgTokensPerWord > 1.3) {
                    const mid = Math.ceil(word.length / 2);
                    tokens.push({
                        text: word.slice(0, mid),
                        type: 'palabra',
                        id: `token_${tokens.length}`
                    });
                    tokens.push({
                        text: word.slice(mid),
                        type: 'subword',
                        id: `token_${tokens.length}`
                    });
                } else {
                    tokens.push({
                        text: word,
                        type: 'palabra',
                        id: `token_${tokens.length}`
                    });
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

        // Crear tokens simples para visualización
        const segments = text.match(/\S+|\s+/g) || [];
        const tokens = segments.map((segment, index) => ({
            text: segment,
            type: /\s/.test(segment) ? 'espacio en blanco' : 
                  /^\d+$/.test(segment) ? 'number' :
                  /^[.,!?;:'"()\[\]{}]+$/.test(segment) ? 'punctuation' : 'palabra',
            id: `token_${index}`
        }));

        return { tokens, count: tokenCount };
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
