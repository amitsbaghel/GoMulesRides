import { User } from "./user.model";

export interface Res {
    status:string,
    message:string,
    user:User
}