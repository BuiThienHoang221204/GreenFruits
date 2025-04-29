import express from 'express';
import { askChat } from '../controllers/chatboxController.js';

const chatboxRouter = express.Router();

chatboxRouter.post('/user', askChat);

export default chatboxRouter;