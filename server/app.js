const express=require('express');
const app=express();
const cors=require('cors');
const dotenv=require('dotenv');
dotenv.config();

const dbService=require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// read
app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getAllData();
    result.then(data => response.json({data : data}))
    .catch(err => console.log(err));
});
// checkout
app.post('/checkout', (request, response) => {
    const { name, price, image } = request.body;
    const db = dbService.getDbServiceInstance();
    const result = db.checkoutProducts(name, price, image);
    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});
//login
app.get('/login/:user&:pass', (request, response) => {
    const { user, pass } = request.params;
    const db = dbService.getDbServiceInstance();
    const result = db.logIn(user, pass);
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});
//signup
app.post('/signup', (request, response) => {
    const { username, password } = request.body;
    const db = dbService.getDbServiceInstance();
    const result = db.signUp(username, password);
    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});
app.listen(process.env.PORT, () => console.log('app is running'));