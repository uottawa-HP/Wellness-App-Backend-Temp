import { Request, Response } from 'express';
import { Mongoose } from 'mongoose';

import keys from '../../../config/authentication/keys';
import { UserModel, GameModel } from '../../models/';

const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
// Get user from database
const getUser = (req: Request, res: Response) => {
    try {
        // gets the user value for a specific user, receive the user id in argument
        UserModel.findOne({ "_id": req.params.userid }).then((user: any) => {
            if (!user) {
                const error = { points: "Error getting user" };
                return res.status(404).json(error);
            }
            else if (user) {
                // returning the values found
                const payload = {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    dateOfBirth: user.dateOfBirth,
                    gender: user.gender,
                    avatar: user.avatar
                };
                res.status(200).json(payload);
            }
            else { res.status(404).json({ output: "not found" }); }
        });
    }
    catch (error: any) {
        res.status(400).json({ errorResponse: error, userID: req.params.userid });
    }
};
// Get all users in database
const getAllUsers = (req: Request, res: Response) => {
    try {
        UserModel.find({}, (err: any, UserList: Document[]) => {
            if (err) { throw err; }
            else if (UserList && UserList.length !== 0) { res.status(200).json({ UserList }); } // Get and store as list
            else { res.status(404).json({ output: "not found" }); }
        });
    }
    catch (error: any) {
        res.status(400).json({ errorResponse: error });
    }
};

// Update user info
const updateUser = (req: Request, res: Response) => {
    try {
        // Get all info and update all fields simultaneously even if there is no change
        const update = {
            name: req.body.name,
            email: req.body.email,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            avatar: req.body.avatar
        }
        // Find user id and update info
        UserModel.findByIdAndUpdate(req.params.userid, update)
            .then((user: any) => {
                const payload = {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    dateOfBirth: user.dateOfBirth,
                    gender: user.gender,
                    avatar: user.avatar
                };
                res.status(200).json(payload);
            })
            .catch(err => res.status(400).json({ error: "Improper game ID or data (UserMongo.ts)" })) // This means there is an error in the code so this should not occur
    }
    catch (error: any) {
        res.status(400).json({ errorResponse: error, userID: req.params.gameid }); // Error in code or database
    }
}

const loginSuccess = (req: Request, res: Response) => {
    return res.status(400).json({message:"Successfull"});
}

const loginSSO = (req: Request, res: Response) => {
    try {
        // gets the user value for a specific user, receive the user id in argument
        UserModel.findOne({ "email": req.body.email }).then((user: any) => {
            if (!user) {
                console.log("Creating a new user.")
                // If user is new add to database
                const newUser: any = new UserModel({
                    name: {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName
                    },
                    email: req.body.email,
                });
                newUser.save().catch(e_catch => console.log("Error while saving the new user : "+e_catch));
                console.log("New user record created succesfully : "+newUser._id)


                // Creating a gamification for the user
                const linkedUserID = newUser._id;
                const userGameRecord = new GameModel({
                    userId: linkedUserID,
                    lastLoginDate: new Date()
                });

                userGameRecord.save().catch(e_catch => console.log("Error while saving the new gamification record : "+e_catch));
                console.log("New gamification record created succesfully : "+userGameRecord._id)
                res.status(200).json(newUser);
            }
            else if (user) {
                console.log("Logging in an existing user.")
                // returning the values found
                const payload = {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    dateOfBirth: user.dateOfBirth,
                    avatar: user.avatar
                };

                res.status(200).json(payload);
            }
            else { res.status(404).json({ output: "not found" }); }
        });
    }
    catch (error: any) {
        console.log("An error occured in the backend UserMongo.ts, loginSSO ")
        res.status(400).json({ errorResponse: error, email: req.body.email });
    }
}

const UserMongo = {
    getUser,
    getAllUsers,
    loginSSO,
    updateUser,
    loginSuccess,
};

export default UserMongo;
