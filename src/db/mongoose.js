const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false,
      useUnifiedTopology: true,
    });
    if(process.env.NODE_ENV !== 'production') { 
        const mDB = mongoose.connection
              
        // mDB.on("open", () => {
        //     console.log('MongoDB Connected');
        //      })
        console.log("Mongo connection established.")
        mDB.on("error", () => {
            console.log(error)
             })
    }
  
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

