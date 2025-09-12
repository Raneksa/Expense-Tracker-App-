import express from 'express';
import cors from 'cors';
import routeSummary from './routeSummary.js';

const app = express();

app.use(cors({
    origin: "http://localhost:5173", // Changé de https à http
    credentials: true
}));

app.use(express.json());
app.use('/summary', routeSummary);

app.listen(3000, () => {
    console.log("Serveur démarré sur le port 3000");
});