import express, { Request, Response } from 'express';
import pokemonController from './components/pokemon/controller/pokemon.controller';
import { PORT } from './config/config';

const app = express();

// Middleware
// Only parse json content-type requests
app.use(express.json());
// Only parse flat json body forms which is what is primarily supported by browsers
app.use(express.urlencoded({ extended: false }));

// Controllers
app.use('/pokemon', pokemonController);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!`);
});
