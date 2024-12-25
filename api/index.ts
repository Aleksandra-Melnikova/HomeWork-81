import express from "express";
import cors from "cors";
import * as mongoose from "mongoose";
import Link from "./models/Link";
import linksRouter from "./routers/links";


const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use('/links',linksRouter);


const run = async () => {
await mongoose.connect('mongodb://localhost/shortenLinks');
app.get('/:shortUrl', async (req, res, next) => {
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
    app.listen(port, () => {
        console.log(`Server started on port http://localhost:${port}`);
    });
};

run().catch(err => console.log(err));


