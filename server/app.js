import express from 'express';
import log from 'fancy-log';
import compression from 'compression';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import router from './routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(compression()); // Compress all routes
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

// Implement the 'catch-all' errorHandler
app.use((err, req, res, next) => {
  res.status(500);
  res.json({
    message: `Hey!! we caught the error 👍👍, ${err.stack} `,
    status: 'failure'
  });
});

app.listen(port, () => {
  log(`Server started on port ${port}`);
});

export default app;
