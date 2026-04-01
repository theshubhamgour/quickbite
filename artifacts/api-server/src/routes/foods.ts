import { Router, type IRouter } from "express";
import { GetFoodsResponse } from "@workspace/api-zod";

const router: IRouter = Router();

const FOOD_ITEMS = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Classic Italian pizza with fresh mozzarella, tomato sauce, and basil leaves on a crispy thin crust",
    price: 299,
    imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80",
    category: "Pizza",
    rating: 4.5,
    deliveryTime: 30,
  },
  {
    id: 2,
    name: "Chicken Burger",
    description: "Juicy grilled chicken patty with lettuce, tomato, pickles, and house special sauce in a brioche bun",
    price: 199,
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80",
    category: "Burgers",
    rating: 4.3,
    deliveryTime: 25,
  },
  {
    id: 3,
    name: "Chicken Biryani",
    description: "Aromatic basmati rice cooked with tender chicken, saffron, and whole spices — served with raita",
    price: 249,
    imageUrl: "https://images.unsplash.com/photo-1563379091339-03246963d651?w=600&q=80",
    category: "Biryani",
    rating: 4.7,
    deliveryTime: 40,
  },
  {
    id: 4,
    name: "Paneer Tikka",
    description: "Marinated cottage cheese cubes grilled in a tandoor oven with bell peppers and onions",
    price: 229,
    imageUrl: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&q=80",
    category: "Indian",
    rating: 4.4,
    deliveryTime: 35,
  },
  {
    id: 5,
    name: "Pasta Alfredo",
    description: "Creamy fettuccine in a rich parmesan and butter sauce, topped with freshly cracked black pepper",
    price: 219,
    imageUrl: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=600&q=80",
    category: "Pasta",
    rating: 4.2,
    deliveryTime: 28,
  },
  {
    id: 6,
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with a gooey molten center, served with a scoop of vanilla ice cream",
    price: 149,
    imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80",
    category: "Desserts",
    rating: 4.8,
    deliveryTime: 20,
  },
  {
    id: 7,
    name: "Masala Dosa",
    description: "Crispy South Indian crepe filled with spiced potato masala, served with coconut chutney and sambar",
    price: 129,
    imageUrl: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&q=80",
    category: "South Indian",
    rating: 4.6,
    deliveryTime: 22,
  },
  {
    id: 8,
    name: "Veg Spring Rolls",
    description: "Crispy golden rolls filled with fresh vegetables and glass noodles, served with sweet chili dip",
    price: 159,
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
    category: "Chinese",
    rating: 4.1,
    deliveryTime: 18,
  },
];

router.get("/foods", async (_req, res): Promise<void> => {
  const response = GetFoodsResponse.parse(FOOD_ITEMS);
  res.json(response);
});

export default router;
