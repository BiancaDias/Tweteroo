import express from "express";
import { tweets } from "./tweets.js";

const app = express();
app.listen(5000, ()=>console.log("servidor online"));


app.get("/tweets", (req,res) =>{
    res.send(tweets)
})