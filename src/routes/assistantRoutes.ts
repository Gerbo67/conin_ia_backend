// Imports
import {Router} from 'express';
import {assistantController} from '../controllers/assistantController';

class AssistantRoutes {
    public router: Router = Router();

    // Constructor of the class
    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/question', assistantController.QuestionAgent);
    }
}

const assistantRoutes = new AssistantRoutes();
export default assistantRoutes.router;