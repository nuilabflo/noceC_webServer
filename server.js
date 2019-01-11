const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();


hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
   return new Date().getFullYear();
  //return 'ho'
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
})

app.set('view engine', 'hbs');



app.use((req, res, next)=>{
   let now = new Date().toString();
   let log = `${now}: ${req.method} ${req.url}\n`;
   console.log(log);
   fs.appendFile('logfile.log', log,(err)=>{
     if(err){
       console.log('unable to append to logfile')
     }
   });
   next();
})

app.use((req,res)=>{
  res.render('maintain.hbs',{
    title: 'maintainance',
    text:'please be patient. we will be back soon.'
  })
})

app.use(express.static(__dirname+'/public'));

app.get('/',(req, res)=>{
  //res.send('<h1>hello express</h1>');
  res.render('home.hbs',{
    title: 'homepage',
    text:'welcome home'
  })
});

app.get('/about',(req,res)=>{
  //res.send('aboutpage')
  res.render('about.hbs',{
    title: 'aboutpage lkajsdfj'
  })
});

app.get('/bad',(req,res)=>{
  res.send({
    errorType: 'bad request',
    errorText: 'page not found'
  })
})

app.listen(3000,()=>{
  console.log('server ist up')
});
