import { store } from '../../store/reduxStore';
import axios, { AxiosResponse } from "axios";
import authAPI from '../../api/auth';
import gameAPI from '../../api/gameAPI';
import { GET_ERRORS } from "../../store/auth/types";
import { resolve } from 'path';


interface LeaderBoardItem {
   rank: any,
   user: String,
   points: any,
   avatar: any,
   self: Boolean
}

//returns the game info for a specific user
const getGameInfo = (userId: String) => {
   return new Promise((resolve, reject) => {
      axios.get(gameAPI.getGame + userId)
         .then((response: AxiosResponse) => {
            if (response.status === 200) {
               resolve(response);
            } else {
               reject(response.status);
            }
         })
         .catch((err: any) => {
            const payload = err.response.data;
            store.dispatch({
               type: GET_ERRORS,
               payload: payload
            });
            reject(payload);
         });
   })
}

//returns all the users
const getAllUser = () => {
   return new Promise((resolve, reject) => {
      axios.get(authAPI.getAllUsers)
         .then((response: AxiosResponse) => {
            if (response.status === 200) {
               resolve(response);
            }
         })
         .catch((err: any) => {
            const payload = err.response.data;
            store.dispatch({
               type: GET_ERRORS,
               payload: payload
            });
            reject(payload);
         });
   });
}
//now that we have the final list, we sort the users by points and give them a ranking
function compareItem(a: LeaderBoardItem, b: LeaderBoardItem) {
   if (a.points > b.points) {
      return -1;
   }
   if (a.points < b.points) {
      return 1;
   }
   return 0;
}


//builds a list of LeaderBoardItem, that can be used to create the leaderboard
const buildList = async () => {

   //index of the user in the list (-1 is user is not signed in)
   let indexSelf = -1;

   let finalList: any[] = [];
   let userValues: any;
   userValues = await getAllUser();

   try {
      let userList = userValues.data.UserList;
      for (let i = 0; i < userList.length; i++) {

         //getting the corresponding game value on the DB
         let gameValue: any
         gameValue = await getGameInfo(userList[i]._id);

         //if the user is connected, self will be true , if not is is false 
         let selfValue = (store.getState().auth.user.email == userList[i].email);

         finalList.push({
            rank: 0,
            self: selfValue,
            points: gameValue.data.points,
            user: userList[i].name.firstName + " " + userList[i].name.lastName.substring(0, 1) + ".",
            avatar: "https://avataaars.io/?avatarStyle=Circle&topType=" + userList[i].avatar.top + "&accessoriesType=" + userList[i].avatar.accessories + "&hairColor=" + userList[i].avatar.hairColor + "&facialHairType=" + userList[i].avatar.facialHair + "&clotheType=" + userList[i].avatar.clothes + "&eyeType=" + userList[i].avatar.eyes + "&eyebrowType=" + userList[i].avatar.eyebrows + "&mouthType=" + userList[i].avatar.mouth + "&skinColor=" + userList[i].avatar.skin + ""
         });
      }

      //sorting he list by points 
      finalList.sort(compareItem);

      //creating the ranking for each member in the list, since the list is already sorted 
      finalList[0].rank = 1;
      for (let i = 1; i < finalList.length; i++) {
         //getting the index of self (if one of them is true)
         if (finalList[i - 1].points == finalList[i].points) {
            finalList[i].rank = finalList[i - 1].rank;
         }
         else {
            finalList[i].rank = i + 1;
         }

      }

      //the last thing to do is the cut the list  to 10 people if user is in top 10, or 11 if user is not in top 10

      for (let i = 0; i < finalList.length; i++) {
         if (finalList[i].self) {
            indexSelf = i;
         }
      }
      if (indexSelf == -1) {
         finalList = finalList.slice(0, 10);
      }
      else if (indexSelf < 10) {

         finalList = finalList.slice(0, 10);
      }
      else {
         let selfElem: LeaderBoardItem = finalList[indexSelf];
         finalList = finalList.slice(0, 10);
         finalList.push(selfElem);
      }
   }
   catch (e: any) {
      console.log('Error:', e)
   }

   return finalList;

}



const LeaderboardContext = {
   buildList
};

export default LeaderboardContext;
