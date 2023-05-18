import { UserMongo } from '../../database';

class UserService {

    // gets user info
    public loginSSO = () => {
        return UserMongo.loginSSO;
    };
    // updates user info
    public updateUser = () => {
        return UserMongo.updateUser;
    }
    // gets list all users
    public getAllUsers = () => {
        return UserMongo.getAllUsers;
    }
    // get a specific user
    public getUser = () => {
        return UserMongo.getUser;
    };
    public getLogInSuccess = () => {
        return UserMongo.loginSuccess;
    }
}

export default UserService;
