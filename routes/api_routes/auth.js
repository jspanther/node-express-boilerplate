import express from 'express';
import AUthController from '../../src/controllers/auth.js';
const router = express.Router();

/* Auth API */
router.post('/login', AUthController.login);
router.get('/logout', AUthController.checkLogin, AUthController.logout);
router.post('/register', AUthController.register);
router.post(
  '/changePassword',
  AUthController.checkLogin,
  AUthController.changePassword
);
/* Profile API */
router.post(
  '/updateProfile',
  AUthController.checkLogin,
  AUthController.updateProfile
);
router.get('/getProfile', AUthController.checkLogin, AUthController.getProfile);

export default router;
