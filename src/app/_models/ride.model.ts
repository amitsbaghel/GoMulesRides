import { User } from './user.model'
import { Booking } from './booking.model';
export interface Ride {
    from?: string;
    to?: string;
    date?: string;
    time?: string;
    seat?: number;
    charge?: string;
    status?: string;
}

// export interface RideDetails {
//     from?: string;
//     to?: string;
//     date?: string;
//     time?: string;
//     seat?: number;
//     cost?: string;
//     _id?: string;
//     details: string;
//     userId?: User;
// }

export interface RidePosting {
    _id:{
        _id: string, 
        from: string, 
        userid: string, 
        to: string, 
        date: Date,
        time: Date,
        overallseats: number,
        chargeperseat: number,
        status: string,
        name: string
    }
    totalbookingseats: number,
    totalbookingcharge: number
}