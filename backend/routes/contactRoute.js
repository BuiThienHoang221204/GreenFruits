import express from 'express';
import authUser from '../middlewares/authUser.js';
import { createContact } from '../controllers/contactController.js';

const contactRouter = express.Router()

contactRouter.post('/user', authUser, createContact)

export default contactRouter;