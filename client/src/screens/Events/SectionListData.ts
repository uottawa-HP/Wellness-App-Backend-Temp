import IEvent from './../../interfaces/EventsInterface/EventsInterface';

export default class SectionListData { 
	public title: string;
	public data: IEvent[];

    constructor(title:string) {
        this.title = title;
        this.data = new Array<IEvent>();
    }

    addEvent = (event:IEvent) => {
        if(event) {
            this.data.push(event);
        }
    };
};