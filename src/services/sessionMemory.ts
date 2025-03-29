// src/sessionMemory.ts
import { v4 as uuidv4 } from 'uuid';

interface ConversationMessage {
    role: 'user' | 'assistant';
    message: string;
}

const conversationStore: Record<string, ConversationMessage[]> = {};

/**
 * Retorna el sessionId proporcionado o crea uno nuevo.
 */
export function getOrCreateSessionId(providedId?: string): string {
    if (!providedId) {
        return uuidv4();
    }
    // Si llega un sessionId que aún no existe, lo inicializamos en vacío
    if (!conversationStore[providedId]) {
        conversationStore[providedId] = [];
    }
    return providedId;
}

/**
 * Obtiene el historial de la sesión o un array vacío.
 */
export function getHistory(sessionId: string): ConversationMessage[] {
    return conversationStore[sessionId] || [];
}

/**
 * Añade un mensaje al historial.
 * Si excede 16 mensajes totales, elimina el más antiguo.
 */
export function addMessage(sessionId: string, role: 'user' | 'assistant', message: string): void {
    const history = getHistory(sessionId);

    // Ahora se permiten hasta 16 mensajes
    if (history.length >= 16) {
        history.shift(); // elimina el más antiguo
    }

    history.push({ role, message });
    conversationStore[sessionId] = history;
}
