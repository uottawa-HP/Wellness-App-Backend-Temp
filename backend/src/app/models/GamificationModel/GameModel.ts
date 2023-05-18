import { model } from 'mongoose';

import Game from './Game';

const GameModel = model('gamifications', Game);

export default GameModel;
