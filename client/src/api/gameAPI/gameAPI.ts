import serverURL from '../serverURL';

// Create and export API for gamification actions
const getGame = serverURL + '/get-game-info/';
const updateGame = serverURL + '/update-game-info/';

const gameAPI = {
    getGame,
    updateGame
};

export default gameAPI;
