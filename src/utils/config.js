import mongoose from 'mongoose';

mongoose
  .connect(process.env.DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Connected to database'))
  .catch(error => console.error(error.message));

export default mongoose;
