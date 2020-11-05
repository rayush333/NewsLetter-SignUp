const express=require("express"),app=express(),bodyParser=require("body-parser"),https=require("https");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});
app.post("/failure",function(req,res){
  res.redirect("/");
});
app.post("/",function(req,res){
  var f=req.body.f,e=req.body.e,l=req.body.l;
  const data={
    members: [
      {
        email_address: e,
        status: "subscribed",
        merge_fields: {
          FNAME: f,
          LNAME: l
      }
    }
    ]
  };

  const jsonData=JSON.stringify(data);
  const url="https://us2.api.mailchimp.com/3.0/lists/45706342c4";
  const options = {
    method: "POST",
    auth: "ayush:ba19a268b1c95ae15db7f4014e1d1189-us2"
  }
  const request=https.request(url,options,function(response){
    if(response.statusCode === 200)
    {
      res.sendFile(__dirname+"/success.html");
    }
    else res.sendFile(__dirname+"/failure.html");
    response.on("data",function(data){
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});
app.listen(process.env.PORT || 3000,function(){
  console.log("Server running on 3000");
});
// Mailchimp Api
// ba19a268b1c95ae15db7f4014e1d1189-us2
// Mailchimp listid
// 45706342c4
