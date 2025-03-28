// Imports
import {Router} from 'express';
import {indexController} from '../controllers/indexController';

class IndexRoutes {
    public router: Router = Router();

    // Constructor of the class
    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', indexController.OK);
    }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;