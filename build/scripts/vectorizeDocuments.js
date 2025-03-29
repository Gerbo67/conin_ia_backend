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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/scripts/vectorizeDocument.ts
const chroma_1 = require("@langchain/community/vectorstores/chroma");
const google_genai_1 = require("@langchain/google-genai");
const pdf_1 = require("@langchain/community/document_loaders/fs/pdf");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const chromadb_1 = require("chromadb");
// Función para vectorizar documentos
function vectorizeDocuments() {
    return __awaiter(this, void 0, void 0, function* () {
        // Directorio raíz donde se encuentran las carpetas de documentos (e.g., seguridad, tenecia, etc.)
        const docsRoot = path_1.default.join(__dirname, "..", "docs");
        // Configuración del modelo de embeddings usando la API de Google GenAI
        const embeddings = new google_genai_1.GoogleGenerativeAIEmbeddings({
            apiKey: "AIzaSyBGLwuEF328rUrf9apCGELmHd9aMf0Cb4o",
            modelName: "embedding-001",
        });
        // Leer las carpetas dentro del directorio de documentos
        const categories = fs_1.default.readdirSync(docsRoot, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);
        // Procesar cada categoría (carpeta)
        for (const category of categories) {
            const categoryPath = path_1.default.join(docsRoot, category);
            // Filtrar archivos PDF
            const pdfFiles = fs_1.default.readdirSync(categoryPath)
                .filter(file => file.endsWith(".pdf"));
            let documents = [];
            for (const pdfFile of pdfFiles) {
                const filePath = path_1.default.join(categoryPath, pdfFile);
                console.log(`Procesando: ${filePath}`);
                const loader = new pdf_1.PDFLoader(filePath);
                const docs = yield loader.load();
                // Agregar metadata para identificar la categoría y el origen del documento
                docs.forEach(doc => {
                    doc.metadata = { category, source: pdfFile };
                });
                documents = documents.concat(docs);
            }
            if (documents.length === 0) {
                console.log(`No se encontraron PDFs en la categoría: ${category}`);
                continue;
            }
            // Crear (o actualizar) la colección en Chroma DB para esta categoría
            yield chroma_1.Chroma.fromDocuments(documents, embeddings, {
                collectionName: category,
            });
            console.log(`Vectorización completada para la categoría: ${category}`);
        }
    });
}
// Función para eliminar todas las colecciones usando el cliente de Chroma (backend)
function deleteAllCollections() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new chromadb_1.ChromaClient();
        // listCollections devuelve un array de strings con los nombres de las colecciones
        const collections = yield client.listCollections();
        for (const colName of collections) {
            yield client.deleteCollection({ name: colName });
            console.log(`Colección ${colName} eliminada.`);
        }
        console.log("Proceso de eliminación de colecciones completado.");
    });
}
// Función principal que decide qué acción ejecutar según el argumento
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Si se pasa "delete" como argumento, elimina las colecciones; de lo contrario, vectoriza
        const action = process.argv[2];
        if (action === "delete") {
            yield deleteAllCollections();
        }
        else {
            yield vectorizeDocuments();
        }
    });
}
main()
    .then(() => {
    console.log("Proceso completado exitosamente.");
    process.exit(0);
})
    .catch((error) => {
    console.error("Error en el proceso:", error);
    process.exit(1);
});
//# sourceMappingURL=vectorizeDocuments.js.map