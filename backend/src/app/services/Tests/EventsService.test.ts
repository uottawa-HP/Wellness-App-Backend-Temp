// import { IEvent, Language, VirtualOrInPerson } from "../../interfaces";
// import {EventsService} from "../EventsService"
// import {exampleRow1,exampleRow2, exampleRow3,exampleEvent,expectedResult} from "./EventsServiceExampleValues"
// const ES = new EventsService();

// test('Type checking EventsService getEvents', ()=>{
//     return ES.getEvents(null).then((res:any[])=>{
//         expect(res.length).toBeGreaterThan(0);
//         res.forEach((event:IEvent) => {
//             expect(event.id).toEqual(expect.any(String))
//             expect(event.eachDay).toEqual(expect.any(String))
//             expect(event.name).toEqual(expect.any(String))
//             if (event.eventLead !== undefined){
//                 expect(event.eventLead).toEqual(expect.any(String));
//             }
//             if (event.theme !== undefined){
//                 expect(event.theme).toEqual(expect.any(String));
//             }
//             expect(Object.values(Language)).toContain(event.language);
//             if (event.time !== undefined){
//                 expect(event.time).toEqual(expect.any(String));
//             }
//             expect(event.startDate).toEqual(expect.any(Date))
//             expect(event.endDate).toEqual(expect.any(Date))
//             if (event.location !== undefined){
//                 expect(event.location).toEqual(expect.any(String));
//             }
//             expect(Object.values(VirtualOrInPerson)).toContain(event.virtualOrInPerson);
//             if (event.details !== undefined){
//                 expect(event.details).toEqual(expect.any(String));
//             }
//             if (event.registration !== undefined){
//                 expect(event.registration).toEqual(expect.any(String));
//             }
//             if (event.pillar !== undefined){
//                 expect(event.pillar).toEqual(expect.any(String||Array))
//             }
//         });
//     })
// })


// describe('Parsing smartsheet event', ()=>{
//     test('Each day',()=>{
//         exampleEvent.cells[7].value = 'tuesday'
//         exampleEvent.cells[8].value = ''
//         const dateNow = new Date(0);
//         expect(ES.parseSmarsheet({rows:[exampleRow1, exampleRow2, exampleRow3, exampleEvent]},dateNow)).toStrictEqual(expectedResult)
//     })
// })