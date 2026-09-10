import * as dotenv from 'dotenv';
import app from './app';
import { logger } from './shared/utils/logger';

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10) || 5000;
app.listen(PORT, () => {
    logger.info(`Server running at http://localhost:${PORT}`);
});
