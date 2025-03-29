"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentService = exports.DocumentService = void 0;
// src/services/documentService.ts
const chroma_1 = require("@langchain/community/vectorstores/chroma");
const google_genai_1 = require("@langchain/google-genai");
class DocumentService {
    constructor() {
        this.embeddings = new google_genai_1.GoogleGenerativeAIEmbeddings({
            apiKey: process.env.GIA || '',
            modelName: "embedding-001" // Modelo de embeddings de Google
        });
    }
    /**
     * Realiza una búsqueda semántica en la colección (tema) especificada.
     * @param query Consulta del usuario.
     * @param tema Nombre de la colección en Chroma DB.
     * @param limit Número máximo de documentos a retornar.
     * @returns Array de documentos que coinciden con la consulta.
     */
    buscarInformacion(query_1, tema_1) {
        return __awaiter(this, arguments, void 0, function* (query, tema, limit = 5) {
            try {
                // Inicializar ChromaDB para buscar en la colección específica
                const vectorStore = yield chroma_1.Chroma.fromExistingCollection(this.embeddings, { collectionName: tema });
                // Buscar documentos similares (recuperación semántica)
                const resultados = yield vectorStore.similaritySearch(query, limit);
                return resultados;
            }
            catch (error) {
                console.error(`Error buscando información en tema "${tema}": ${error}`);
                return [];
            }
        });
    }
}
exports.DocumentService = DocumentService;
exports.documentService = new DocumentService();
//# sourceMappingURL=documentService.js.map