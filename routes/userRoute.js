import express from "express";
import { login, logout, register, updateProfile } from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { uploadProfileImage } from "../middleware/multer.js";


const router=express.Router();

router.route('/register').post(uploadProfileImage,register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/profile/update').put(isAuthenticated,uploadProfileImage,updateProfile);

export default router;