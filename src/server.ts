import * as express from 'express';
import mongoose from 'mongoose';
import * as cors from 'cors';
import todoRoutes from "./routes/todo-routes";

const app = express();
const port = 3000;
const allowedOrigins = ['http://localhost:5173'];
const options: cors.CorsOptions = {
    origin: allowedOrigins
}

app.use(cors(options));
app.use(express.json());

// @ts-ignore
mongoose.connect("mongodb://127.0.0.1:27017/homemangerDB")
    .then(() =>
        console.log("Connected to database")
    )
    .catch(err => {
        console.log(err)
    })
mongoose.connection.on("error", err => {
    console.error("Database error:", err);
});

mongoose.connection.on("disconnected", () => {
    console.log("Database disconnected");
});

app.use('/api', todoRoutes)

app.listen(port, (): void => {
    console.log(`App working on port ${port}`)
})
