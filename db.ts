import mongoose, { ConnectOptions } from "mongoose";

let isConnected: boolean = false;

export const connect = async (): Promise<void> => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('Already connected to database');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI as string, {
            dbName: "cantina",
        } as ConnectOptions);
        isConnected = true;
        console.log('Connected to database');
    } catch (error) {
        console.log('Error connecting to database', error);
    }
}
