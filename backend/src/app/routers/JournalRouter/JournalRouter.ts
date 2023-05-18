import { Router } from 'express';

import { JournalService } from '../../services';

const JournalRouter = Router();
const journal = new JournalService();

// POST new journal entry
JournalRouter.post('/add-entry/', journal.addEntry());
// GET entry
JournalRouter.get('/get-entry/:entryid', journal.getEntry());
// PATCH entry
JournalRouter.patch('/update-entry/:entryid', journal.updateEntry());
// GET all entries by user
JournalRouter.get('/get-all-user-entry/:userid', journal.getAllEntryByUser());
// DELETE all entries by user
JournalRouter.delete('/delete-entry/:entryid', journal.deleteEntry());

export default JournalRouter;
