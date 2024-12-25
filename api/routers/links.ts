import express from "express";
import {LinkWithoutId} from "../types";

const linksRouter = express.Router();
import Link from "../models/Link";

linksRouter.post('/', async (req, res, next) => {
    if (!req.body.originalUrl) {
        res.status(400).send({error: "Please send original url"});
        return;
    }
    try {
        const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ";
        const allLinks = await Link.find();
        let shortUrl = '';
        while (true) {
            for (let i = 0; i < 7; i++) {
                const randomCharacter = alphabet[Math.floor(Math.random() * alphabet.length)];
                shortUrl = shortUrl + randomCharacter;
            }
            if (!allLinks.some(l => l.shortUrl === shortUrl)) {
                break
            } else {
                shortUrl = '';
            }
        }
        const newLink: LinkWithoutId = {
            originalUrl: req.body.originalUrl,
            shortUrl: shortUrl,
        };
        const link = new Link(newLink);
        await link.save();
        res.send(link);
    }
     catch (e) {
        next(e);
    }
});

export default linksRouter;
