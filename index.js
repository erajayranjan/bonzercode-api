const express=require('express');
const app=express();
const mongoose=require('mongoose');
const cors= require('cors');
require('dotenv').config();

//Connect DB
mongoose
.connect(process.env.MONGO_URI, {
    // useCreateIndex:true,
    useNewUrlParser:true,
    // useFindAndModify:false,
    useUnifiedTopology:true,
})
.then(()=>console.log("MongoDb Connected"))
.catch((err)=>console.log(err));

app.use(cors());
app.use(express.json());
app.use('/auth', require('./routes/user'));
app.use('/course', require('./routes/course'));

const PORT=process.env.PORT || 5000;

app.listen(PORT, ()=>console.log(`Server is running on port:  ${PORT} !`));
app.get('/', (req, res) => {
    res.send('App is Running now!')
  })
