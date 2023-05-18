import { Schema } from 'mongoose';

// model of all the gamificatin values for a user
const Game = new Schema({
    userId: Schema.Types.ObjectId, // Reference to user
    points: {
        type: Number,
        default: 50 // 50 points for creating an account
    },
    accountCreated: {
        type: Boolean,
        default: true, // Because this is only created when a user creates an account
    },
    avatarCreated: {
        type: Boolean,
        default: false
    },
    wellnessTipShared: {
        type: Boolean,
        default: false
    },
    eventShared: {
        type: Boolean,
        default: false
    },
    dailyStreakCompleted: {
        type: Boolean,
        default: false
    },
    notificationActivated: {
        type: Boolean,
        default: false
    },
    blogPostRated: {
        type: Boolean,
        default: false
    },
    journalUsed: {
        type: Boolean,
        default: false
    },
    serviceBooked: {
        type: Boolean,
        default: false
    },
    streak: {
        type: Number,
        default: 0 // Daily streak is number of onosecutive days logged in
    },
    lastLoginDate: Schema.Types.Date // Current date is the last time user logged in
});

export default Game;
