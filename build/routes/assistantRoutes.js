"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
const express_1 = require("express");
const assistantController_1 = require("../controllers/assistantController");
class AssistantRoutes {
    // Constructor of the class
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/question', assistantController_1.assistantController.QuestionAgent);
    }
}
const assistantRoutes = new AssistantRoutes();
exports.default = assistantRoutes.router;
//# sourceMappingURL=assistantRoutes.js.map