import express from 'express';
import cors from 'cors';
import router from '../routes';
import helmet from 'helmet';
import passport from 'passport';
import passportConfig from '../config/passport-config';
import { createServer } from 'http';
import morgan from 'morgan';
import cookie from 'cookie-parser';
import 'dotenv/config';

passportConfig(passport);
const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(helmet());
app.use(cookie());
app.use(express.json());
app.use(passport.initialize());
app.use(morgan('dev'));
app.use('/api/v1', router);

const server = createServer(app);

export default server;
