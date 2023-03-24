import { Schema } from "mongoose";
export default interface ILocation {
    _id?: Schema.Types.ObjectId;
    city: string;
    street: string;
    house_number: string;
    capacity: number;
    applied: number;
}
