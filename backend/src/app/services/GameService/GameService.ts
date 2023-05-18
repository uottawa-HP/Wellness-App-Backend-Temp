import { GameMongo } from '../../database';

class GameService {

    // gets game info
    public getGame = () => {
        return GameMongo.getGame;
    };
    // updates game info
    public updateGame = () => {
        return GameMongo.updateGame;
    };
}

export default GameService;
