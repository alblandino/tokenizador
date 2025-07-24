/**
 * Calculadora de Estadísticas
 * Maneja el cálculo de estadísticas de texto incluyendo tokens, caracteres, palabras y costo
 */

class StatisticsCalculator {
    constructor() {}

    /**
     * Calcula estadísticas completas para el texto y modelo dados
     * @param {string} text - Texto de entrada
     * @param {Object} tokenResult - Resultado del servicio de tokenización
     * @param {string} modelId - Identificador del modelo
     * @returns {Object} Objeto de estadísticas
     */
    calculateStatistics(text, tokenResult, modelId) {
        const modelInfo = MODELS_DATA[modelId];
        
        if (!modelInfo) {
            throw new Error(`Modelo desconocido: ${modelId}`);
        }

        const tokenCount = tokenResult.count || 0;
        const charCount = text.length;
        const wordCount = this.countWords(text);
        const costEstimate = this.calculateCost(tokenCount, modelInfo);

        return {
            tokenCount,
            charCount,
            wordCount,
            costEstimate,
            contextUtilization: this.calculateContextUtilization(tokenCount, modelInfo.contextLimit),
            tokensPerWord: wordCount > 0 ? (tokenCount / wordCount) : 0,
            inputCostPer1M: modelInfo.inputCost,
            outputCostPer1M: modelInfo.outputCost
        };
    }

    /**
     * Cuenta palabras en el texto usando detección inteligente de límites de palabras
     * @param {string} text - Texto de entrada
     * @returns {number} Conteo de palabras
     */
    countWords(text) {
        if (!text.trim()) return 0;
        
        // Dividir por espacios en blanco y filtrar cadenas vacías
        return text.split(/\s+/).filter(word => word.length > 0).length;
    }

    /**
     * Calcula la estimación de costo basada en el conteo de tokens y precios del modelo
     * @param {number} tokenCount - Número de tokens
     * @param {Object} modelInfo - Objeto de información del modelo
     * @returns {number} Estimación de costo
     */
    calculateCost(tokenCount, modelInfo) {
        if (!modelInfo || !modelInfo.inputCost) {
            return 0;
        }
        // Calcular costo basado en tokens de entrada (costo por 1M tokens)
        return (tokenCount / 1000000) * modelInfo.inputCost;
    }

    /**
     * Calcula el porcentaje de utilización de la ventana de contexto
     * @param {number} tokenCount - Número de tokens
     * @param {number} contextLimit - Límite de contexto del modelo
     * @returns {number} Porcentaje de utilización (0-100)
     */
    calculateContextUtilization(tokenCount, contextLimit) {
        return contextLimit > 0 ? Math.min((tokenCount / contextLimit) * 100, 100) : 0;
    }

    /**
     * Determina si el texto excede el límite de contexto del modelo
     * @param {number} tokenCount - Número de tokens
     * @param {string} modelId - Identificador del modelo
     * @returns {boolean} Verdadero si excede el límite
     */
    exceedsContextLimit(tokenCount, modelId) {
        const modelInfo = MODELS_DATA[modelId];
        return modelInfo ? tokenCount > modelInfo.contextLimit : false;
    }

    /**
     * Obtiene mensaje de advertencia si se excede el límite de contexto
     * @param {number} tokenCount - Número de tokens
     * @param {string} modelId - Identificador del modelo
     * @returns {string|null} Mensaje de advertencia o null
     */
    getContextWarning(tokenCount, modelId) {
        const modelInfo = MODELS_DATA[modelId];
        
        if (!modelInfo) return null;

        const utilization = this.calculateContextUtilization(tokenCount, modelInfo.contextLimit);
        
        if (utilization >= 100) {
            return `⚠️ Texto excede el límite de contexto del modelo (${modelInfo.contextLimit.toLocaleString()} tokens)`;
        } else if (utilization >= 90) {
            return `⚠️ Cerca del límite de contexto (${utilization.toFixed(1)}% utilizado)`;
        } else if (utilization >= 75) {
            return `ℹ️ Alto uso del contexto (${utilization.toFixed(1)}% utilizado)`;
        }
        
        return null;
    }

    /**
     * Formatea estadísticas para visualización
     * @param {Object} stats - Objeto de estadísticas
     * @returns {Object} Estadísticas formateadas
     */
    formatStatistics(stats) {
        return {
            tokenCount: stats.tokenCount.toLocaleString(),
            charCount: stats.charCount.toLocaleString(),
            wordCount: stats.wordCount.toLocaleString(),
            costEstimate: `$${stats.costEstimate.toFixed(6)}`,
            contextUtilization: `${stats.contextUtilization.toFixed(1)}%`,
            tokensPerWord: stats.tokensPerWord.toFixed(2),
            inputCostPer1M: `$${stats.inputCostPer1M}/1M`,
            outputCostPer1M: `$${stats.outputCostPer1M}/1M`
        };
    }

    /**
     * Compara estadísticas entre diferentes modelos
     * @param {string} text - Texto de entrada
     * @param {Array} modelIds - Array de identificadores de modelos a comparar
     * @param {Object} tokenizationService - Instancia del servicio de tokenización
     * @returns {Promise<Array>} Array de objetos de comparación
     */
    async compareModels(text, modelIds, tokenizationService) {
        const comparisons = [];

        for (const modelId of modelIds) {
            try {
                const tokenResult = await tokenizationService.tokenizeText(text, modelId);
                const stats = this.calculateStatistics(text, tokenResult, modelId);
                
                comparisons.push({
                    modelId,
                    company: MODELS_DATA[modelId]?.company || 'Desconocido',
                    stats,
                    formatted: this.formatStatistics(stats)
                });
            } catch (error) {
                console.warn(`Error comparando modelo ${modelId}:`, error);
            }
        }

        return comparisons.sort((a, b) => a.stats.costEstimate - b.stats.costEstimate);
    }

    /**
     * Obtiene métricas de eficiencia para un modelo
     * @param {Object} stats - Objeto de estadísticas
     * @returns {Object} Métricas de eficiencia
     */
    getEfficiencyMetrics(stats) {
        return {
            costEfficiency: stats.tokenCount > 0 ? (stats.costEstimate / stats.tokenCount * 1000) : 0,
            compressionRatio: stats.charCount > 0 ? (stats.tokenCount / stats.charCount) : 0,
            verbosityIndex: stats.wordCount > 0 ? (stats.tokenCount / stats.wordCount) : 0
        };
    }
}

// Hacer la clase disponible globalmente
if (typeof window !== 'undefined') {
    window.StatisticsCalculator = StatisticsCalculator;
}
