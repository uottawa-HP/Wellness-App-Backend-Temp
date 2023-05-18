import axios, { AxiosResponse } from "axios";
import { journalAPI } from '../../api';

// Add entry to database
const addEntry = (userData: Object) => {
    return new Promise((resolve, reject) => {
        // Add entry details to database
        axios.post(journalAPI.addEntry, userData)
            .then((response: AxiosResponse) => {
                // Wait for OK response
                if (response.status === 200) {
                    resolve(response);
                } else {
                    reject(response.status);
                }
            })
            .catch((err: any) => {
                const payload = err.response.data;
                reject(payload);
            });
    });
};

// Fetch entry from database
const getEntry = (entryId: String) => {
    return new Promise((resolve, reject) => {
        // Get based on entry id
        axios.get(journalAPI.getEntry + entryId)
            .then((response: AxiosResponse) => {
                if (response.status === 200) {
                    resolve(response);
                } else {
                    reject(response.status);
                }
            })
            .catch((err: any) => {
                const payload = err.response.data;
                reject(payload);
            });
    });
};

// Fetch all of a user's entries to display on journal home page
const getAllUserEntry = async (userId: String) => {
    // List to store all entries
    var data: { [key: string]: any } = {};
    await new Promise((resolve, reject) => {
        // Give user id to get entries
        axios.get(journalAPI.getAllUserEntry + userId)
            .then((response: AxiosResponse) => {
                if (response.status === 200) {
                    // Set list to returned data set in response
                    data = response.data;
                    resolve(response.data);
                } else {
                    data = { "statusText": response.statusText };
                    reject(response.status);
                }
            })
            .catch((err: any) => {
                const payload = err.response.data;
                reject(payload);
            });
    });
    // Return list
    return data;
};

// Update entry details on database
const updateEntry = (userData: Object, entryId: String) => {
    return new Promise((resolve, reject) => {
        // Provide entry id and info to update
        axios.patch(journalAPI.updateEntry + entryId, userData)
            .then((response: AxiosResponse) => {
                if (response.status === 200) {
                    resolve(response);
                } else {
                    reject(response.status);
                }
            })
            .catch((err: any) => {
                const payload = err.response.data;
                reject(payload);
            });
    });
};

// Remove an entry from database permanently
const deleteEntry = (entryId: String) => {
    return new Promise((resolve, reject) => {
        axios.delete(journalAPI.deleteEntry + entryId)
            .then((response: AxiosResponse) => {
                if (response.status === 200) {
                    resolve(response);
                } else {
                    reject(response.status);
                }
            })
            .catch((err: any) => {
                const payload = err.response.data;
                reject(payload);
            });
    });
};

const JournalContext = {
    addEntry,
    getEntry,
    getAllUserEntry,
    updateEntry,
    deleteEntry
};

export default JournalContext;
