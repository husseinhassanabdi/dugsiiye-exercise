import 'dotenv/config';
import express from 'express';
import routes from './routes/admin.js';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/admin', routes);

//Routes
app.use('/auth', authRoutes);     // 👈 Handles /auth/register, /auth/login, /auth/profile
app.use('/admin', adminRoutes);   // 👈 Handles /admin/dashboard




mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch((err) => console.log('❌ MongoDB connection error:', err));  

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
