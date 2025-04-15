const mongoose = require('mongoose')
const dataBaseName = 'Foodio';

mongoose.connect(`mongodb://127.0.0.1:27017/${dataBaseName}`,{
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true
}).then(()=>{
    // console.log(`Connected to Mongo Successfully!\nDatabase Name: ${dataBaseName}`);
    console.log(`Connected to Mongodb Successfully!`);
}).catch((err)=>{
    console.log("Not Connected", err)
})