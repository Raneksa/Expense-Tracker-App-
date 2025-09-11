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


app.get("/summary", async (req, res) => {
  try {
    const { start, end, id } = req.query;
    
    if (!id) {
      return res.status(400).json({ error: "ID utilisateur requis" });
    }

    const dateFilter = start && end ? {
      date: {
        gte: new Date(start),
        lte: new Date(end)
      }
    } : {};

    const filters = {
      idUser: id,
      ...dateFilter
    };

    const [expenseAgg, incomeAgg, recentExpenses, recentIncomes] = await Promise.all([
      prisma.expense.aggregate({
        where: filters,
        _sum: { amount: true }
      }),
      prisma.income.aggregate({
        where: filters,
        _sum: { amount: true }
      }),
      prisma.expense.findMany({
        where: filters,
        orderBy: { date: 'desc' },
        take: 5,
        include: { categories: true }
      }),
      prisma.income.findMany({
        where: filters,
        orderBy: { date: 'desc' },
        take: 5
      })
    ]);

    const resultIncome = incomeAgg._sum?.amount || 0;
    const resultExpenses = expenseAgg._sum?.amount || 0;

    res.json({
      total: {
        income: resultIncome,
        expense: resultExpenses,
        balance: resultIncome - resultExpenses
      },
      recentTransactions: {
        expenses: recentExpenses,
        incomes: recentIncomes
      }
    });

  } catch (error) {
    console.error("Erreur dans /summary:", error);
    res.status(500).json({ error: "Erreur de serveur" });
  }
});


app.get("/summary/alerts", async (req, res) => {
  try {
    const { id } = req.query;
    
    if (!id) {
      return res.status(400).json({ error: "ID utilisateur requis" });
    }

    const aujourdHui = new Date();
    const debutMois = new Date(aujourdHui.getFullYear(), aujourdHui.getMonth(), 1);
    const trenteJours = new Date();
    trenteJours.setDate(aujourdHui.getDate() - 30);

    const [incomeMois, expenseMois, depensesMoyennes] = await Promise.all([
      prisma.income.aggregate({
        where: { 
          idUser: id, 
          date: { gte: debutMois, lte: aujourdHui }
        },
        _sum: { amount: true }
      }),
      prisma.expense.aggregate({
        where: { 
          idUser: id, 
          date: { gte: debutMois, lte: aujourdHui }
        },
        _sum: { amount: true }
      }),
      prisma.expense.aggregate({
        where: { 
          idUser: id, 
          date: { gte: trenteJours, lte: aujourdHui }
        },
        _avg: { amount: true }
      })
    ]);

    const income = Number(incomeMois._sum?.amount) || 0;
    const expense = Number(expenseMois._sum?.amount) || 0;
    const moyenneDepenses = Number(depensesMoyennes._avg?.amount) || 0;
    const seuilHaut = moyenneDepenses * 2;

    const depensesElevees = await prisma.expense.findMany({
      where: {
        idUser: id,
        date: { gte: trenteJours, lte: aujourdHui },
        amount: { gt: seuilHaut }
      },
      include: { categories: true },
      orderBy: { amount: 'desc' },
      take: 3
    });

    const alerts = [];

    if (depensesElevees.length > 0) {
      alerts.push({
        type: "high",
        message: `${depensesElevees.length} dépense(s) inhabituelle(s) détectée(s)`,
        items: depensesElevees
      });
    }

    if (income > 0 && expense > income * 0.7) {
      const pourcentage = ((expense / income) * 100).toFixed(0);
      alerts.push({
        type: "ratio",
        message: `Vous avez dépensé ${pourcentage}% de vos revenus mensuels`
      });
    }

    if (alerts.length === 0) {
      alerts.push({
        type: "all_good",
        message: "Aucune alerte financière"
      });
    }

    res.json({ alerts });

  } catch (error) {
    console.error("Erreur dans /summary/alerts:", error);
    res.status(500).json({ error: "Erreur de serveur" });
  }
});