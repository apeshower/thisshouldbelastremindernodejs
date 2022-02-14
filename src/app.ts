import express, { Express } from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from "body-parser";
import todoRoutes from './routes'
import router from "./routes/index";
import * as dotenv from 'dotenv';

dotenv.config();
const app: Express = express()

const PORT: string | number = process.env.PORT || 4000

app.use(bodyParser.json());
app.use(cors())
app.use(router)

const uri: string = `mongodb+srv://new_user_milin:milintanush@cluster0.nvt4o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(process.env.MONGODB_URI || uri).then(() =>
    app.listen(PORT, () => 
        console.log(`Server runs on htts://localhost:${PORT}`)
    )    
).catch(error => {
    throw error
})
