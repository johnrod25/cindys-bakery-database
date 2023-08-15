const mysql=require('mysql');
const dotenv=require('dotenv');
let instance =null;
dotenv.config();
const connection=mysql.createConnection({
 host:process.env.HOST,
 user:process.env.USER,
 password:process.env.PASSWORD,
 database:process.env.DATABASE,
 port:process.env.DB_PORT,
});
connection.connect((err)=>{
 if (err){
 console.log(err.message);
 }
 console.log('db '+connection.state);
})

class DbService{
    static getDbServiceInstance(){
    return instance ? instance : new DbService();
    }
    async getAllData(){
    try{
        const response=await new
        Promise((resolve,reject)=> {
            const query="SELECT * FROM products;";
            connection.query(query,(err,results) => {
            if (err) reject (new Error(err.message));
                resolve(results);
            })
        });
        return(response);
    } catch(error){
    console.log(error);
    }
    
    }

    async checkoutProducts(name, price, image){
        try {
            const checkout=await new
            Promise((resolve,reject)=> {
            const query="INSERT INTO check_out (name, price, image) VALUES (?,?,?);";
            connection.query(query,[name, price, image] ,(err,results) => {
            if (err) reject (new Error(err.message));
                resolve(results.checkout);
            })
        });
        return {
            id: checkout,
            name: name,
            price: price,
            image: image
        };
        } catch (error) {
            console.log(error);
        }
    }

    async logIn(username, password){
        try{
            const response=await new
            Promise((resolve,reject)=> {
                const query="SELECT * FROM users WHERE username = ? AND password = ?;";
                connection.query(query,[username, password],(err,results) => {
                if (err) reject (new Error(err.message));
                    resolve(results);
                })
            });
            console.log(response);
            return(response);
        } catch(error){
        console.log(error);
        }
    }

    async signUp(username, password){
        try {
            const signup=await new
            Promise((resolve,reject)=> {
            const query="INSERT INTO users (username, password) VALUES (?,?);";
            connection.query(query,[username, password] ,(err,results) => {
            if (err) reject (new Error(err.message));
                resolve(results.signup);
            })
        });
        console.log(signup);
        return {signup};
        } catch (error) {
            console.log(error);
        }
    }
   }
   
module.exports= DbService;