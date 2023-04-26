import express from 'express';
import AUthController from '../../src/controllers/auth.js';
const router = express.Router();

router.post('/login', AUthController.login);
router.get('/logout', AUthController.checkLogin, AUthController.logout);
router.post('/register', AUthController.register);
router.post(
  '/changePassword',
  AUthController.checkLogin,
  AUthController.changePassword
);

export default router;
