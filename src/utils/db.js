import mongoose from "mongoose";

const connect = async () => {
    try {
        // 1 connect with mongodb
        await mongoose.connect(process.env.MONGO);
    } catch (error) {
        throw new Error("Connection failed");
    }
};

export default connect;
