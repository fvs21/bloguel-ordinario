import express from 'express';
import authRouter from './core/auth/router.js';
import communityRouter from './core/community/router.js';
import connectToDatabase from './db/index.js';
import dotenv from 'dotenv';

dotenv.config();

connectToDatabase();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

app.use('/api/auth', authRouter);
app.use('/api/community', communityRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});