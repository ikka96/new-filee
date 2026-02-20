import { Request, Response } from "express";

/**
 * GET /api/dashboard
 * Protected route
 * Returns aggregated dashboard data
 */
export const getDashboard = async (_req: Request, res: Response) => {
  try {
    // 🔹 TEMP / STATIC DATA (Phase 1)
    // Later you will replace these with DB queries
    const dashboardData = {
      stats: {
        users: 0,
        products: 0,
        suppliers: 0,
        categories: 0,
        invoices: 0,
        payments: 0,
      },
      lowStockProducts: [],
      recentInvoices: [],
      recentPayments: [],
      topCategories: [],
    };

    return res.status(200).json(dashboardData);
  } catch (error) {
    console.error("Dashboard error:", error);

    return res.status(500).json({
      message: "Failed to load dashboard data",
    });
  }
};
