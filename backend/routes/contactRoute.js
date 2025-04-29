import express from 'express';
import authUser from '../middlewares/authUser.js';
import { createContact, getContact } from '../controllers/contactController.js';
import authSeller from '../middlewares/authSeller.js';

const contactRouter = express.Router()

contactRouter.post('/user', authUser, createContact)
contactRouter.get('/seller', authSeller, getContact) 

export default contactRouter;