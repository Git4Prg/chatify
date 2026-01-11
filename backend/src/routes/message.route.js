import express from "express";
import { getAllContacts, getChatPartners, getMessagesByUserId, sendMessage } from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import {arcjetProtection} from "../middleware/arcjet.middleware.js";

const router = express.Router();

/* the middlewares execute in order - so requests get rate-limited first, then authenticated.
this is actually more efficient since unauthenticated requests get blocked by rate limiting before 
hitting the auth middleware. */
router.use(arcjetProtection, protectRoute);

// The order of the following 4 lines is important
router.get("/contacts", protectRoute, getAllContacts);
router.get("/chats", protectRoute, getChatPartners);
router.get("/:id", protectRoute, getMessagesByUserId);
router.get("/send", protectRoute, sendMessage);

export default router;