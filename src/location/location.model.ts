import { model, Schema } from "mongoose";

import ILocation from "./location.interface";

const locationSchema = new Schema<ILocation>(
    {
        _id: Schema.Types.ObjectId,
        city: {
            type: String,
            required: true,
        },
        street: {
            type: String,
            required: true,
        },
        house_number: {
            type: String,
            required: true,
        },
        capacity: {
            type: Number,
            required: true,
        },
        applied: {
            type: Number,
            required: true,
        },
    },
    { versionKey: false, id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

// userSchema.virtual("recipes", {
//     ref: "Recipes",
//     localField: "_id",
//     foreignField: "user_id", // ref_Field
//     justOne: false,
// });

// userSchema.virtual("posts", {
//     ref: "Posts",
//     localField: "_id",
//     foreignField: "user_id", // ref_Field
//     justOne: false,
// });

const locationModel = model<ILocation>("Locations", locationSchema, "locations");

export default locationModel;
