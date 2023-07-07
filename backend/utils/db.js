import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // this will be removed later
        const url = 'mongodb+srv://koushith:koushith97!@cluster0.mvgle.mongodb.net/masspulse?retryWrites=true&w=majority';
        const conn = await mongoose.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true,

        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.log(`Error: ${err.message}`);
    }
};

export default connectDB;