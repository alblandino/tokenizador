/**
 * Controlador de Interfaz de Usuario
 * Maneja todas las interacciones de interfaz de usuario y manipulación del DOM
 */

class UIController {
    constructor() {
        this.elements = this.initializeElements();
        this.bindEvents();
        this.updateYear();
    }

    /**
     * Inicializa y cachea elementos del DOM
     * @returns {Object} Elementos del DOM cacheados
     */
    initializeElements() {
        return {
            textInput: document.getElementById('text-input'),
            modelSelect: document.getElementById('model-select'),
            clearBtn: document.getElementById('clear-btn'),
            tokensContainer: document.getElementById('tokens-container'),
            tokensArray: document.getElementById('tokens-array'),
            modelDetailsLink: document.getElementById('model-details-link'),
            
            // Elementos de estadísticas
            tokenCount: document.getElementById('token-count'),
            charCount: document.getElementById('char-count'),
            wordCount: document.getElementById('word-count'),
            costEstimate: document.getElementById('cost-estimate'),
            
            // Elementos de información del modelo
            selectedModelName: document.getElementById('selected-model-name'),
            contextLimit: document.getElementById('context-limit'),
            tokenizationType: document.getElementById('tokenization-type'),
            costPer1k: document.getElementById('cost-per-1k'),
            activeAlgorithm: document.getElementById('active-algorithm')
        };
    }

    /**
     * Vincula event listeners
     */
    bindEvents() {
        // Análisis en tiempo real mientras se escribe
        if (this.elements.textInput) {
            this.elements.textInput.addEventListener('input', () => {
                this.onTextChange?.();
            });
        }

        // Cambios en la selección de modelo
        if (this.elements.modelSelect) {
            this.elements.modelSelect.addEventListener('change', () => {
                this.onModelChange?.();
            });
        }

        // Botón limpiar
        if (this.elements.clearBtn) {
            this.elements.clearBtn.addEventListener('click', () => {
                this.onClear?.();
            });
        }

        // Establecer modelo por defecto
        if (this.elements.modelSelect) {
            this.elements.modelSelect.value = 'gpt-4o';
        }

        // Atajos de teclado
        this.bindKeyboardShortcuts();
    }

    /**
     * Vincula atajos de teclado
     */
    bindKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                if (this.elements.textInput) {
                    this.elements.textInput.focus();
                }
            }
        });
    }

    /**
     * Actualiza el año actual en el pie de página
     */
    updateYear() {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear().toString();
        }
    }

    /**
     * Establece manejadores de eventos
     * @param {Object} handlers - Funciones manejadoras de eventos
     */
    setEventHandlers(handlers) {
        this.onTextChange = handlers.onTextChange;
        this.onModelChange = handlers.onModelChange;
        this.onClear = handlers.onClear;
    }

    /**
     * Obtiene el valor actual del texto de entrada
     * @returns {string}
     */
    getTextInput() {
        return this.elements.textInput?.value || '';
    }

    /**
     * Obtiene el modelo actualmente seleccionado
     * @returns {string}
     */
    getSelectedModel() {
        return this.elements.modelSelect?.value || 'gpt-4o';
    }

    /**
     * Limpia el texto de entrada
     */
    clearTextInput() {
        if (this.elements.textInput) {
            this.elements.textInput.value = '';
            this.elements.textInput.focus();
        }
    }

    /**
     * Actualiza la visualización de estadísticas
     * @param {Object} stats - Objeto de estadísticas
     */
    updateStatistics(stats = {}) {
        const updates = {
            tokenCount: (stats.tokenCount || 0).toLocaleString(),
            charCount: (stats.charCount || 0).toLocaleString(),
            wordCount: (stats.wordCount || 0).toLocaleString(),
            costEstimate: `$${(stats.costEstimate || 0).toFixed(6)}`
        };

        Object.entries(updates).forEach(([key, value]) => {
            if (this.elements[key]) {
                this.elements[key].textContent = value;
            }
        });
    }

    /**
     * Actualiza la visualización de información del modelo
     * @param {string} modelId - Identificador del modelo
     * @param {Object} tokenizationService - Instancia del servicio de tokenización
     */
    updateModelInfo(modelId, tokenizationService) {
        const modelInfo = MODELS_DATA[modelId];
        
        if (!modelInfo) return;

        const updates = {
            selectedModelName: modelId,
            contextLimit: modelInfo.contextLimit.toLocaleString(),
            tokenizationType: tokenizationService.getTokenizerName(modelInfo.encoding),
            costPer1k: `Entrada: $${modelInfo.inputCost}/1M | Salida: $${modelInfo.outputCost}/1M`,
            activeAlgorithm: tokenizationService.getAlgorithmName(modelId)
        };

        Object.entries(updates).forEach(([key, value]) => {
            if (this.elements[key]) {
                this.elements[key].textContent = value;
            }
        });

        // Actualizar el enlace de detalles del modelo
        if (this.elements.modelDetailsLink && modelInfo.url) {
            this.elements.modelDetailsLink.href = modelInfo.url;
            this.elements.modelDetailsLink.style.display = 'inline';
        } else if (this.elements.modelDetailsLink) {
            this.elements.modelDetailsLink.style.display = 'none';
        }
    }

    /**
     * Actualiza la visualización de tokens
     * @param {Array} tokens - Array de objetos de token
     */
    updateTokenVisualization(tokens = []) {
        if (!this.elements.tokensContainer) return;

        if (!tokens.length) {
            this.elements.tokensContainer.innerHTML = 
                '<p style="color: var(--text-secondary); font-style: italic;">Escribe algo para ver los tokens...</p>';
            return;
        }

        this.elements.tokensContainer.innerHTML = '';
        tokens.forEach(token => {
            const tokenElement = document.createElement('span');
            tokenElement.className = `token ${token.type}`;
            tokenElement.textContent = token.text;
            tokenElement.title = `Tipo: ${token.type}\nTexto: "${token.text}"\nID: ${token.id}`;
            
            tokenElement.addEventListener('click', () => {
                this.highlightTokenInList(token.id);
            });

            this.elements.tokensContainer.appendChild(tokenElement);
        });
    }

    /**
     * Actualiza la lista de tokens
     * @param {Array} tokens - Array de objetos de token
     */
    updateTokensList(tokens = []) {
        if (!this.elements.tokensArray) return;

        if (!tokens.length) {
            this.elements.tokensArray.innerHTML = 
                '<p style="color: var(--text-secondary); font-style: italic;">Los tokens aparecerán aquí...</p>';
            return;
        }

        this.elements.tokensArray.innerHTML = '';
        tokens.forEach((token, index) => {
            const tokenItem = document.createElement('div');
            tokenItem.className = 'token-item';
            tokenItem.id = `token-item-${token.id}`;
            
            tokenItem.innerHTML = `
                <span class="token-text">"${token.text.replace(/"/g, '&quot;')}"</span>
                <span class="token-id">#${index + 1} (${token.type})</span>
            `;

            this.elements.tokensArray.appendChild(tokenItem);
        });
    }

    /**
     * Resalta un token en la lista
     * @param {string} tokenId - ID del token a resaltar
     */
    highlightTokenInList(tokenId) {
        // Remover resaltados previos
        document.querySelectorAll('.token-item').forEach(item => {
            item.style.background = '';
            item.style.color = '';
        });

        // Resaltar token seleccionado
        const tokenItem = document.getElementById(`token-item-${tokenId}`);
        if (tokenItem) {
            tokenItem.style.background = 'var(--primary-color)';
            tokenItem.style.color = 'white';
            tokenItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Remover resaltado después de 2 segundos
            setTimeout(() => {
                tokenItem.style.background = '';
                tokenItem.style.color = '';
            }, 2000);
        }
    }

    /**
     * Reinicia las visualizaciones al estado vacío
     */
    resetVisualizations() {
        if (this.elements.tokensContainer) {
            this.elements.tokensContainer.innerHTML = 
                '<p style="color: var(--text-secondary); font-style: italic;">Escribe algo para ver los tokens...</p>';
        }
        
        if (this.elements.tokensArray) {
            this.elements.tokensArray.innerHTML = 
                '<p style="color: var(--text-secondary); font-style: italic;">Los tokens aparecerán aquí...</p>';
        }
    }

    /**
     * Muestra estado de carga
     */
    showLoading() {
        if (this.elements.tokensContainer) {
            this.elements.tokensContainer.innerHTML = 
                '<p style="color: var(--text-secondary); font-style: italic;">Analizando tokens...</p>';
        }
    }

    /**
     * Dispara el evento de cambio de modelo (para configuración inicial)
     */
    triggerModelChange() {
        if (this.onModelChange) {
            this.onModelChange();
        }
    }
}

// Hacer la clase disponible globalmente
if (typeof window !== 'undefined') {
    window.UIController = UIController;
}
