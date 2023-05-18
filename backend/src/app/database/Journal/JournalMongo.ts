import { Request, Response } from 'express';

import { JournalModel } from '../../models/';

const addEntry = (req: Request, res: Response) => {
    // New journal entry
    try {
        // Create model
        let title: string;
        const date = new Date();
        if (req.body.title) {
            title = req.body.title;
        } else {
            title = "Journal Entry on " + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
        }
        const newEntry: any = new JournalModel({
            userId: req.body.userId,
            title,
            date,
            entry: req.body.entry
        });
        // Save entry in mongo db
        newEntry
            .save()
            .then(() => {
                res.status(200).json({ newEntry });
            })
            .catch(e_catch => console.log(e_catch));
    } catch (err: any) {
        res.status(503).json('Service Unavailable');
        console.log(err.stack);
    }
};

const getEntry = (req: Request, res: Response) => {
    try {
        // Find particular post based on given entry id
        JournalModel.findById(req.params.entryid, (err: any, entry: Document) => {
            if (err) { throw err; }
            else if (entry) { res.status(200).json({ entry }); }
            else { res.status(404).json({ error: "Entry not found" }); }
        });
    }
    catch (error: any) {
        res.status(400).json({ error, entryID: req.params.id });
    }
};

const getAllEntry = (req: Request, res: Response) => {
    try {
        // {} gets all entries in db
        JournalModel.findById({}, (err: any, entryList: Document[]) => {
            if (err) { throw err; }
            else if (entryList && entryList.length !== 0) { res.status(200).json({ entryList }); }
            else { res.status(404).json({ error: "Entries not found" }); }
        });
    }
    catch (error: any) {
        res.status(400).json({ error, userID: req.params.userid });
    }
};

const getAllEntryByUser = (req: Request, res: Response) => {
    try {
        // Gets all entries in db for current user
        console.log(req.params);
        JournalModel.find({ "userId": req.params.userid }, (err: any, entryList: Document[]) => {
            // console.log(entryList);
            if (err) { throw err; }
            else if (entryList && entryList.length !== 0) { res.status(200).json({ entryList }); }
            else { res.status(404).json({ error: "Entries not found" }); }
        });
    }
    catch (error: any) {
        res.status(400).json({ error, userID: req.params.userid });
    }
};

const updateEntry = (req: Request, res: Response) => {
    try {
        const update = {
            title: req.body.title,
            entry: req.body.entry
        }
        // Find id of journal entry and update using new values
        JournalModel.findByIdAndUpdate(req.params.entryid, update)
            .then((entry: any) => {
                const payload = {
                    entryId: entry._id,
                    userId: entry.userId,
                    title: entry.title,
                    date: entry.date,
                    entry: entry.entry
                };
                res.status(200).json(payload);
            })
            .catch(err => res.status(400).json({ error: "Entry could not be updated due to error " + err }))
    }
    catch (error: any) {
        res.status(400).json({ error, entryID: req.params.entryid });
    }
}

const deleteEntry = (req: Request, res: Response) => {
    try {
        JournalModel.findByIdAndDelete(req.params.entryid)
            .then((entry: any) => {
                const payload = {
                    output: entry.entry
                };
                res.status(200).json(payload);
            })
            .catch(err => res.status(400).json({ error: err }))
    }
    catch (error: any) {
        res.status(400).json({ error, entryID: req.params.entryid });
    }
}

const JournalMongo = {
    addEntry,
    getEntry,
    getAllEntry,
    getAllEntryByUser,
    updateEntry,
    deleteEntry
};

export default JournalMongo;
