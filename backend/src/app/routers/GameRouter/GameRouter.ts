import { Router } from 'express';

import { GameService } from '../../services';

const GameRouter = Router();
const game = new GameService();

// GET gamification record
GameRouter.get('/get-game-info/:userid', game.getGame());
// PATCH gamification record
GameRouter.patch('/update-game-info/:gameid', game.updateGame());

export default GameRouter;
