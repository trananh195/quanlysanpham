import fs from 'fs'
import qs from "qs";
import blogController from '../controller/blogController.js';

let blogRouter = {
    '/blogs': blogController.showAll,
    '/add-blog' : blogController.add,
}

export default blogRouter;