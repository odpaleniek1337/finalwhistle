import mongoose from 'mongoose';

const connectMongo = async () => {
    try {
        const connection = await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('DB connected successfully');
        return connection;
    } catch (e) {
        console.error('Connection to db failed: ', e);
    }
};

export default connectMongo;