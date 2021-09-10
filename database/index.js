import mongoose from 'mongoose';

const uri = process.env.MONGO_URI || "mongodb+srv://GabrielAdmin:Gabrieladmin123@cluster0.mzwcn.mongodb.net/SharedListsDB?retryWrites=true&w=majority";
const options = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };

const connectDB = async () => {
    try {
        await mongoose.connect(uri, options);
        console.log("Database connected");
    } catch (error) {
        console.log(err);
    }
}

export default connectDB;