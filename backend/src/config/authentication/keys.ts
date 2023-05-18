import database from '../database';

// Create secret key to connect to database
const keys = { mongoURI: database, secretOrKey: 'secret' };

export default keys;
