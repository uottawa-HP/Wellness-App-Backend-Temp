import { JournalMongo } from '../../database';

class JournalService {
    // adds journal entry
    public addEntry = () => {
        return JournalMongo.addEntry;
    };
    // gets journal entry
    public getEntry = () => {
        return JournalMongo.getEntry;
    };
    // updates journal entry
    public updateEntry = () => {
        return JournalMongo.updateEntry;
    };
    // gets list of all entries by user
    public getAllEntryByUser = () => {
        return JournalMongo.getAllEntryByUser;
    };
    // deletes journal entry
    public deleteEntry = () => {
        return JournalMongo.deleteEntry;
    };
}

export default JournalService;
