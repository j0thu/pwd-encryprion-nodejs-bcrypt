const express = require('express');
const app = express();

const bcrypt = require('bcrypt');

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false}));

app.get('/', (req, res)=>{
    res.render('index.ejs');
})

let hashedPass = '';
app.post('/hashPass', async(req, res)=>{
    hashedPass = await bcrypt.hash(req.body.password, 10);
    console.log(req.body.password +'\n'+ hashedPass);
    res.send('Hashed the password successfully');
    
})

app.get('/compare', (req, res)=>{
    res.render('comparePass.ejs');
})

app.post('/comparePass', async(req, res)=>{
    let isEqual = await bcrypt.compare(req.body.password, hashedPass);
    if(isEqual){
        res.send('The passwords match');
    }
    else{
        res.send('The passwords do not match');
    }
})

PORT=4070;
app.listen(PORT, ()=>{
    console.log(`Server Running on PORT ${PORT}`);
})