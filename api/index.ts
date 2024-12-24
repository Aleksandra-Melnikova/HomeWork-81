import express from "express";
import productsRouter from "./routers/links";
import cors from "cors";
import * as mongoose from "mongoose";


const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());


app.use('/links', productsRouter);

const run = async () => {
await mongoose.connect('mongodb://localhost/shortenLinks');

    app.listen(port, () => {
        console.log(`Server started on port http://localhost:${port}`);
    });
};

run().catch(err => console.log(err));


