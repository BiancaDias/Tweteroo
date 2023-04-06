import express from "express";
import { tweets } from "./tweets.js";
import cors from "cors";

const app = express();
app.listen(5000, ()=>console.log("servidor online"));
app.use(express.json()); //para ler arquivos recebidos como json
app.use(cors()); // para permitir comunicação com o front

const users = []
app.post("/sign-up", (req, res) => {
    const {username, avatar} = req.body;
    users.push({username, avatar});
    res.send("OK");
})


app.get("/tweets", (req,res) =>{
    res.send(tweets)
})