"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
const express_1 = require("express");
const indexController_1 = require("../controllers/indexController");
class IndexRoutes {
    // Constructor of the class
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', indexController_1.indexController.OK);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
//# sourceMappingURL=indexRoutes.js.map