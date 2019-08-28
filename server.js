const Express=require('express');
const app=new Express();

const port=process.env.PORT || 2565;


app.listen(port,()=> console.log());