import { Schema } from 'mongoose';

const Journal = new Schema({
    userId: Schema.Types.ObjectId, // Reference to user
    title: String,
    date: Schema.Types.Date,
    entry: {
        type: String,
        DefaultStringColumnLength: 2147483647 // Maximum possible length
    }
});

export default Journal;
