import "reflect-metadata";

import { IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";
import { Schema } from "mongoose";

// import { Match } from "./match.decorator";
import ILocation from "./location.interface";

export default class CreateUserDto implements ILocation {
    @IsMongoId()
    @IsOptional()
    public _id: Schema.Types.ObjectId;

    @IsString()
    public city: string;

    @IsString()
    public street: string;

    @IsString()
    public house_number: string;

    @IsNumber()
    public capacity: number;

    @IsNumber()
    public applied: number;
}
