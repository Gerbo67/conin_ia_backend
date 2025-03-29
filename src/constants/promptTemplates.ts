export const AI_PROMPT_TEMPLATES = {
    CONTEXT_QUERY: `Responde la siguiente pregunta utilizando SOLAMENTE la información proporcionada en los extractos de documentos a continuación.
    Si la información en los extractos no es suficiente para responder completamente, indica claramente qué parte de la pregunta puedes responder y qué información adicional sería necesaria.
    
    Extractos de documentos:
    {{context}}
    
    Pregunta: {{question}}
    
    Respuesta:`,

    GENERAL_INSTRUCTION: `Eres un asistente AI especializado en responder preguntas sobre documentación técnica. 
    Responde de manera precisa y concisa, utilizando lenguaje profesional.
    Si no conoces la respuesta, indícalo claramente en lugar de inventar información.`,

    NO_CONTEXT_FOUND: `No he encontrado información relevante sobre "{{question}}" en los documentos de "{{topic}}". 
    ¿Puedo ayudarte con algo más general sobre este tema o prefieres consultar otro tema?`
};