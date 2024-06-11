import express from "express";
import cors from "cors";
import roomRouter from "./Routers/roomRouter.js"

const app = express();
const PORT = 4000;
app.use(express.json());
app.use(cors());

app.use('/api',roomRouter);



app.get('/',(req,res)=>{
    res.status(200).send("Welcome to Hall Booking App")
})

app.listen(PORT,()=>{
console.log("App is listening on port : ",PORT)
})
