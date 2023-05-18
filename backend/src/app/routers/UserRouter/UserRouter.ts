import { Router } from 'express';

import { UserService } from '../../services';

const UserRouter = Router();
const user = new UserService();

// POST loginSSO
UserRouter.post('/loginSSO', user.loginSSO());
// PATCH User
UserRouter.patch('/update-user/:userid', user.updateUser());
// GET All Users
UserRouter.get('/get-all-users', user.getAllUsers());
// GET a user
UserRouter.get('/get-user/:userid', user.getUser());
// GET login success
UserRouter.get('/login-success',user.getLogInSuccess());

export default UserRouter;
