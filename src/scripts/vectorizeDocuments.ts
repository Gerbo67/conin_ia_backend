// src/scripts/vectorizeDocument.ts
import { Chroma } from "@langchain/community/vectorstores/chroma";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import fs from "fs";
import path from "path";
import { ChromaClient } from "chromadb";

// Función para vectorizar documentos
async function vectorizeDocuments(): Promise<void> {
    // Directorio raíz donde se encuentran las carpetas de documentos (e.g., seguridad, tenecia, etc.)
    const docsRoot = path.join(__dirname, "..", "docs");

    // Configuración del modelo de embeddings usando la API de Google GenAI
    const embeddings = new GoogleGenerativeAIEmbeddings({
        apiKey: "AIzaSyBGLwuEF328rUrf9apCGELmHd9aMf0Cb4o",
        modelName: "embedding-001",
    });

    // Leer las carpetas dentro del directorio de documentos
    const categories = fs.readdirSync(docsRoot, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    // Procesar cada categoría (carpeta)
    for (const category of categories) {
        const categoryPath = path.join(docsRoot, category);
        // Filtrar archivos PDF
        const pdfFiles = fs.readdirSync(categoryPath)
            .filter(file => file.endsWith(".pdf"));

        let documents: any[] = [];

        for (const pdfFile of pdfFiles) {
            const filePath = path.join(categoryPath, pdfFile);
            console.log(`Procesando: ${filePath}`);
            const loader = new PDFLoader(filePath);
            const docs = await loader.load();

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
        await Chroma.fromDocuments(documents, embeddings, {
            collectionName: category,
        });

        console.log(`Vectorización completada para la categoría: ${category}`);
    }
}

// Función para eliminar todas las colecciones usando el cliente de Chroma (backend)
async function deleteAllCollections(): Promise<void> {
    const client = new ChromaClient();
    // listCollections devuelve un array de strings con los nombres de las colecciones
    const collections: string[] = await client.listCollections();
    for (const colName of collections) {
        await client.deleteCollection({ name: colName });
        console.log(`Colección ${colName} eliminada.`);
    }
    console.log("Proceso de eliminación de colecciones completado.");
}

// Función principal que decide qué acción ejecutar según el argumento
async function main(): Promise<void> {
    // Si se pasa "delete" como argumento, elimina las colecciones; de lo contrario, vectoriza
    const action = process.argv[2];
    if (action === "delete") {
        await deleteAllCollections();
    } else {
        await vectorizeDocuments();
    }
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
