import { model, Schema } from "mongoose";

const schema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    }
});

export const UserModel = model("User", schema);