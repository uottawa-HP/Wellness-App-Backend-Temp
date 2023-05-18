import serverURL from '../serverURL';

// Create and export API for auth actions
const loginSSO = serverURL +'/loginSSO'
const updateUser = serverURL + '/update-user/';
const getAllUsers = serverURL + '/get-all-users/';
const getUser = serverURL + '/get-user/'

const authAPI = {
    loginSSO: loginSSO,
    updateUser: updateUser,
    getAllUsers: getAllUsers,
    getUser: getUser,
}

export default authAPI;
