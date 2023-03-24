import { Schema } from "mongoose";
export default interface IUser {
    _id?: Schema.Types.ObjectId;
    name: string;
    sex: string;
    birthdate: string;
    email: string;
    email_verified: boolean;
    auto_login: boolean;
    picture: string;
    password: string;
    roles: string[];
}
