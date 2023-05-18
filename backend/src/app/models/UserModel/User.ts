import { Schema } from 'mongoose';

const User = new Schema({
    name: {
        firstName: String,
        lastName: String
    },
    email: String,
    // dateOfBirth: Schema.Types.Date,
    // gender: {
    //     type: String,
    //     enum: ['Male', 'Female', 'Other', 'Undeclared'],
    //     default: 'Undeclared'
    // },
    // password: String,
    avatar: { // Save different parts as object so each can be called to create a string url
        // Saved
        skin: {
            type: String,
            default: 'undefined'
        },
        eyes: {
            type: String,
            default: 'undefined'
        },
        eyebrows: {
            type: String,
            default: 'undefined'
        },
        mouth: {
            type: String,
            default: 'undefined'
        },
        top: {
            type: String,
            default: 'undefined'
        },
        hairColor: {
            type: String,
            default: 'undefined'
        },
        facialHair: {
            type: String,
            default: 'undefined'
        },
        clothes: {
            type: String,
            default: 'undefined'
        },
        accessories: {
            type: String,
            default: 'undefined'
        }
    }
});

export default User;
