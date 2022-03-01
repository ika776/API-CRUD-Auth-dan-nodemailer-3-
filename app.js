require("dotenv").config();
require("./config/connection");
const express = require('express')
const app = express()
const port = 3000
const user=require("./model/modelUser")
const { v4: uuid_v4 } = require("uuid");
const {sendEmail}=require('./nodemailer')
const crypto = require("crypto");
const Sequelize=require('sequelize')
const Op = Sequelize.Op;

app.use(express.urlencoded({
	extended: false
}))
app.use(express.json())


app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.post('/register', (req, res) => {
    const {username,password,email}=req.body
    const token = crypto.randomBytes(16).toString("hex");
    user.create({ id: uuid_v4(), username, password, email,emailToken:token},{ returning: true }).then((data)=>{
        sendEmail(email, username, token)}).then((respon) => {
      res.status(200).json({ status: 200, message: "registrasi berhasil, silahkan verifikasi email untuk melanjutkan login", data: respon });
    }).catch((err) => {
      res.status(500).json({ status: 500, message: "gagal", data: err });
    });
  })

app.get('/verify', async(req,res) =>{
    const token =req.query.token
    await user.findOne({ where: { emailToken:token }}).then((data)=>{
        if(data){
            user.update({isVerified:true},
                {
                  where: {emailToken: token }
                })
                res.redirect('/login')
        }else{
            console.log('gagal');
        }
    }).catch((err)=>{
        console.log(err);
    })

})

app.post('/login', async(req,res)=>{
    const { username, password } = req.body;
    await user
    .findAll({
        where: {
            [Op.or]: [{ username }, { password }]
          },
    }).then((data)=>{
        if(data.length>0 && data[0].isVerified){
            res.status(200).json({pesan:'berhasil login '})
        }else{
            res.status(500).json({pesan:"username/ password salah atau belum melakukan verifikasi email"})
        }
    }).catch((err)=>{
        console.log(err);
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})