import { Request, Response } from 'express';

import { GameModel } from '../../models/';

const getGame = (req: Request, res: Response) => {
    try {
        // gets the gamification value for a specific user, receive the user id in argument
        GameModel.findOne({ "userId": req.params.userid }).then((game: any) => {
            if (!game) {
                const error = { points: "Error getting points" };
                return res.status(404).json(error);
            }
            else if (game) {
                // returning the values found
                const payload = {
                    points: game.points,
                    accountCreated: game.accountCreated,
                    avatarCreated:game.avatarCreated,
                    wellnessTipShared: game.wellnessTipShared,
                    eventShared: game.eventShared,
                    dailyStreakCompleted: game.dailyStreakCompleted,
                    notificationActivated: game.notificationActivated,
                    blogPostRated: game.blogPostRated,
                    journalUsed: game.journalUsed,
                    streak: game.streak,
                    lastLoginDate: game.lastLoginDate,
                    gamificationId: game._id,
                    serviceBooked: game.serviceBooked,
                };

                // console.log("Fouhd  gamification values : "+payload)
                res.status(200).json(payload);
            }
            else { res.status(404).json({ output: "not found" }); }
        });
    }
    catch (error: any) {
        res.status(400).json({ errorResponse: error, userID: req.params.userid });
    }
};
// updating the gamification value for a user
const updateGame = (req: Request, res: Response) => {
    try {
        // updated values received
        const update = {
            points: req.body.points,
            accountCreated: req.body.accountCreated,
            avatarCreated: req.body.avatarCreated,
            wellnessTipShared: req.body.wellnessTipShared,
            eventShared: req.body.eventShared,
            dailyStreakCompleted: req.body.dailyStreakCompleted,
            notificationActivated: req.body.notificationActivated,
            blogPostRated: req.body.blogPostRated,
            journalUsed: req.body.journalUsed,
            streak: req.body.streak,
            lastLoginDate: req.body.lastLoginDate,
            serviceBooked: req.body.serviceBooked,
        }
        // applyng change to the user
        GameModel.findByIdAndUpdate(req.params.gameid, update)
            .then((game: any) => {
                const payload = {
                    points: game.points,
                    accountCreated: game.accountCreated,
                    avatarCreated: game.avatarCreated,
                    wellnessTipShared: game.wellnessTipShared,
                    eventShared: game.eventShared,
                    dailyStreakCompleted: game.dailyStreakCompleted,
                    notificationActivated: game.notificationActivated,
                    blogPostRated: game.blogPostRated,
                    journalUsed: game.journalUsed,
                    streak: game.streak,
                    lastLoginDate: game.lastLoginDate,
                    userId: game.userId,
                    serviceBooked: game.serviceBooked,
                };
                res.status(200).json(payload);
            })
            .catch(err => res.status(400).json({ location:"GameMongo.ts", error: err }))
    }
    catch (error: any) {
        res.status(400).json({ errorResponse: error, userID: req.params.gameid });
    }
}

const GameMongo = {
    getGame,
    updateGame
};

export default GameMongo;
