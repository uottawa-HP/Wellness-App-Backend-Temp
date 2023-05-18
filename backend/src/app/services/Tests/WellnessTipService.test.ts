import {WellnessTipService} from "../WellnessTipService"

const WS = new WellnessTipService();

const exampleTip = [{ date: '2021-01-11',
specialDay: undefined,
tipOfTheDay:
 'Do you have your HPV and Hepatitis B vaccines? These vaccines can help prevent cervical and liver cancers as well as protect against the viruses themselves!',
source: 'https://www.worldcancerday.org/what-cancer#prevention' } ]



test("Wellness Tip Request", ()=>{
    return WS.getDailyTips("2021-01-11").then((res)=>{
        expect(res).toStrictEqual(exampleTip);
    })
})