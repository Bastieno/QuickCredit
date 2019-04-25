import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

export default app;
