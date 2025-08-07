import mongoose from "mongoose";

const uri = 'mongodb://127.0.0.1:27017/project';

const connectDB = async () => {

    mongoose.connection.on('connected', () => {
        console.log("DB connected");
    })

    await mongoose.connect(uri)

}

export default connectDB;