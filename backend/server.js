require('dotenv').config();

const express = require("express");
const app = express();
const cors = require("cors");


//middlewares
app.use(cors({
    "origin": process.env.FRONT_END_URL
}));

app.get('/', (req , res)=>{
    return res.status(200).json({"message":"done"});
});

app.get('/:user/:repo' , async (req, res) => {
    const {user, repo} = req.params ;
    const response = await fetch(`${process.env.API_URL}/repos/${user}/${repo}`, {
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2026-03-10",
        "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`
    });

    if(!response.ok){
        return res.status(500).json({'error': "Server ERROR !"});
    }

    const data = await response.json();
    const rightJson = {
        "username": data.owner.login,
        "repo" : {
            "name": data.name,
            "desc": data.description,
            "size": data.size,
            "stars": data.stargazers_count,
            "views": data.watchers_count
        }        
    }
    return res.json(rightJson);
});

app.listen(3000 , ()=>{
    console.log("server is listening in port 4000 !");
});