import {RidePosting} from '../_models/ride.model'
export interface Booking {
    _id?:string;
    seat:string;
    charge:string;
    userID:string;
    rideID:string;
}

export interface BookingDetails {
    _id?:string;
    seat:string;
    charge:string;
    rideId:RidePosting;
    rating:number;
    bookedByUserId?:string
}