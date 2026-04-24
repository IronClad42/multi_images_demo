var express = require("express");
var bodyparset = require("body-parser");
var exe = require("./db");
var upload = require("express-fileupload");
var session = require("express-session")
var nodemailer = require("nodemailer")
require("dotenv").config();
var app = express();

app.use(bodyparset.urlencoded({extended:true}));

app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:"skdjbsd skdfbasd kjdbcak;sdbs daskdcbasd ckaksdbjbdif ,cnz xc;absdfWB"
}));

app.use(express.static("public/"));

app.use(upload());

app.get("/",async function(req,res){

  var data = await exe(`SELECT * FROM product`);

  for(i=0; i<data.length; i++)
  {
    data[i].product_image = await exe(`SELECT * FROM product_image WHERE product_id = ?`,data[i].product_id);
  }
  
  res.render("home.ejs",{multiImages:data});
});

app.post("/Save_product",async function(req,res){
 
  var b = req.body;

  var sql = `INSERT INTO product(product_name , product_price , product_deatils)VALUES
                                (? , ? , ?)`;

  var data = await exe(sql,[b.product_name , b.product_price , b.product_deatils]);

  var product_id = data.insertId;

  var filesName = [];

  if(req.files)
  {
    if(req.files.product_image)
    {
      for(i=0; i<req.files.product_image.length; i++)
      {
        var product_image = new Date().getTime()+req.files.product_image[i].name;
        filesName[i] = product_image;
        req.files.product_image[i].mv("public/"+product_image);
      }
      if(filesName.length == 0)
      {
        var product_image = new Date().getTime()+req.files.product_image.name;
        filesName[0] = product_image
        req.files.product_image.mv("public/"+product_image); 
      }
    }
  }

  for(var i=0; i<filesName.length; i++)
  {
    sql = `INSERT INTO product_image(product_id , product_image)VALUES
                                    (? , ?)`;

    data2 = await exe(sql,[product_id , filesName[i]]);
    console.log(data2);
  }

  // res.send(data);
  res.redirect("/");
});

app.listen(process.env.PORT || 1000, ()=> console.log("Demo Muiti Images Run Successfuly",1000));

// IronClad42
