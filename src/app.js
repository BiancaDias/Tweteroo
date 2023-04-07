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
    if(typeof username !== "string" || username === "" || !username ||typeof avatar !== "string" || avatar === "" || !avatar  ){
        return res.sendStatus(400);
    }
    users.push({username, avatar});
    res.status(201).send("OK");
})

app.post("/tweets", (req, res) => {
    const {username, tweet} = req.body;
    const tweeter = users.find((user) => user.username === username);
    if(!tweeter){
        return res.status(401).send(`UNAUTHORIZED`)
    }
    if(tweet === "" || !tweet || typeof tweet !== "string" || typeof username !== "string" || username === "" || !username){
        return res.sendStatus(400);
    }
    tweets.push({username, tweet});
    res.status(201).send("OK");

})
app.get("/tweets", (req,res) =>{
    const tweetInScreen = []
    const last10tweetrs = tweets.slice(-10);
    last10tweetrs.forEach((tweeter) =>{
        const userLast = users.find((user) => user.username ===tweeter.username);
        const username = userLast.username;
        const avatar = userLast.avatar;
        const tweet = tweeter.tweet;
        tweetInScreen.push({username, avatar, tweet});
    })
    
    res.send(tweetInScreen)
})