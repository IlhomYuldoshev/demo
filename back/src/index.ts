import express from 'express';
import searchRoutes from './routes/search-routes';
import { errorHandlerMiddleware } from './middlewares/error-handler';
import cors from 'cors'

const app = express();
const port = 9090;

// -------------------- MIDDLEWARES
app.use(cors())
app.use(express.json());


// -------------------- ROUTES
app.use(searchRoutes);
app.use(errorHandlerMiddleware)

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
