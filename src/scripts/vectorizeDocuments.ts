// src/scripts/vectorizeDocument.ts
import { Chroma } from "@langchain/community/vectorstores/chroma";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import fs from "fs";
import path from "path";

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

// Ejecutar el proceso de vectorización
vectorizeDocuments()
    .then(() => {
        console.log("Proceso de vectorización completado exitosamente.");
        process.exit(0);
    })
    .catch((error) => {
        console.error("Error en el proceso de vectorización:", error);
        process.exit(1);
    });
