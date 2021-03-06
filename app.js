const express = require("express");
const app= express();
const PORT=process.env.PORT|| 4000
const indexRouter=require('./routes/index');
const expressLayouts= require('express-ejs-layouts');
const mongoose=require('mongoose');
const db=require('./env/config').MongoURI;
const userz= require('./routes/userss');
const session=require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

//passport config
require('./config/passport')(passport);



app.use(expressLayouts);
app.set('view engine','ejs');

mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology: true})
.then(()=>console.log('Database connected'))
.catch(err=>console.log(err))

app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}));
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//to color the msg use global variables

app.use((req,res,next)=>{
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.error=req.flash('error');
    next();
})



app.use(express.urlencoded({extended:false}));
app.use(indexRouter);
app.use('/users',userz);



app.listen(PORT,console.log(`sever started on ${PORT}`));

