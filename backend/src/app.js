 const express = require('express');

 const app = express();
app.use("/",(req , res) => { res.send("dashboard working...♥︎")})

app.use("/test",(req , res) => { res.send("working...🐙")})

 app.listen(3000 , () => console.log("server is successfully listening on port 3000")
 );