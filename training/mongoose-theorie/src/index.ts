import mongoose from "mongoose";
import { UserModel } from "./schema.ts";

async function init() {
    try { 
        mongoose.set('debug', true);
        let connection = await mongoose.connect('mongodb://root:test123@localhost:27017/sample_mflix?authSource=admin', {
            
        });

        console.log("Connecté à " + connection.connection.db?.databaseName);
    } catch(e) {
        console.log("Une erreur est survenue :", e);
    }

    const users = await UserModel.findOne({
        email: "sean_bean@gameofthron.es"
    });

    users?.overwrite({
        lastName: 'Amaury',
        firstName: 'Deflorenne',
        email: "sean_bean@gameofthron.es",
        password: "123456789"
    });

    console.log("Full name via virtual:", users?.fullName);

    users.fullName = "Amaury Deflorenne";

    await users.save();

    console.log("Full name via method:", users);



   /*  await UserModel.findAndSave(users._id.toString(), {
        lastName: 'Amaury',
        firstName: 'Deflorenne',
        email: "sean_bean@gameofthron.es"
    }); */
}

init();