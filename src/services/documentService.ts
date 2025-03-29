// src/services/documentService.ts
import {Chroma} from "@langchain/community/vectorstores/chroma";
import {Document} from "@langchain/core/documents";
import {GoogleGenerativeAIEmbeddings} from "@langchain/google-genai";

export class DocumentService {
    private readonly embeddings: GoogleGenerativeAIEmbeddings;

    constructor() {
        this.embeddings = new GoogleGenerativeAIEmbeddings({
            apiKey: process.env.GIA || '',
            modelName: "embedding-001" // Modelo de embeddings de Google
        });
    }

    /**
     * Realiza una búsqueda semántica en la colección (tema) especificada.
     * @param query Consulta del usuario.
     * @param limit Número máximo de documentos a retornar.
     * @returns Array de documentos que coinciden con la consulta.
     */
    public async buscarInformacion(query: string, limit = 5): Promise<Document[]> {
        const tema = "gobierno";
        try {

            // Inicializar ChromaDB para buscar en la colección específica
            const vectorStore = await Chroma.fromExistingCollection(
                this.embeddings,
                {collectionName: tema}
            );

            // Buscar documentos similares (recuperación semántica)
            const resultados = await vectorStore.similaritySearch(query, limit);
            return resultados;
        } catch (error) {
            console.error(`Error buscando información en tema "${tema}": ${error}`);
            return [];
        }
    }
}

export const documentService = new DocumentService();
