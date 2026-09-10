import express from 'express';
import cors from 'cors';
import { MovieRoutes } from './infra/express/routes/movie.routes.config';
import { CartRoutes } from './infra/express/routes/cart.routes.config';
const app: express.Application = express();
app.use(cors());
app.use(express.json());
app.use('/api/bttf/movies', new MovieRoutes().router);
app.use('/api/bttf/carts', new CartRoutes().router);

export default app;
