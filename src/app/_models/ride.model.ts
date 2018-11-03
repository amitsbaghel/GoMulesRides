import {User} from './user.model'
export interface Ride {
    from?:string;
    to?:string;
    date?:string;
    time?:string;
    seat?:number;
    charge?:string;
}

export interface RideDetails {
    from?:string;
    to?:string;
    date?:string;
    time?:string;
    seat?:number;
    cost?:string;
    _id?:string;
    details:string;
    userId?:User
}