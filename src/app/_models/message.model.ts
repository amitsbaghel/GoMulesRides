
export interface Message {
    createdDate?:string,
    sentById:string,
    sentToId:string,
    message:string,
    _id?:string
}

export interface MessageUser {
    _id?:string;
    sentToId:string;
    sentToName:string;
    tobeopened:boolean;
    sentById:string,
    sentByName:string
}
