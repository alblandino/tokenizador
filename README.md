# 🧠 Analizador de Tokens IA

Un analizador de tokens profesional y en tiempo real para modelos de inteligencia artificial. Visualiza cómo diferentes modelos de IA procesan y tokenizan tu texto, con soporte para más de 67 modelos de diferentes proveedores.

## ✨ Características

- **🚀 Análisis en tiempo real**: Los tokens se calculan mientras escribes
- **🤖 67+ modelos soportados**: OpenAI, Anthropic, Google, Meta, Mistral AI, y más
- **🎯 Tokenización precisa**: Usa la biblioteca tiktoken para máxima precisión
- **💰 Estimación de costos**: Calcula automáticamente el costo por cada modelo
- **📊 Estadísticas detalladas**: Tokens, caracteres, palabras, y más
- **🎨 Visualización avanzada**: Tokens coloreados y lista interactiva
- **🔗 Enlaces directos**: Acceso directo a artificialanalysis.ai para cada modelo
- **📱 Diseño responsivo**: Funciona perfectamente en todos los dispositivos

## 🏗️ Arquitectura Modular Profesional

El proyecto está estructurado con una arquitectura modular profesional para máxima mantenibilidad:

```
trae/
├── index.html              # Página principal
├── styles.css              # Estilos globales
├── js/                     # Código JavaScript modular
│   ├── config/
│   │   └── models-config.js      # Configuración de modelos
│   ├── services/
│   │   └── tokenization-service.js # Servicio de tokenización
│   ├── controllers/
│   │   └── ui-controller.js      # Controlador de interfaz
│   ├── utils/
│   │   └── statistics-calculator.js # Calculadora de estadísticas
│   └── token-analyzer.js         # Aplicación principal
└── README.md               # Documentación
```

## 🤖 Modelos Soportados

### Proveedores Principales
- **🤖 OpenAI**: GPT-4o, GPT-4o Mini, GPT-4 Turbo, GPT-4, GPT-3.5 Turbo
- **🧠 Anthropic**: Claude 3.5 Sonnet, Claude 3 Opus/Sonnet/Haiku
- **🔍 Google**: Gemini 1.5 Pro/Flash
- **📘 Meta**: Llama 3.1 (405B/70B/8B), Llama 3 (70B/8B)
- **💨 Mistral AI**: Mistral Large/Nemo, Mixtral 8x7B/8x22B
- **🔗 Cohere**: Command R+, Command R
- **🛒 Alibaba**: Qwen2.5/Qwen2 72B
- **🔍 DeepSeek**: DeepSeek V2.5/V2
- **🤖 01.AI**: Yi Large, Yi 1.5 34B
- **💻 Microsoft**: Phi-3.5 Mini, Phi-3 Medium/Mini
- **🧪 AI21 Labs**: Jamba 1.5 Large/Mini
- **❌ xAI**: Grok-2, Grok-2 Mini
- **🦄 Reka**: Reka Core/Flash
- **📦 Amazon**: Titan Text Premier/Express
- **❓ Perplexity**: Llama 3.1 Sonar Large/Small
- **💼 IBM**: Granite 3 8B/2B
- **🔬 Nous Research**: Hermes 3 405B/70B
- **❄️ Snowflake**: Arctic
- **💚 NVIDIA**: Nemotron 70B/Mini

### 🌐 URLs Verificadas
Todos los modelos incluyen enlaces directos verificados a artificialanalysis.ai para información detallada sobre rendimiento, costos y benchmarks.

## 📊 Funcionalidades Avanzadas

### 💰 Estimación de Costos
- Cálculo automático basado en precios reales de cada proveedor
- Costos de input y output diferenciados
- Actualización en tiempo real

### 📈 Estadísticas Completas
- **Tokens**: Conteo preciso con tiktoken
- **Caracteres**: Incluyendo espacios
- **Palabras**: Separación inteligente
- **Costo estimado**: En USD por 1M tokens

### ⚠️ Advertencias Inteligentes
- Avisos cuando el texto supera límites de contexto
- Recomendaciones de modelos alternativos
- Indicadores de eficiencia