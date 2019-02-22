const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
var app=express();
const port=process.env.PORT || 3000 ;
hbs.registerPartials(__dirname+'/views/Partial');

app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));
app.use((req,res,next)=>{
    var now = new Date().toString();
    var log =`${now}:${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log',log +'\n',(err)=>{
        if(err){
            console.log('Unable to append to server.log .')
             }
        });
        next();
});
// app.use((req,res,next)=>{
//     res.render('Maintenance.hbs')
// })
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase() ;
});
app.get('/',(req,res)=>{
    // res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs',{
        //currentYear:new Date().getFullYear(), //replaced by register function
        pageTitle:'Home Page',
        greeting:'Welcome to our website'
    })
});
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        // currentYear:new Date().getFullYear(),  //replaced by register function
        pageTitle:'About Page'
    })
});

app.get('/bad',(req,res)=>{
    res.send({
        bad:'unable to send data'
    })
});


app.listen(port,()=>{
    console.log(`Server is up on port ${port}`)
});