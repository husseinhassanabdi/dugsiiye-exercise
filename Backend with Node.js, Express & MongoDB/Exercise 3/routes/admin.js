import express from 'express';
import { protect } from '../middlewares/auth.js';
import { authorize } from '../middlewares/authorize.js';

// const express = express();
const router = express.Router();

router.get('/dashboard', protect, authorize('admin'), (req, res) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      message: "Access denied: Requires one of [admin]"
    });
  }

  return res.status(200).json({
    message: `Welcome to the admin dashboard, ${req.user.name}`
  });
});

export default router;
