const mongoose = require('mongoose')
// const MongodbUrl = `mongodb://127.0.0.1:27017/Foodio`;

const MongodbUrl = process.env.MONGODB_URL;


mongoose.connect(MongodbUrl, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true
}).then(()=>{
    // console.log(`Connected to Mongo Successfully!\nDatabase Name: ${dataBaseName}`);
    console.log(`Connected to Mongodb Successfully!`);
}).catch((err)=>{
    console.log("Not Connected", err)
})