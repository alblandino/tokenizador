/**
 * Model Configuration
 * Contains all model data, encodings, and company information
 */

// Mapping of model encodings to their identifiers
const MODEL_ENCODINGS = {
    'gpt-4': 'cl100k_base',
    'gpt-4o': 'o200k_base',
    'gpt-4o-mini': 'o200k_base',
    'gpt-4-turbo': 'cl100k_base',
    'gpt-3.5-turbo': 'cl100k_base',
    'claude-3.5-sonnet': 'cl100k_base', // Approximation
    'claude-3-opus': 'cl100k_base',
    'claude-3-sonnet': 'cl100k_base',
    'claude-3-haiku': 'cl100k_base',
    'gemini-1.5-pro': 'cl100k_base', // Approximation
    'gemini-1.5-flash': 'cl100k_base',
    'llama-3.1-405b': 'cl100k_base', // Approximation
    'llama-3.1-70b': 'cl100k_base',
    'llama-3.1-8b': 'cl100k_base',
    'llama-3-70b': 'cl100k_base',
    'llama-3-8b': 'cl100k_base',
    'mistral-large': 'cl100k_base', // Approximation
    'mistral-nemo': 'cl100k_base',
    'mixtral-8x7b': 'cl100k_base',
    'mixtral-8x22b': 'cl100k_base',
    'command-r+': 'cl100k_base', // Approximation
    'command-r': 'cl100k_base',
    'qwen2.5-72b': 'cl100k_base', // Approximation
    'qwen2-72b': 'cl100k_base',
    'deepseek-v2.5': 'cl100k_base', // Approximation
    'deepseek-v2': 'cl100k_base',
    'yi-large': 'cl100k_base', // Approximation
    'yi-1.5-34b': 'cl100k_base',
    'phi-3.5-mini': 'cl100k_base', // Approximation
    'phi-3-medium': 'cl100k_base',
    'phi-3-mini': 'cl100k_base',
    'granite-3-8b': 'cl100k_base', // Approximation
    'granite-3-2b': 'cl100k_base',
    'jamba-1.5-large': 'cl100k_base', // Approximation
    'jamba-1.5-mini': 'cl100k_base',
    'grok-2': 'cl100k_base', // Approximation
    'grok-2-mini': 'cl100k_base',
    'reka-core': 'cl100k_base', // Approximation
    'reka-flash': 'cl100k_base',
    'titan-text-premier': 'cl100k_base', // Approximation
    'titan-text-express': 'cl100k_base',
    'llama-3.1-sonar-large': 'cl100k_base', // Approximation
    'llama-3.1-sonar-small': 'cl100k_base',
    'arctic': 'cl100k_base', // Approximation
    'hermes-3-405b': 'cl100k_base', // Approximation
    'hermes-3-70b': 'cl100k_base',
    'nemotron-70b': 'cl100k_base', // Approximation
    'nemotron-mini': 'cl100k_base'
};

// Company information and branding
const COMPANIES = {
    'OpenAI': { color: '#00a67e', logo: '🤖' },
    'Anthropic': { color: '#d97757', logo: '🧠' },
    'Google': { color: '#4285f4', logo: '🔍' },
    'Meta': { color: '#1877f2', logo: '📘' },
    'Mistral AI': { color: '#ff6b35', logo: '💨' },
    'Cohere': { color: '#39a0ed', logo: '🔗' },
    'Alibaba': { color: '#ff6a00', logo: '🛒' },
    'DeepSeek': { color: '#2c5aa0', logo: '🔍' },
    '01.AI': { color: '#1a73e8', logo: '🤖' },
    'Microsoft': { color: '#00bcf2', logo: '💻' },
    'AI21 Labs': { color: '#6c5ce7', logo: '🧪' },
    'xAI': { color: '#000000', logo: '❌' },
    'Reka': { color: '#ff4757', logo: '🦄' },
    'Amazon': { color: '#ff9900', logo: '📦' },
    'Perplexity': { color: '#20bf6b', logo: '❓' },
    'IBM': { color: '#054ada', logo: '💼' },
    'Nous Research': { color: '#8e44ad', logo: '🔬' },
    'Snowflake': { color: '#29b5e8', logo: '❄️' },
    'NVIDIA': { color: '#76b900', logo: '💚' }
};

// Complete model data configuration
const MODELS_DATA = {
    'gpt-4o': {
        name: 'GPT-4o',
        company: 'OpenAI',
        encoding: 'o200k_base',
        contextLimit: 128000,
        inputCost: 2.50,
        outputCost: 10.00,
        url: 'https://artificialanalysis.ai/models/gpt-4o',
        tokenRatio: 1.0
    },
    'gpt-4o-mini': {
        name: 'GPT-4o Mini',
        company: 'OpenAI',
        encoding: 'o200k_base',
        contextLimit: 128000,
        inputCost: 0.15,
        outputCost: 0.60,
        url: 'https://artificialanalysis.ai/models/gpt-4o-mini',
        tokenRatio: 1.0
    },
    'gpt-4-turbo': {
        name: 'GPT-4 Turbo',
        company: 'OpenAI',
        encoding: 'cl100k_base',
        contextLimit: 128000,
        inputCost: 10.00,
        outputCost: 30.00,
        url: 'https://artificialanalysis.ai/models/gpt-4-turbo',
        tokenRatio: 1.0
    },
    'gpt-4': {
        name: 'GPT-4',
        company: 'OpenAI',
        encoding: 'cl100k_base',
        contextLimit: 8192,
        inputCost: 30.00,
        outputCost: 60.00,
        url: 'https://artificialanalysis.ai/models/gpt-4',
        tokenRatio: 1.0
    },
    'gpt-3.5-turbo': {
        name: 'GPT-3.5 Turbo',
        company: 'OpenAI',
        encoding: 'cl100k_base',
        contextLimit: 16385,
        inputCost: 0.50,
        outputCost: 1.50,
        url: 'https://artificialanalysis.ai/models/gpt-35-turbo',
        tokenRatio: 1.0
    },
    'claude-3.5-sonnet': {
        name: 'Claude 3.5 Sonnet',
        company: 'Anthropic',
        encoding: 'cl100k_base',
        contextLimit: 200000,
        inputCost: 3.00,
        outputCost: 15.00,
        url: 'https://artificialanalysis.ai/models/claude-35-sonnet',
        tokenRatio: 1.1
    },
    'claude-3-opus': {
        name: 'Claude 3 Opus',
        company: 'Anthropic',
        encoding: 'cl100k_base',
        contextLimit: 200000,
        inputCost: 15.00,
        outputCost: 75.00,
        url: 'https://artificialanalysis.ai/models/claude-3-opus',
        tokenRatio: 1.1
    },
    'claude-3-sonnet': {
        name: 'Claude 3 Sonnet',
        company: 'Anthropic',
        encoding: 'cl100k_base',
        contextLimit: 200000,
        inputCost: 3.00,
        outputCost: 15.00,
        url: 'https://artificialanalysis.ai/models/claude-3-sonnet',
        tokenRatio: 1.1
    },
    'claude-3-haiku': {
        name: 'Claude 3 Haiku',
        company: 'Anthropic',
        encoding: 'cl100k_base',
        contextLimit: 200000,
        inputCost: 0.25,
        outputCost: 1.25,
        url: 'https://artificialanalysis.ai/models/claude-3-haiku',
        tokenRatio: 1.1
    },
    'gemini-1.5-pro': {
        name: 'Gemini 1.5 Pro',
        company: 'Google',
        encoding: 'cl100k_base',
        contextLimit: 2097152,
        inputCost: 1.25,
        outputCost: 5.00,
        url: 'https://artificialanalysis.ai/models/gemini-15-pro',
        tokenRatio: 1.05
    },
    'gemini-1.5-flash': {
        name: 'Gemini 1.5 Flash',
        company: 'Google',
        encoding: 'cl100k_base',
        contextLimit: 1048576,
        inputCost: 0.075,
        outputCost: 0.30,
        url: 'https://artificialanalysis.ai/models/gemini-15-flash',
        tokenRatio: 1.05
    },
    'llama-3.1-405b': {
        name: 'Llama 3.1 405B',
        company: 'Meta',
        encoding: 'cl100k_base',
        contextLimit: 131072,
        inputCost: 2.70,
        outputCost: 2.70,
        url: 'https://artificialanalysis.ai/models/llama-31-405b',
        tokenRatio: 0.95
    },
    'llama-3.1-70b': {
        name: 'Llama 3.1 70B',
        company: 'Meta',
        encoding: 'cl100k_base',
        contextLimit: 131072,
        inputCost: 0.35,
        outputCost: 0.40,
        url: 'https://artificialanalysis.ai/models/llama-31-70b',
        tokenRatio: 0.95
    },
    'llama-3.1-8b': {
        name: 'Llama 3.1 8B',
        company: 'Meta',
        encoding: 'cl100k_base',
        contextLimit: 131072,
        inputCost: 0.055,
        outputCost: 0.055,
        url: 'https://artificialanalysis.ai/models/llama-31-8b',
        tokenRatio: 0.95
    },
    'llama-3-70b': {
        name: 'Llama 3 70B',
        company: 'Meta',
        encoding: 'cl100k_base',
        contextLimit: 8192,
        inputCost: 0.70,
        outputCost: 0.80,
        url: 'https://artificialanalysis.ai/models/llama-3-70b',
        tokenRatio: 0.95
    },
    'llama-3-8b': {
        name: 'Llama 3 8B',
        company: 'Meta',
        encoding: 'cl100k_base',
        contextLimit: 8192,
        inputCost: 0.05,
        outputCost: 0.05,
        url: 'https://artificialanalysis.ai/models/llama-3-8b',
        tokenRatio: 0.95
    },
    'mistral-large': {
        name: 'Mistral Large',
        company: 'Mistral AI',
        encoding: 'cl100k_base',
        contextLimit: 128000,
        inputCost: 2.00,
        outputCost: 6.00,
        url: 'https://artificialanalysis.ai/models/mistral-large',
        tokenRatio: 1.02
    },
    'mistral-nemo': {
        name: 'Mistral Nemo',
        company: 'Mistral AI',
        encoding: 'cl100k_base',
        contextLimit: 128000,
        inputCost: 0.15,
        outputCost: 0.15,
        url: 'https://artificialanalysis.ai/models/mistral-nemo',
        tokenRatio: 1.02
    },
    'mixtral-8x7b': {
        name: 'Mixtral 8x7B',
        company: 'Mistral AI',
        encoding: 'cl100k_base',
        contextLimit: 32768,
        inputCost: 0.24,
        outputCost: 0.24,
        url: 'https://artificialanalysis.ai/models/mixtral-8x7b',
        tokenRatio: 1.02
    },
    'mixtral-8x22b': {
        name: 'Mixtral 8x22B',
        company: 'Mistral AI',
        encoding: 'cl100k_base',
        contextLimit: 65536,
        inputCost: 0.65,
        outputCost: 0.65,
        url: 'https://artificialanalysis.ai/models/mixtral-8x22b',
        tokenRatio: 1.02
    },
    'command-r+': {
        name: 'Command R+',
        company: 'Cohere',
        encoding: 'cl100k_base',
        contextLimit: 128000,
        inputCost: 2.50,
        outputCost: 10.00,
        url: 'https://artificialanalysis.ai/models/command-r-plus',
        tokenRatio: 0.98
    },
    'command-r': {
        name: 'Command R',
        company: 'Cohere',
        encoding: 'cl100k_base',
        contextLimit: 128000,
        inputCost: 0.15,
        outputCost: 0.60,
        url: 'https://artificialanalysis.ai/models/command-r',
        tokenRatio: 0.98
    },
    'qwen2.5-72b': {
        name: 'Qwen2.5 72B',
        company: 'Alibaba',
        encoding: 'cl100k_base',
        contextLimit: 131072,
        inputCost: 0.35,
        outputCost: 0.40,
        url: 'https://artificialanalysis.ai/models/qwen-25-72b',
        tokenRatio: 0.92
    },
    'qwen2-72b': {
        name: 'Qwen2 72B',
        company: 'Alibaba',
        encoding: 'cl100k_base',
        contextLimit: 131072,
        inputCost: 0.35,
        outputCost: 0.40,
        url: 'https://artificialanalysis.ai/models/qwen-2-72b',
        tokenRatio: 0.92
    },
    'deepseek-v2.5': {
        name: 'DeepSeek V2.5',
        company: 'DeepSeek',
        encoding: 'cl100k_base',
        contextLimit: 131072,
        inputCost: 0.14,
        outputCost: 0.28,
        url: 'https://artificialanalysis.ai/models/deepseek-v25',
        tokenRatio: 0.93
    },
    'deepseek-v2': {
        name: 'DeepSeek V2',
        company: 'DeepSeek',
        encoding: 'cl100k_base',
        contextLimit: 131072,
        inputCost: 0.14,
        outputCost: 0.28,
        url: 'https://artificialanalysis.ai/models/deepseek-v2',
        tokenRatio: 0.93
    },
    'yi-large': {
        name: 'Yi Large',
        company: '01.AI',
        encoding: 'cl100k_base',
        contextLimit: 32768,
        inputCost: 0.60,
        outputCost: 0.60,
        url: 'https://artificialanalysis.ai/models/yi-large',
        tokenRatio: 0.97
    },
    'yi-1.5-34b': {
        name: 'Yi 1.5 34B',
        company: '01.AI',
        encoding: 'cl100k_base',
        contextLimit: 32768,
        inputCost: 0.30,
        outputCost: 0.30,
        url: 'https://artificialanalysis.ai/models/yi-15-34b',
        tokenRatio: 0.97
    },
    'phi-3.5-mini': {
        name: 'Phi-3.5 Mini',
        company: 'Microsoft',
        encoding: 'cl100k_base',
        contextLimit: 131072,
        inputCost: 0.15,
        outputCost: 0.60,
        url: 'https://artificialanalysis.ai/models/phi-35-mini',
        tokenRatio: 1.03
    },
    'phi-3-medium': {
        name: 'Phi-3 Medium',
        company: 'Microsoft',
        encoding: 'cl100k_base',
        contextLimit: 131072,
        inputCost: 1.00,
        outputCost: 1.00,
        url: 'https://artificialanalysis.ai/models/phi-3-medium',
        tokenRatio: 1.03
    },
    'phi-3-mini': {
        name: 'Phi-3 Mini',
        company: 'Microsoft',
        encoding: 'cl100k_base',
        contextLimit: 131072,
        inputCost: 0.15,
        outputCost: 0.60,
        url: 'https://artificialanalysis.ai/models/phi-3-mini',
        tokenRatio: 1.03
    },
    'granite-3-8b': {
        name: 'Granite 3 8B',
        company: 'IBM',
        encoding: 'cl100k_base',
        contextLimit: 131072,
        inputCost: 0.055,
        outputCost: 0.055,
        url: 'https://artificialanalysis.ai/models/granite-3-8b',
        tokenRatio: 0.96
    },
    'granite-3-2b': {
        name: 'Granite 3 2B',
        company: 'IBM',
        encoding: 'cl100k_base',
        contextLimit: 131072,
        inputCost: 0.025,
        outputCost: 0.025,
        url: 'https://artificialanalysis.ai/models/granite-3-2b',
        tokenRatio: 0.96
    },
    'jamba-1.5-large': {
        name: 'Jamba 1.5 Large',
        company: 'AI21 Labs',
        encoding: 'cl100k_base',
        contextLimit: 262144,
        inputCost: 0.50,
        outputCost: 0.70,
        url: 'https://artificialanalysis.ai/models/jamba-15-large',
        tokenRatio: 0.94
    },
    'jamba-1.5-mini': {
        name: 'Jamba 1.5 Mini',
        company: 'AI21 Labs',
        encoding: 'cl100k_base',
        contextLimit: 262144,
        inputCost: 0.10,
        outputCost: 0.10,
        url: 'https://artificialanalysis.ai/models/jamba-15-mini',
        tokenRatio: 0.94
    },
    'grok-2': {
        name: 'Grok-2',
        company: 'xAI',
        encoding: 'cl100k_base',
        contextLimit: 131072,
        inputCost: 2.00,
        outputCost: 10.00,
        url: 'https://artificialanalysis.ai/models/grok-2',
        tokenRatio: 1.01
    },
    'grok-2-mini': {
        name: 'Grok-2 Mini',
        company: 'xAI',
        encoding: 'cl100k_base',
        contextLimit: 131072,
        inputCost: 0.15,
        outputCost: 0.60,
        url: 'https://artificialanalysis.ai/models/grok-2-mini',
        tokenRatio: 1.01
    },
    'reka-core': {
        name: 'Reka Core',
        company: 'Reka',
        encoding: 'cl100k_base',
        contextLimit: 131072,
        inputCost: 10.00,
        outputCost: 25.00,
        url: 'https://artificialanalysis.ai/models/reka-core',
        tokenRatio: 0.99
    },
    'reka-flash': {
        name: 'Reka Flash',
        company: 'Reka',
        encoding: 'cl100k_base',
        contextLimit: 131072,
        inputCost: 0.15,
        outputCost: 0.60,
        url: 'https://artificialanalysis.ai/models/reka-flash',
        tokenRatio: 0.99
    },
    'titan-text-premier': {
        name: 'Titan Text Premier',
        company: 'Amazon',
        encoding: 'cl100k_base',
        contextLimit: 32000,
        inputCost: 0.50,
        outputCost: 1.50,
        url: 'https://artificialanalysis.ai/models/titan-text-premier',
        tokenRatio: 1.04
    },
    'titan-text-express': {
        name: 'Titan Text Express',
        company: 'Amazon',
        encoding: 'cl100k_base',
        contextLimit: 8000,
        inputCost: 0.13,
        outputCost: 0.17,
        url: 'https://artificialanalysis.ai/models/titan-text-express',
        tokenRatio: 1.04
    },
    'llama-3.1-sonar-large': {
        name: 'Llama 3.1 Sonar Large',
        company: 'Perplexity',
        encoding: 'cl100k_base',
        contextLimit: 131072,
        inputCost: 1.00,
        outputCost: 1.00,
        url: 'https://artificialanalysis.ai/models/llama-31-sonar-large',
        tokenRatio: 0.95
    },
    'llama-3.1-sonar-small': {
        name: 'Llama 3.1 Sonar Small',
        company: 'Perplexity',
        encoding: 'cl100k_base',
        contextLimit: 131072,
        inputCost: 0.20,
        outputCost: 0.20,
        url: 'https://artificialanalysis.ai/models/llama-31-sonar-small',
        tokenRatio: 0.95
    },
    'arctic': {
        name: 'Snowflake Arctic',
        company: 'Snowflake',
        encoding: 'cl100k_base',
        contextLimit: 4096,
        inputCost: 0.24,
        outputCost: 0.24,
        url: 'https://artificialanalysis.ai/models/snowflake-arctic',
        tokenRatio: 1.06
    },
    'hermes-3-405b': {
        name: 'Hermes 3 405B',
        company: 'Nous Research',
        encoding: 'cl100k_base',
        contextLimit: 131072,
        inputCost: 2.70,
        outputCost: 2.70,
        url: 'https://artificialanalysis.ai/models/hermes-3-405b',
        tokenRatio: 0.95
    },
    'hermes-3-70b': {
        name: 'Hermes 3 70B',
        company: 'Nous Research',
        encoding: 'cl100k_base',
        contextLimit: 131072,
        inputCost: 0.35,
        outputCost: 0.40,
        url: 'https://artificialanalysis.ai/models/hermes-3-70b',
        tokenRatio: 0.95
    },
    'nemotron-70b': {
        name: 'Nemotron 70B',
        company: 'NVIDIA',
        encoding: 'cl100k_base',
        contextLimit: 131072,
        inputCost: 0.35,
        outputCost: 0.40,
        url: 'https://artificialanalysis.ai/models/nemotron-70b',
        tokenRatio: 0.98
    },
    'nemotron-mini': {
        name: 'Nemotron Mini',
        company: 'NVIDIA',
        encoding: 'cl100k_base',
        contextLimit: 131072,
        inputCost: 0.15,
        outputCost: 0.60,
        url: 'https://artificialanalysis.ai/models/nemotron-mini',
        tokenRatio: 0.98
    }
};
