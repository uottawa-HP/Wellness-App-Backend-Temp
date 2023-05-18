import serverURL from '../serverURL';

// Create and export API for journal entry related actions
const addEntry = serverURL + '/add-entry';
const getEntry = serverURL + '/get-entry/';
const updateEntry = serverURL + '/update-entry/';
const getAllUserEntry = serverURL + '/get-all-user-entry/';
const deleteEntry = serverURL + '/delete-entry/';


const journalAPI = {
    addEntry,
    getEntry,
    updateEntry,
    getAllUserEntry,
    deleteEntry
};

export default journalAPI;
