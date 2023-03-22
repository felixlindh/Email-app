import express from "express"
import authenticate from "../controllers/controller.js";
import { fetchCollection } from "../mongo/emailMongoClient.js";

const router = express.Router();


router.get("/users/", async (req, res) => {
    const users = await fetchCollection("users").find().toArray();

    res.send(users)
})

router.post("/users/login", async (req, res) => {
    let login = req.body;
    console.log(login);
    const users = await fetchCollection("users").findOne(login)

    if(users != null) {
        req.session.username = login.username
        console.log(req.session.username);
        res.sendStatus(200)
    } else {
        res.sendStatus(400)
    }
    console.log(users);
    
})

router.post("/user/createAccount", async (req, res) => {
    let user = req.body;
    console.log(user);

    user.inbox = []
    user.send = []

    const result = await fetchCollection("users").updateOne({username: user.username}, {$setOnInsert: user}, {upsert: true})

    if(result.matchedCount !== 0) {
        res.status(400).send("User allready exists")
    } else {
        res.status(200).send("account was created")
    }
})

router.post("/user/send", authenticate, async (req, res) => {
    let mail = req.body;

    console.log(mail);
    
    
    const sendTo = await fetchCollection("users").updateOne({username: mail.to}, { $push: { inbox: {from: req.session.username, message: mail.message}}})
    if(sendTo.matchedCount !== 0) {
        const sentFrom = await fetchCollection("users").updateOne({username: req.session.username}, { $push: { send: {to: mail.to, message: mail.message}}})
        res.status(200).send({message: "Message was sent"})
    } else {
        res.status(400).send({message: "User was not found"})
    }

    
})

router.post("/logout", authenticate, (req, res) => {
    req.session.destroy();
    // req.session.username = undefined;

    res.status(200).send("User was logged out")
})

router.get("/inbox", authenticate, async (req, res) => {
    console.log(req.session.username);
    const userInfo = await fetchCollection("users").findOne({username: req.session.username});
    console.log(userInfo.inbox);
    res.send(userInfo.inbox)
})

router.get("/sentMails", authenticate, async (req, res) => {
    console.log(req.session.username);
    const userInfo = await fetchCollection("users").findOne({username: req.session.username});
    console.log(userInfo.send);
    res.send(userInfo.send)
})

export default router;
