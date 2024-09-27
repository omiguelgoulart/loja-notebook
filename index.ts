import express from 'express';
import { PrismaClient } from '@prisma/client';
import routesNotebook from './routes/notebook';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.use('/notebook', routesNotebook);

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});