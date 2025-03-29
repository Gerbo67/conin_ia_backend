"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateSessionId = getOrCreateSessionId;
exports.getHistory = getHistory;
exports.addMessage = addMessage;
// src/sessionMemory.ts
const uuid_1 = require("uuid");
const conversationStore = {};
/**
 * Retorna el sessionId proporcionado o crea uno nuevo.
 */
function getOrCreateSessionId(providedId) {
    if (!providedId) {
        return (0, uuid_1.v4)();
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
function getHistory(sessionId) {
    return conversationStore[sessionId] || [];
}
/**
 * Añade un mensaje al historial.
 * Si excede 16 mensajes totales, elimina el más antiguo.
 */
function addMessage(sessionId, role, message) {
    const history = getHistory(sessionId);
    // Ahora se permiten hasta 16 mensajes
    if (history.length >= 16) {
        history.shift(); // elimina el más antiguo
    }
    history.push({ role, message });
    conversationStore[sessionId] = history;
}
//# sourceMappingURL=sessionMemory.js.map