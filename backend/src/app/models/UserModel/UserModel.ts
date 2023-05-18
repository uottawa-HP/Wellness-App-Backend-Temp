import { model } from 'mongoose';

import User from './User';

const UserModel = model('users', User);

export default UserModel;
