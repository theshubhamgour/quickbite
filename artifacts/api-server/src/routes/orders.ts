import { Router, type IRouter } from "express";
import { db, ordersTable } from "@workspace/db";
import { eq, desc, sql } from "drizzle-orm";
import { CreateOrderBody, GetOrdersResponse, GetOrderSummaryResponse } from "@workspace/api-zod";

const router: IRouter = Router();

function requireAuth(req: any, res: any): boolean {
  if (!req.session.userId) {
    res.status(401).json({ error: "Not authenticated" });
    return false;
  }
  return true;
}

router.post("/orders", async (req, res): Promise<void> => {
  if (!requireAuth(req, res)) return;

  const parsed = CreateOrderBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { foodId, foodName, price } = parsed.data;

  const [order] = await db
    .insert(ordersTable)
    .values({
      username: req.session.username!,
      foodId,
      foodName,
      price: String(price),
      location: req.session.location ?? "Nagpur",
      status: "delivered",
    })
    .returning();

  res.status(201).json({
    id: order.id,
    username: order.username,
    foodId: order.foodId,
    foodName: order.foodName,
    price: Number(order.price),
    location: order.location,
    status: order.status,
    createdAt: order.createdAt.toISOString(),
  });
});

router.get("/orders/summary", async (req, res): Promise<void> => {
  if (!requireAuth(req, res)) return;

  const username = req.session.username!;

  const orders = await db
    .select()
    .from(ordersTable)
    .where(eq(ordersTable.username, username))
    .orderBy(desc(ordersTable.createdAt));

  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, o) => sum + Number(o.price), 0);

  const foodCounts: Record<string, number> = {};
  for (const o of orders) {
    foodCounts[o.foodName] = (foodCounts[o.foodName] ?? 0) + 1;
  }

  const mostOrderedFood = Object.entries(foodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "None";

  const recentOrders = orders.slice(0, 5).map((o) => ({
    id: o.id,
    username: o.username,
    foodId: o.foodId,
    foodName: o.foodName,
    price: Number(o.price),
    location: o.location,
    status: o.status,
    createdAt: o.createdAt.toISOString(),
  }));

  const response = GetOrderSummaryResponse.parse({
    totalOrders,
    totalSpent,
    mostOrderedFood,
    recentOrders,
  });

  res.json(response);
});

router.get("/orders", async (req, res): Promise<void> => {
  if (!requireAuth(req, res)) return;

  const username = req.session.username!;

  const orders = await db
    .select()
    .from(ordersTable)
    .where(eq(ordersTable.username, username))
    .orderBy(desc(ordersTable.createdAt));

  const response = GetOrdersResponse.parse(
    orders.map((o) => ({
      id: o.id,
      username: o.username,
      foodId: o.foodId,
      foodName: o.foodName,
      price: Number(o.price),
      location: o.location,
      status: o.status,
      createdAt: o.createdAt.toISOString(),
    })),
  );

  res.json(response);
});

export default router;
