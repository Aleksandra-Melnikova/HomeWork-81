import express from "express";
import {LinkWithoutId} from "../types";

const linksRouter = express.Router();
import Link from "../models/Link";

linksRouter.get('/:shortUrl', async (req, res, next) => {


    if (!req.params.shortUrl) {
        res.status(404).send('Not Found');
    }

    try {
        const link = await Link.find({shortUrl:req.params.shortUrl});

        if (!link) {
            res.status(404).send("Not found");
        }

        res.status(301).redirect(link[0].originalUrl);

    } catch (e) {
        next(e);
    }
});
// linksRouter.get('/', async (req, res, next) => {
//     try {
//         const products = await Link.find();
//         res.send( products);
//     } catch (e) {
//         next(e);
//     }
// });


linksRouter.post('/', async (req, res, next) => {
    if (!req.body.originalUrl) {
        res.status(400).send({error: "Please send original url"});
        return;
    }


    const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIGKLMNOPQ";
    let shortUrl = '';

    for( let i = 0; i <7; i++ ) {
        const randomCharacter = alphabet[Math.floor(Math.random() * alphabet.length)];
        shortUrl = shortUrl + randomCharacter;
    }

    const newLink: LinkWithoutId = {
        originalUrl: req.body.originalUrl,
        shortUrl: shortUrl,
    };

    try {
        const link = new Link(newLink);
        await link.save();
        res.send(link);
    }

     catch (e) {
        next(e);
    }
});

export default linksRouter;
