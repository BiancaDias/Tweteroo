import express from "express";
import cors from "cors";

const app = express();
app.listen(5000, ()=>console.log("servidor online"));
app.use(express.json()); //para ler arquivos recebidos como json
app.use(cors()); // para permitir comunicação com o front

const users = [];
const tweets = [];
app.post("/sign-up", (req, res) => {
    const {username, avatar} = req.body;
    users.push({username, avatar});
    res.send("OK");
})

app.post("/tweets", (req, res) => {
    const {username, tweet} = req.body;
    const tweeter = users.find((user) => user.username === username);
    if(!tweeter){
        return res.send(`UNAUTHORIZED`)
    }
    tweets.push({username, tweet});
    res.send("OK");

})
app.get("/tweets", (req,res) =>{
    res.send(tweets)
})