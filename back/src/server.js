import express from 'express';
import cors from 'cors';
import routeSummary from './routeSummary.js';

const app = express();

app.use(cors({
    origin: "http://localhost:8080",
    credentials: true
}));

app.use(express.json());
app.use('/summary', routeSummary);

app.listen(3000, () => {
    console.log("Serveur démarré sur le port 3000");
});