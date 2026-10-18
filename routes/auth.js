// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// export const protect = async (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'No token provided' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select('-password');
//     next();
//   } catch (err) {
//     res.status(401).json({ message: 'Invalid or expired token' });
//   }
// };

// export default router;

import express from 'express';
import { register, login } from '../controllers/authController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

// 1. Register User
router.post('/register', register);

// 2. Login User
router.post('/login', login);

// 3. Access Protected Profile
router.get('/profile', protect, (req, res) => {
  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role
  });
});

export default router;