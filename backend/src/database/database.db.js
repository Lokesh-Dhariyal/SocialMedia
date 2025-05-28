import mongoose from "mongoose";

const DB_Name = "SocialMedia"

const connectDb = async ()=>{
   try {
    const connection =  await mongoose.connect(`${process.env.MongoDB_URL}/${DB_Name}`)
    console.log(`\n MongoDB connected DB host: ${connection.connection.host}`);
   } catch (error) {
     console.log("database connection error", error);
     process.exit(1); // Exit the process with failure (non-zero) status code
   }
}

export default connectDb;