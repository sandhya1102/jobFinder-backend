import express from 'express'
import { getCompany, getCompanyId, registerCompany, updateCompany } from '../controllers/companyController.js';
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { uploadLogo } from '../middleware/multer.js';

const router = express.Router();

router.route('/register').post( isAuthenticated,registerCompany);
router.route('/get').get(isAuthenticated,getCompany);
router.route('/get/:id').get(isAuthenticated,getCompanyId);
router.route('/update/:id').put(isAuthenticated,uploadLogo,updateCompany);

export default router;