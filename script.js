// Token Analyzer Jav            'claude-3.5-sonnet': { contextLimit: 200000, costPer1k: 0.003, encoding: 'cl100k_base', tokenRatio: 0.85, company: 'Anthropic', url: 'https://artificialanalysis.ai/models/claude-3-5-sonnet-oct-24' },Script wit               'llama-3-8b': { contextLimit: 8000, costPer1k: 0.0005, encoding: 'cl100k_base', tokenRatio: 0.85, company: 'Meta', url: 'https://artificialanalysis.ai/models/llama-3-instruct-8b' },          'llama-3-70b': { contextLimit: 8000, costPer1k: 0.002, encoding: 'cl100k_base', tokenRatio: 0.85, company: 'Meta', url: 'https://artificialanalysis.ai/models/llama-3-instruct-70b' },          'llama-3.1-8b': { contextLimit: 128000, costPer1k: 0.0005, encoding: 'cl100k_base', tokenRatio: 0.85, company: 'Meta', url: 'https://artificialanalysis.ai/models/llama-3-1-instruct-8b' },          'llama-3.1-70b': { contextLimit: 128000, costPer1k: 0.002, encoding: 'cl100k_base', tokenRatio: 0.85, company: 'Meta', url: 'https://artificialanalysis.ai/models/llama-3-1-instruct-70b' }, Real Tokenization
class TokenAnalyzer {
    constructor() {
        this.modelData = {
            // OpenAI Models with correct encodings
            'gpt-4o': { contextLimit: 128000, costPer1k: 0.005, encoding: 'o200k_base', company: 'OpenAI', url: 'https://artificialanalysis.ai/models/gpt-4o' },
            'gpt-4o-mini': { contextLimit: 128000, costPer1k: 0.00015, encoding: 'o200k_base', company: 'OpenAI', url: 'https://artificialanalysis.ai/models/gpt-4o-mini' },
            'gpt-4-turbo': { contextLimit: 128000, costPer1k: 0.01, encoding: 'cl100k_base', company: 'OpenAI', url: 'https://artificialanalysis.ai/models/gpt-4-turbo' },
            'gpt-4': { contextLimit: 8192, costPer1k: 0.03, encoding: 'cl100k_base', company: 'OpenAI', url: 'https://artificialanalysis.ai/models/gpt-4' },
            'gpt-4-32k': { contextLimit: 32768, costPer1k: 0.06, encoding: 'cl100k_base', company: 'OpenAI', url: 'https://artificialanalysis.ai/models/gpt-4-32k' },
            'gpt-3.5-turbo': { contextLimit: 4096, costPer1k: 0.0015, encoding: 'cl100k_base', company: 'OpenAI', url: 'https://artificialanalysis.ai/models/gpt-35-turbo' },
            'gpt-3.5-turbo-16k': { contextLimit: 16384, costPer1k: 0.003, encoding: 'cl100k_base', company: 'OpenAI', url: 'https://artificialanalysis.ai/models/gpt-35-turbo-16k' },
            'text-davinci-003': { contextLimit: 4097, costPer1k: 0.02, encoding: 'p50k_base', company: 'OpenAI', url: 'https://artificialanalysis.ai/models/text-davinci-003' },
            'text-davinci-002': { contextLimit: 4097, costPer1k: 0.02, encoding: 'p50k_base', company: 'OpenAI', url: 'https://artificialanalysis.ai/models/text-davinci-002' },
            'text-curie-001': { contextLimit: 2049, costPer1k: 0.002, encoding: 'r50k_base', company: 'OpenAI', url: 'https://artificialanalysis.ai/models/text-curie-001' },
            'text-babbage-001': { contextLimit: 2049, costPer1k: 0.0005, encoding: 'r50k_base', company: 'OpenAI', url: 'https://artificialanalysis.ai/models/text-babbage-001' },
            'text-ada-001': { contextLimit: 2049, costPer1k: 0.0004, encoding: 'r50k_base', company: 'OpenAI', url: 'https://artificialanalysis.ai/models/text-ada-001' },
            'davinci-002': { contextLimit: 16384, costPer1k: 0.002, encoding: 'p50k_base', company: 'OpenAI', url: 'https://artificialanalysis.ai/models/davinci-002' },
            'babbage-002': { contextLimit: 16384, costPer1k: 0.0004, encoding: 'p50k_base', company: 'OpenAI', url: 'https://artificialanalysis.ai/models/babbage-002' },

            // Anthropic Models - using approximation based on GPT tokenization
            'claude-3.5-sonnet': { contextLimit: 200000, costPer1k: 0.003, encoding: 'cl100k_base', tokenRatio: 1.2, company: 'Anthropic', url: 'https://artificialanalysis.ai/models/claude-3-5-sonnet' },
            'claude-3-opus': { contextLimit: 200000, costPer1k: 0.015, encoding: 'cl100k_base', tokenRatio: 1.2, company: 'Anthropic', url: 'https://artificialanalysis.ai/models/claude-3-opus' },
            'claude-3-sonnet': { contextLimit: 200000, costPer1k: 0.003, encoding: 'cl100k_base', tokenRatio: 1.2, company: 'Anthropic', url: 'https://artificialanalysis.ai/models/claude-3-sonnet' },
            'claude-3-haiku': { contextLimit: 200000, costPer1k: 0.00025, encoding: 'cl100k_base', tokenRatio: 1.2, company: 'Anthropic', url: 'https://artificialanalysis.ai/models/claude-3-haiku' },
            'claude-2.1': { contextLimit: 200000, costPer1k: 0.008, encoding: 'cl100k_base', tokenRatio: 1.15, company: 'Anthropic', url: 'https://artificialanalysis.ai/models/claude-2-1' },
            'claude-2': { contextLimit: 100000, costPer1k: 0.008, encoding: 'cl100k_base', tokenRatio: 1.15, company: 'Anthropic', url: 'https://artificialanalysis.ai/models/claude-2' },
            'claude-instant-1.2': { contextLimit: 100000, costPer1k: 0.0008, encoding: 'cl100k_base', tokenRatio: 1.1, company: 'Anthropic', url: 'https://artificialanalysis.ai/models/claude-instant-1-2' },
            'claude-instant': { contextLimit: 100000, costPer1k: 0.0008, encoding: 'cl100k_base', tokenRatio: 1.1, company: 'Anthropic', url: 'https://artificialanalysis.ai/models/claude-instant' },

            // Meta Llama Models - approximation
            'llama-3.1-405b': { contextLimit: 128000, costPer1k: 0.005, encoding: 'cl100k_base', tokenRatio: 0.85, company: 'Meta', url: 'https://artificialanalysis.ai/models/llama-3-1-instruct-405b' },
            'llama-3.1-70b': { contextLimit: 128000, costPer1k: 0.0035, encoding: 'cl100k_base', tokenRatio: 0.85, company: 'Meta', url: 'https://artificialanalysis.ai/models/llama-3-1-70b-instruct' },
            'llama-3.1-8b': { contextLimit: 128000, costPer1k: 0.0002, encoding: 'cl100k_base', tokenRatio: 0.85, company: 'Meta', url: 'https://artificialanalysis.ai/models/llama-3-1-8b-instruct' },
            'llama-3-70b': { contextLimit: 8192, costPer1k: 0.0035, encoding: 'cl100k_base', tokenRatio: 0.9, company: 'Meta', url: 'https://artificialanalysis.ai/models/llama-3-70b-instruct' },
            'llama-3-8b': { contextLimit: 8192, costPer1k: 0.0002, encoding: 'cl100k_base', tokenRatio: 0.9, company: 'Meta', url: 'https://artificialanalysis.ai/models/llama-3-8b-instruct' },
            'llama-2-70b': { contextLimit: 4096, costPer1k: 0.0035, encoding: 'cl100k_base', tokenRatio: 0.95, company: 'Meta', url: 'https://artificialanalysis.ai/models/llama-2-70b-chat' },
            'llama-2-13b': { contextLimit: 4096, costPer1k: 0.0003, encoding: 'cl100k_base', tokenRatio: 0.95, company: 'Meta', url: 'https://artificialanalysis.ai/models/llama-2-13b-chat' },
            'llama-2-7b': { contextLimit: 4096, costPer1k: 0.0002, encoding: 'cl100k_base', tokenRatio: 0.95, company: 'Meta', url: 'https://artificialanalysis.ai/models/llama-2-7b-chat' },
            'code-llama-34b': { contextLimit: 16384, costPer1k: 0.0003, encoding: 'cl100k_base', tokenRatio: 0.8, company: 'Meta', url: 'https://artificialanalysis.ai/models/code-llama-34b-instruct' },
            'code-llama-13b': { contextLimit: 16384, costPer1k: 0.0003, encoding: 'cl100k_base', tokenRatio: 0.8, company: 'Meta', url: 'https://artificialanalysis.ai/models/code-llama-13b-instruct' },
            'code-llama-7b': { contextLimit: 16384, costPer1k: 0.0002, encoding: 'cl100k_base', tokenRatio: 0.8, company: 'Meta', url: 'https://artificialanalysis.ai/models/code-llama-7b-instruct' },

            // Mistral AI Models  
            'mistral-large': { contextLimit: 32768, costPer1k: 0.008, encoding: 'cl100k_base', tokenRatio: 0.9, company: 'Mistral AI', url: 'https://artificialanalysis.ai/models/mistral-large' },
            'mistral-medium': { contextLimit: 32768, costPer1k: 0.0027, encoding: 'cl100k_base', tokenRatio: 0.9, company: 'Mistral AI', url: 'https://artificialanalysis.ai/models/mistral-medium' },
            'mistral-small': { contextLimit: 32768, costPer1k: 0.002, encoding: 'cl100k_base', tokenRatio: 0.9, company: 'Mistral AI', url: 'https://artificialanalysis.ai/models/mistral-small' },
            'mistral-tiny': { contextLimit: 32768, costPer1k: 0.00025, encoding: 'cl100k_base', tokenRatio: 0.9, company: 'Mistral AI', url: 'https://artificialanalysis.ai/models/mistral-tiny' },
            'mixtral-8x7b': { contextLimit: 32768, costPer1k: 0.0007, encoding: 'cl100k_base', tokenRatio: 0.9, company: 'Mistral AI', url: 'https://artificialanalysis.ai/models/mixtral-8x7b-instruct' },
            'mistral-7b': { contextLimit: 8192, costPer1k: 0.00025, encoding: 'cl100k_base', tokenRatio: 0.9, company: 'Mistral AI', url: 'https://artificialanalysis.ai/models/mistral-7b-instruct' },
            'codestral': { contextLimit: 32768, costPer1k: 0.001, encoding: 'cl100k_base', tokenRatio: 0.85, company: 'Mistral AI', url: 'https://artificialanalysis.ai/models/codestral' },

            // Google Models
            'gemini-1.5-pro': { contextLimit: 1000000, costPer1k: 0.0035, encoding: 'cl100k_base', tokenRatio: 1.1, company: 'Google', url: 'https://artificialanalysis.ai/models/gemini-1-5-pro' },
            'gemini-1.5-flash': { contextLimit: 1000000, costPer1k: 0.00035, encoding: 'cl100k_base', tokenRatio: 1.1, company: 'Google', url: 'https://artificialanalysis.ai/models/gemini-1-5-flash' },
            'gemini-pro': { contextLimit: 30720, costPer1k: 0.0005, encoding: 'cl100k_base', tokenRatio: 1.1, company: 'Google', url: 'https://artificialanalysis.ai/models/gemini-pro' },
            'gemini-pro-vision': { contextLimit: 12288, costPer1k: 0.00025, encoding: 'cl100k_base', tokenRatio: 1.1, company: 'Google', url: 'https://artificialanalysis.ai/models/gemini-pro-vision' }, 
            'palm-2': { contextLimit: 8192, costPer1k: 0.0005, encoding: 'cl100k_base', tokenRatio: 1.0, company: 'Google', url: 'https://artificialanalysis.ai/models/palm-2' },
            'text-bison-001': { contextLimit: 8192, costPer1k: 0.0005, encoding: 'cl100k_base', tokenRatio: 1.0, company: 'Google', url: 'https://artificialanalysis.ai/models/text-bison-001' },
            'chat-bison-001': { contextLimit: 4096, costPer1k: 0.0005, encoding: 'cl100k_base', tokenRatio: 1.0, company: 'Google', url: 'https://artificialanalysis.ai/models/chat-bison-001' },

            // Cohere Models
            'command-r-plus': { contextLimit: 128000, costPer1k: 0.003, encoding: 'cl100k_base', tokenRatio: 1.05, company: 'Cohere', url: 'https://artificialanalysis.ai/models/command-r-plus' },
            'command-r': { contextLimit: 128000, costPer1k: 0.0005, encoding: 'cl100k_base', tokenRatio: 1.05, company: 'Cohere', url: 'https://artificialanalysis.ai/models/command-r' },
            'command': { contextLimit: 4096, costPer1k: 0.0015, encoding: 'cl100k_base', tokenRatio: 1.05, company: 'Cohere', url: 'https://artificialanalysis.ai/models/command' },
            'command-nightly': { contextLimit: 4096, costPer1k: 0.0015, encoding: 'cl100k_base', tokenRatio: 1.05, company: 'Cohere', url: 'https://artificialanalysis.ai/models/command-nightly' },
            'command-light': { contextLimit: 4096, costPer1k: 0.0003, encoding: 'cl100k_base', tokenRatio: 1.05, company: 'Cohere', url: 'https://artificialanalysis.ai/models/command-light' },

            // Perplexity Models
            'pplx-70b-online': { contextLimit: 4096, costPer1k: 0.001, encoding: 'cl100k_base', tokenRatio: 0.9, company: 'Perplexity', url: 'https://artificialanalysis.ai/models/pplx-70b-online' },
            'pplx-7b-online': { contextLimit: 4096, costPer1k: 0.0002, encoding: 'cl100k_base', tokenRatio: 0.9, company: 'Perplexity', url: 'https://artificialanalysis.ai/models/pplx-7b-online' },
            'pplx-70b-chat': { contextLimit: 4096, costPer1k: 0.001, encoding: 'cl100k_base', tokenRatio: 0.9, company: 'Perplexity', url: 'https://artificialanalysis.ai/models/pplx-70b-chat' },
            'pplx-7b-chat': { contextLimit: 4096, costPer1k: 0.0002, encoding: 'cl100k_base', tokenRatio: 0.9, company: 'Perplexity', url: 'https://artificialanalysis.ai/models/pplx-7b-chat' },

            // Microsoft Azure Models
            'gpt-4-turbo-2024-04-09': { contextLimit: 128000, costPer1k: 0.01, encoding: 'cl100k_base', company: 'Microsoft Azure', url: 'https://artificialanalysis.ai/models/gpt-4-turbo' },
            'gpt-35-turbo': { contextLimit: 4096, costPer1k: 0.0015, encoding: 'cl100k_base', company: 'Microsoft Azure', url: 'https://artificialanalysis.ai/models/gpt-35-turbo' },
            'text-embedding-ada-002': { contextLimit: 8191, costPer1k: 0.0001, encoding: 'cl100k_base', company: 'Microsoft Azure', url: 'https://artificialanalysis.ai/models/text-embedding-ada-002' },

            // xAI Models
            'grok-1': { contextLimit: 8192, costPer1k: 0.005, encoding: 'cl100k_base', tokenRatio: 1.0, company: 'xAI', url: 'https://artificialanalysis.ai/models/grok-1' },
            'grok-1.5': { contextLimit: 128000, costPer1k: 0.005, encoding: 'cl100k_base', tokenRatio: 1.0, company: 'xAI', url: 'https://artificialanalysis.ai/models/grok-1-5' },

            // Hugging Face Models
            'starcoder': { contextLimit: 8192, costPer1k: 0.0003, encoding: 'cl100k_base', tokenRatio: 0.85, company: 'Hugging Face', url: 'https://artificialanalysis.ai/models/starcoder' },
            'codegen': { contextLimit: 2048, costPer1k: 0.0002, encoding: 'p50k_base', tokenRatio: 0.9, company: 'Hugging Face', url: 'https://artificialanalysis.ai/models/codegen' },
            'bloom-176b': { contextLimit: 2048, costPer1k: 0.005, encoding: 'cl100k_base', tokenRatio: 1.1, company: 'Hugging Face', url: 'https://artificialanalysis.ai/models/bloom-176b' },
            'flan-t5-xxl': { contextLimit: 512, costPer1k: 0.0002, encoding: 'cl100k_base', tokenRatio: 1.2, company: 'Hugging Face', url: 'https://artificialanalysis.ai/models/flan-t5-xxl' },
            'opt-175b': { contextLimit: 2048, costPer1k: 0.005, encoding: 'cl100k_base', tokenRatio: 1.0, company: 'Hugging Face', url: 'https://artificialanalysis.ai/models/opt-175b' },

            // Stability AI Models
            'stable-beluga-70b': { contextLimit: 4096, costPer1k: 0.0035, encoding: 'cl100k_base', tokenRatio: 0.9, company: 'Stability AI', url: 'https://artificialanalysis.ai/models/stable-beluga-70b' },
            'stable-beluga-13b': { contextLimit: 4096, costPer1k: 0.0003, encoding: 'cl100k_base', tokenRatio: 0.9, company: 'Stability AI', url: 'https://artificialanalysis.ai/models/stable-beluga-13b' },
            'stable-beluga-7b': { contextLimit: 4096, costPer1k: 0.0002, encoding: 'cl100k_base', tokenRatio: 0.9, company: 'Stability AI', url: 'https://artificialanalysis.ai/models/stable-beluga-7b' },

            // AI21 Labs Models
            'j2-ultra': { contextLimit: 8192, costPer1k: 0.015, encoding: 'cl100k_base', tokenRatio: 1.0, company: 'AI21 Labs', url: 'https://artificialanalysis.ai/models/j2-ultra' },
            'j2-mid': { contextLimit: 8192, costPer1k: 0.01, encoding: 'cl100k_base', tokenRatio: 1.0, company: 'AI21 Labs', url: 'https://artificialanalysis.ai/models/j2-mid' },
            'j2-light': { contextLimit: 8192, costPer1k: 0.003, encoding: 'cl100k_base', tokenRatio: 1.0, company: 'AI21 Labs', url: 'https://artificialanalysis.ai/models/j2-light' },

            // Together AI Models
            'vicuna-33b': { contextLimit: 2048, costPer1k: 0.0003, encoding: 'cl100k_base', tokenRatio: 0.9, company: 'Together AI', url: 'https://artificialanalysis.ai/models/vicuna-33b' },
            'vicuna-13b': { contextLimit: 2048, costPer1k: 0.0003, encoding: 'cl100k_base', tokenRatio: 0.9, company: 'Together AI', url: 'https://artificialanalysis.ai/models/vicuna-13b' },
            'vicuna-7b': { contextLimit: 2048, costPer1k: 0.0002, encoding: 'cl100k_base', tokenRatio: 0.9, company: 'Together AI', url: 'https://artificialanalysis.ai/models/vicuna-7b' },
            'alpaca-7b': { contextLimit: 2048, costPer1k: 0.0002, encoding: 'cl100k_base', tokenRatio: 0.9, company: 'Together AI', url: 'https://artificialanalysis.ai/models/alpaca-7b' }
        };

        this.encoder = null;
        this.isInitialized = false;
        this.init();
    }

    async init() {
        this.bindEvents();
        this.updateYear();
        await this.initializeTokenizer();
    }

    async initializeTokenizer() {
        try {
            // Wait for tiktoken to load
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Check if tiktoken is available
            if (typeof tiktoken !== 'undefined') {
                try {
                    // Initialize cl100k_base encoding (GPT-4 tokenizer)
                    this.encoder = tiktoken.get_encoding('cl100k_base');
                    this.isInitialized = true;
                    console.log('✅ Tiktoken initialized successfully');
                } catch (error) {
                    console.warn('⚠️ Could not initialize tiktoken:', error);
                    this.isInitialized = false;
                }
            } else {
                console.warn('⚠️ Tiktoken library not found, using fallback tokenization');
                this.isInitialized = false;
            }
            
            this.onModelChange(); // Trigger initial analysis
        } catch (error) {
            console.warn('❌ Error during tokenizer initialization:', error);
            this.isInitialized = false;
            this.onModelChange(); // Still trigger with fallback
        }
    }

    bindEvents() {
        const clearBtn = document.getElementById('clear-btn');
        const textInput = document.getElementById('text-input');
        const modelSelect = document.getElementById('model-select');

        // Real-time analysis while typing
        if (textInput) {
            textInput.addEventListener('input', () => this.onTextChange());
        }
        if (modelSelect) {
            modelSelect.addEventListener('change', () => this.onModelChange());
        }
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearAll());
        }

        // Set default model
        if (modelSelect) {
            modelSelect.value = 'gpt-4o';
        }
    }

    updateYear() {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear().toString();
        }
    }

    onTextChange() {
        const textInput = document.getElementById('text-input');
        if (!textInput) return;
        
        // Perform real-time analysis
        this.performRealTimeAnalysis();
    }

    onModelChange() {
        const modelSelect = document.getElementById('model-select');
        if (!modelSelect) return;
        
        const selectedModel = modelSelect.value;
        const modelInfo = this.modelData[selectedModel];
        
        if (modelInfo) {
            const elements = {
                'selected-model-name': selectedModel,
                'context-limit': modelInfo.contextLimit.toLocaleString(),
                'tokenization-type': this.getTokenizerName(modelInfo.encoding),
                'cost-per-1k': `$${modelInfo.costPer1k}`,
                'active-algorithm': this.getAlgorithmName(selectedModel)
            };

            Object.entries(elements).forEach(([id, value]) => {
                const element = document.getElementById(id);
                if (element) element.textContent = value;
            });

            // Update the model details link
            const modelDetailsLink = document.getElementById('model-details-link');
            if (modelDetailsLink && modelInfo.url) {
                modelDetailsLink.href = modelInfo.url;
                modelDetailsLink.style.display = 'inline';
            } else if (modelDetailsLink) {
                modelDetailsLink.style.display = 'none';
            }
        }

        // Perform real-time analysis when model changes
        this.performRealTimeAnalysis();
    }

    getTokenizerName(encoding) {
        const names = {
            'o200k_base': 'GPT-4o Tokenizer',
            'cl100k_base': 'GPT-4 Tokenizer',
            'p50k_base': 'GPT-3 Tokenizer',
            'r50k_base': 'GPT-2 Tokenizer'
        };
        return names[encoding] || encoding;
    }

    getAlgorithmName(modelId) {
        if (modelId.includes('gpt-4o')) return 'o200k_base (Latest GPT)';
        if (modelId.includes('gpt')) return 'cl100k_base (BPE)';
        if (modelId.includes('claude')) return 'Claude Tokenization (~20% more tokens)';
        if (modelId.includes('llama')) return 'Llama Tokenization (~15% fewer tokens)';
        if (modelId.includes('gemini') || modelId.includes('palm')) return 'Google SentencePiece (~10% more)';
        if (modelId.includes('mistral')) return 'Mistral Tokenization (~10% fewer)';
        if (modelId.includes('command')) return 'Cohere Tokenization (~5% more)';
        return 'Approximated Tokenization';
    }

    async performRealTimeAnalysis() {
        const textInput = document.getElementById('text-input');
        const modelSelect = document.getElementById('model-select');
        
        if (!textInput || !modelSelect) return;
        
        const text = textInput.value.trim();
        const selectedModel = modelSelect.value;
        const modelInfo = this.modelData[selectedModel];
        
        if (!text) {
            // Reset to zeros when no text
            this.updateDisplay({
                tokenCount: 0,
                charCount: 0,
                wordCount: 0,
                costEstimate: 0
            });
            this.resetVisualization();
            return;
        }

        const result = await this.tokenizeText(text, selectedModel);
        
        // Update statistics and visualizations
        this.updateStatistics(result, modelInfo);
        this.updateTokenVisualization(result.tokens);
        this.updateTokensList(result.tokens);
    }

    async tokenizeText(text, modelId) {
        if (!text.trim()) return { tokens: [], count: 0 };

        const modelInfo = this.modelData[modelId];
        let tokenCount = 0;
        let tokens = [];

        if (this.isInitialized && this.encoder && modelInfo.encoding === 'cl100k_base') {
            try {
                // Use real tiktoken tokenization for compatible models
                const encoded = this.encoder.encode(text);
                tokenCount = encoded.length;
                
                // Apply model-specific ratio for non-OpenAI models
                if (modelInfo.tokenRatio) {
                    tokenCount = Math.round(tokenCount * modelInfo.tokenRatio);
                }

                // Create token objects for visualization
                tokens = this.createTokensFromEncoding(text, encoded, modelId);
            } catch (error) {
                console.warn('Tokenization error:', error);
                return this.fallbackTokenization(text, modelId);
            }
        } else {
            // Fallback tokenization for other encodings or when tiktoken fails
            return this.fallbackTokenization(text, modelId);
        }

        return {
            tokens: tokens,
            count: tokenCount
        };
    }

    createTokensFromEncoding(text, encoded, modelId) {
        // Create visual tokens based on the text
        const words = text.match(/\S+|\s+/g) || [];
        const tokens = [];
        
        // Distribute tokens across words proportionally
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

    fallbackTokenization(text, modelId) {
        // Improved approximation tokenization based on model characteristics
        const modelInfo = this.modelData[modelId];
        
        // Base tokenization - roughly 4 characters per token for English
        let baseTokens = Math.ceil(text.length / 4);
        
        // Adjust for word boundaries - more realistic estimate
        const words = text.split(/\s+/).filter(w => w.length > 0);
        const avgWordLength = text.length / words.length;
        
        // More sophisticated approximation
        if (avgWordLength > 6) {
            baseTokens = Math.ceil(baseTokens * 1.1); // Longer words = more subword tokens
        } else if (avgWordLength < 4) {
            baseTokens = Math.ceil(baseTokens * 0.9); // Shorter words = fewer tokens
        }
        
        // Apply model-specific multipliers
        let tokenCount = baseTokens;
        if (modelInfo.tokenRatio) {
            tokenCount = Math.round(tokenCount * modelInfo.tokenRatio);
        }

        // Create simple tokens for visualization
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

    updateStatistics(result, modelInfo) {
        const text = document.getElementById('text-input')?.value || '';
        const tokenCount = result.count;
        const charCount = text.length;
        const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
        const costEstimate = (tokenCount / 1000) * modelInfo.costPer1k;

        this.updateDisplay({
            tokenCount,
            charCount,
            wordCount,
            costEstimate
        });
    }

    updateDisplay(data) {
        const elements = {
            'token-count': data.tokenCount.toLocaleString(),
            'char-count': data.charCount.toLocaleString(),
            'word-count': data.wordCount.toLocaleString(),
            'cost-estimate': `$${data.costEstimate.toFixed(6)}`
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        });
    }

    updateTokenVisualization(tokens) {
        const container = document.getElementById('tokens-container');
        if (!container) return;

        if (!tokens.length) {
            container.innerHTML = '<p style="color: var(--text-secondary); font-style: italic;">Escribe algo para ver los tokens...</p>';
            return;
        }

        container.innerHTML = '';
        tokens.forEach(token => {
            const tokenElement = document.createElement('span');
            tokenElement.className = `token ${token.type}`;
            tokenElement.textContent = token.text;
            tokenElement.title = `Tipo: ${token.type}\nTexto: "${token.text}"\nID: ${token.id}`;
            
            tokenElement.addEventListener('click', () => {
                this.highlightTokenInList(token.id);
            });

            container.appendChild(tokenElement);
        });
    }

    updateTokensList(tokens) {
        const container = document.getElementById('tokens-array');
        if (!container) return;

        if (!tokens.length) {
            container.innerHTML = '<p style="color: var(--text-secondary); font-style: italic;">Los tokens aparecerán aquí...</p>';
            return;
        }

        container.innerHTML = '';
        tokens.forEach((token, index) => {
            const tokenItem = document.createElement('div');
            tokenItem.className = 'token-item';
            tokenItem.id = `token-item-${token.id}`;
            
            tokenItem.innerHTML = `
                <span class="token-text">"${token.text.replace(/"/g, '&quot;')}"</span>
                <span class="token-id">#${index + 1} (${token.type})</span>
            `;

            container.appendChild(tokenItem);
        });
    }

    highlightTokenInList(tokenId) {
        // Remove previous highlights
        document.querySelectorAll('.token-item').forEach(item => {
            item.style.background = '';
            item.style.color = '';
        });

        // Highlight selected token
        const tokenItem = document.getElementById(`token-item-${tokenId}`);
        if (tokenItem) {
            tokenItem.style.background = 'var(--primary-color)';
            tokenItem.style.color = 'white';
            tokenItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Remove highlight after 2 seconds
            setTimeout(() => {
                tokenItem.style.background = '';
                tokenItem.style.color = '';
            }, 2000);
        }
    }

    resetVisualization() {
        const tokensContainer = document.getElementById('tokens-container');
        const tokensArray = document.getElementById('tokens-array');
        
        if (tokensContainer) {
            tokensContainer.innerHTML = '<p style="color: var(--text-secondary); font-style: italic;">Escribe algo para ver los tokens...</p>';
        }
        if (tokensArray) {
            tokensArray.innerHTML = '<p style="color: var(--text-secondary); font-style: italic;">Los tokens aparecerán aquí...</p>';
        }
    }

    clearAll() {
        const textInput = document.getElementById('text-input');
        if (textInput) textInput.value = '';
        
        // Reset statistics
        this.updateDisplay({
            tokenCount: 0,
            charCount: 0,
            wordCount: 0,
            costEstimate: 0
        });
        
        // Reset visualizations
        this.resetVisualization();
        
        // Focus back to text input
        if (textInput) textInput.focus();
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TokenAnalyzer();
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        const textInput = document.getElementById('text-input');
        if (textInput) textInput.focus();
    }
});
