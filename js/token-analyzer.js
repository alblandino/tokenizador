/**
 * Aplicación Analizador de Tokens
 * Clase principal de la aplicación que orquesta todos los componentes
 */

// Todas las dependencias se cargan globalmente vía etiquetas script

class TokenAnalyzer {
    constructor() {
        this.tokenizationService = new TokenizationService();
        this.uiController = new UIController();
        this.statisticsCalculator = new StatisticsCalculator();
        
        this.init();
    }

    /**
     * Inicializa la aplicación
     */
    async init() {
        try {
            // Configurar manejadores de eventos
            this.uiController.setEventHandlers({
                onTextChange: () => this.handleTextChange(),
                onModelChange: () => this.handleModelChange(),
                onClear: () => this.handleClear()
            });

            // Esperar a que el servicio de tokenización se inicialice
            await this.tokenizationService.waitForInitialization();

            // Activar cambio inicial de modelo para configurar la UI
            this.uiController.triggerModelChange();

            console.log('✅ Analizador de Tokens inicializado correctamente');
        } catch (error) {
            console.error('Error al inicializar el Analizador de Tokens:', error);
        }
    }

    /**
     * Maneja los cambios en el texto de entrada
     */
    async handleTextChange() {
        await this.performRealTimeAnalysis();
    }

    /**
     * Maneja los cambios en la selección de modelo
     */
    async handleModelChange() {
        const selectedModel = this.uiController.getSelectedModel();
        
        // Actualizar la información del modelo en pantalla
        this.uiController.updateModelInfo(selectedModel, this.tokenizationService);
        
        // Realizar análisis con el nuevo modelo
        await this.performRealTimeAnalysis();
    }

    /**
     * Maneja los clics del botón limpiar
     */
    handleClear() {
        this.uiController.clearTextInput();
        this.resetDisplays();
    }

    /**
     * Realiza análisis de texto en tiempo real
     */
    async performRealTimeAnalysis() {
        const text = this.uiController.getTextInput().trim();
        const selectedModel = this.uiController.getSelectedModel();

        if (!text) {
            this.resetDisplays();
            return;
        }

        try {
            // Mostrar estado de carga
            this.uiController.showLoading();

            // Tokenizar texto
            const tokenResult = await this.tokenizationService.tokenizeText(text, selectedModel);
            
            // Calcular estadísticas
            const statistics = this.statisticsCalculator.calculateStatistics(
                text, 
                tokenResult, 
                selectedModel
            );

            // Actualizar la UI con los resultados
            this.updateDisplays(tokenResult, statistics);

            // Verificar advertencias de contexto
            this.showContextWarnings(statistics, selectedModel);

        } catch (error) {
            console.error('Error durante el análisis:', error);
            this.showError('Error al analizar el texto. Por favor, inténtalo de nuevo.');
        }
    }

    /**
     * Actualiza todos los componentes de visualización con los resultados del análisis
     * @param {Object} tokenResult - Resultados de la tokenización
     * @param {Object} statistics - Estadísticas calculadas
     */
    updateDisplays(tokenResult, statistics) {
        // Actualizar visualización de estadísticas
        this.uiController.updateStatistics(statistics);
        
        // Actualizar visualizaciones de tokens
        this.uiController.updateTokenVisualization(tokenResult.tokens);
        this.uiController.updateTokensList(tokenResult.tokens);
    }

    /**
     * Reinicia todas las visualizaciones al estado vacío
     */
    resetDisplays() {
        this.uiController.updateStatistics({
            tokenCount: 0,
            charCount: 0,
            wordCount: 0,
            costEstimate: 0
        });
        
        this.uiController.resetVisualizations();
    }

    /**
     * Muestra advertencias de límite de contexto si es aplicable
     * @param {Object} statistics - Estadísticas calculadas
     * @param {string} modelId - Identificador del modelo
     */
    showContextWarnings(statistics, modelId) {
        const warning = this.statisticsCalculator.getContextWarning(
            statistics.tokenCount, 
            modelId
        );
        
        if (warning) {
            this.showWarning(warning);
        }
    }

    /**
     * Muestra un mensaje de advertencia al usuario
     * @param {string} message - Mensaje de advertencia
     */
    showWarning(message) {
        // Esto podría mejorarse con un sistema de notificaciones apropiado
        console.warn(message);
        
        // Por ahora, podemos agregar la advertencia a la UI si es necesario
        // Esto es un marcador de posición para futuras mejoras
    }

    /**
     * Muestra un mensaje de error al usuario
     * @param {string} message - Mensaje de error
     */
    showError(message) {
        // Esto podría mejorarse con un sistema de notificaciones apropiado
        console.error(message);
        
        // Por ahora, podemos agregar el error a la UI si es necesario
        // Esto es un marcador de posición para futuras mejoras
    }

    /**
     * Obtiene el estado actual de la aplicación
     * @returns {Object} Estado de la aplicación
     */
    getState() {
        return {
            currentText: this.uiController.getTextInput(),
            selectedModel: this.uiController.getSelectedModel(),
            isInitialized: this.tokenizationService.isInitialized,
            availableModels: Object.keys(MODELS_DATA)
        };
    }

    /**
     * Realiza comparación de modelos para el texto actual
     * @param {Array} modelIds - Array de IDs de modelos a comparar
     * @returns {Promise<Array>} Resultados de la comparación
     */
    async compareModels(modelIds = ['gpt-4o', 'claude-3.5-sonnet', 'llama-3.1-70b']) {
        const text = this.uiController.getTextInput();
        
        if (!text.trim()) {
            throw new Error('No hay texto para analizar');
        }

        return await this.statisticsCalculator.compareModels(
            text, 
            modelIds, 
            this.tokenizationService
        );
    }

    /**
     * Exporta los resultados del análisis
     * @param {string} format - Formato de exportación ('json', 'csv', 'txt')
     * @returns {Promise<string>} Datos exportados
     */
    async exportResults(format = 'json') {
        const state = this.getState();
        const text = state.currentText;
        
        if (!text.trim()) {
            throw new Error('No hay datos para exportar');
        }

        const tokenResult = await this.tokenizationService.tokenizeText(text, state.selectedModel);
        const statistics = this.statisticsCalculator.calculateStatistics(
            text, 
            tokenResult, 
            state.selectedModel
        );

        const data = {
            timestamp: new Date().toISOString(),
            model: state.selectedModel,
            text: text,
            statistics: statistics,
            tokens: tokenResult.tokens
        };

        switch (format.toLowerCase()) {
            case 'json':
                return JSON.stringify(data, null, 2);
            case 'csv':
                return this.exportToCSV(data);
            case 'txt':
                return this.exportToText(data);
            default:
                throw new Error(`Formato de exportación no soportado: ${format}`);
        }
    }

    /**
     * Exporta datos a formato CSV
     * @param {Object} data - Datos a exportar
     * @returns {string} Datos formateados en CSV
     */
    exportToCSV(data) {
        const headers = ['Modelo', 'Longitud del Texto', 'Cantidad de Tokens', 'Cantidad de Palabras', 'Costo Estimado'];
        const values = [
            data.model,
            data.statistics.charCount,
            data.statistics.tokenCount,
            data.statistics.wordCount,
            data.statistics.costEstimate
        ];

        return [headers.join(','), values.join(',')].join('\n');
    }

    /**
     * Exporta datos a formato de texto
     * @param {Object} data - Datos a exportar
     * @returns {string} Datos formateados en texto
     */
    exportToText(data) {
        return `
Reporte de Análisis de Tokens
=============================
Generado: ${data.timestamp}
Modelo: ${data.model}

Estadísticas del Texto:
- Caracteres: ${data.statistics.charCount.toLocaleString()}
- Palabras: ${data.statistics.wordCount.toLocaleString()}
- Tokens: ${data.statistics.tokenCount.toLocaleString()}
- Costo Estimado: $${data.statistics.costEstimate.toFixed(6)}

Texto Original:
${data.text}
        `.trim();
    }
}

// Hacer la clase disponible globalmente
if (typeof window !== 'undefined') {
    window.TokenAnalyzer = TokenAnalyzer;
}
