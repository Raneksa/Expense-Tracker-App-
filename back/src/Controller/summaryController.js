import express from 'express'; 
import { PrismaClient } from "@prisma/client";
const app = express();
const prisma = new PrismaClient();

app.get("/summary/monthly", async (req, res) => {
  try {
    const { year, month, id } = req.query;
    
    if (!year || !month || !id) {
      return res.status(400).json({ error: "Données incompatibles" });
    }

    const debutMois = new Date(parseInt(year), parseInt(month) - 1, 1);
    const finMois = new Date(parseInt(year), parseInt(month), 0, 23, 59, 59);

    const filters = {
      idUser: id,
      date: {
        gte: debutMois,
        lte: finMois
      }
    };

    const [expense, income] = await Promise.all([
      prisma.expense.aggregate({
        where: filters,
        _sum: { amount: true }
      }),
      prisma.income.aggregate({
        where: filters,
        _sum: { amount: true }
      })
    ]);

    const resultExpenses = expense._sum?.amount || 0;
    const resultIncome = income._sum?.amount || 0;

    res.json({
      period: { year, month },
      total: {
        incomes: resultIncome,
        expenses: resultExpenses,
        balance: resultIncome - resultExpenses
      }
    });
  } catch (error) {
    console.error("Erreur", error);
    res.status(500).json({ error: "Erreur de serveur" });
  }
});
