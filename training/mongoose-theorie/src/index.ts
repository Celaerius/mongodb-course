import mongoose from "mongoose";
import { UserModel } from "./schema.ts";

async function init() {
    try { 
        let connection = await mongoose.connect('mongodb://root:test123@localhost:27017/sample_mflix?authSource=admin');

        console.log("Connecté à " + connection.connection.db?.databaseName);
    } catch(e) {
        console.log("Une erreur est survenue :", e);
    }

    const users = await UserModel.findOne({
        name: "Bowen Marsh"
    });

    const newUser = new UserModel({
        name: "Amaury Deflorenne",
        email: "amaury@triptyk.eu",
        password: "pudipudi1997"
    });

    await newUser.save();

    console.log(users);
}

init();