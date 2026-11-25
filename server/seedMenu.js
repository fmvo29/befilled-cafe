import "dotenv/config";
import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, default: "" },
  image: { type: String, default: "" },
  available: { type: Boolean, default: true }
}, { timestamps: true });

const MenuItem = mongoose.model("MenuItem", menuSchema);

const menuItems = [
  { name: "Golden Latte", aliases: ["Brown Butter Latte", "Golden Hour Latte"], category: "Coffee", price: 185, description: "A smooth espresso latte with just a hint of brown-butter sweetness.", image: "☕", available: true },
  { name: "Honey Oat Flat White", aliases: ["Honeyed Oat Flat White"], category: "Coffee", price: 175, description: "Double espresso, silky oat milk, and a delicate touch of honey.", image: "🥛", available: true },
  { name: "Berry Matcha", aliases: ["Strawberry Matcha", "Garden Berry Matcha"], category: "Tea & Matcha", price: 195, description: "Earthy ceremonial matcha, fresh strawberry, and softly sweet cream.", image: "🍵", available: true },
  { name: "Sea Salt Cookie", aliases: ["Salted Chocolate Cookie"], category: "Pastries", price: 95, description: "A not-too-sweet brown-butter cookie with dark chocolate and sea salt.", image: "🍪", available: true },
  { name: "Ube Latte", aliases: ["Ube Cloud", "Ube Velvet Latte"], category: "Coffee", price: 190, description: "Espresso under a gentle swirl of creamy ube.", image: "💜", available: false },
  { name: "Almond Croissant", aliases: ["Almond Morning Croissant"], category: "Pastries", price: 145, description: "Flaky, buttery layers with a light almond filling.", image: "🥐", available: true },
  { name: "Americano", aliases: ["First Light Americano"], category: "Coffee", price: 135, description: "A bright double espresso, opened up with hot water.", image: "☕", available: true },
  { name: "Cappuccino", aliases: ["Quiet Corner Cappuccino"], category: "Coffee", price: 165, description: "Rich espresso tucked under a soft, airy cap of milk.", image: "☕", available: true },
  { name: "Dark Mocha", aliases: ["Slow Sunday Mocha"], category: "Coffee", price: 185, description: "Espresso and real dark chocolate, finished with lightly steamed milk.", image: "🍫", available: true },
  { name: "Milk Matcha", aliases: ["Soft Morning Matcha"], category: "Tea & Matcha", price: 180, description: "Ceremonial matcha and your choice of milk, lightly sweetened.", image: "🍵", available: true },
  { name: "Sourdough Toast", aliases: ["Sunrise Sourdough Toast"], category: "Bread & Savory", price: 155, description: "Toasted sourdough with whipped herb butter and slow-roasted tomatoes.", image: "🍞", available: true },
  { name: "Avocado Toast", aliases: ["Little Pause Avocado Toast"], category: "Bread & Savory", price: 225, description: "Smashed avocado, lemon, and chili flakes on crisp sourdough.", image: "🥑", available: true },
  { name: "Herb Croissant", aliases: ["Garden Herb Croissant"], category: "Bread & Savory", price: 185, description: "A warm, flaky croissant filled with spinach and gentle herbed cheese.", image: "🥐", available: true },
  { name: "Mushroom Melt", aliases: ["Mellow Mushroom Melt"], category: "Bread & Savory", price: 245, description: "Golden toasted sourdough with thyme mushrooms and melted cheese.", image: "🍄", available: true },
  { name: "Cheddar Toastie", aliases: ["Tomato Cheddar Toastie"], category: "Bread & Savory", price: 215, description: "Toasted country bread, ripe tomato, and sharp cheddar—simple and satisfying.", image: "🥪", available: true },
  { name: "Olive Focaccia", aliases: ["Olive & Sea Salt Focaccia"], category: "Bread & Savory", price: 125, description: "Soft, olive-oil-rich focaccia with rosemary and a little flaky salt.", image: "🫒", available: true },
  { name: "Banana Oat Loaf", aliases: ["Banana Oat Tea Loaf"], category: "Pastries", price: 110, description: "A tender banana and oat slice, gently sweet and lovely with coffee.", image: "🍌", available: true },
  { name: "Ham Croissant", aliases: ["Ham & Emmental Croissant"], category: "Bread & Savory", price: 210, description: "A crisp, warm croissant with savory ham and nutty Emmental cheese.", image: "🥐", available: true },
  { name: "Fresh Milk", category: "Milk Drinks", price: 85, description: "A chilled glass of fresh milk, simple and comforting.", image: "🥛", available: true },
  { name: "Honey Milk", category: "Milk Drinks", price: 110, description: "Warm milk gently sweetened with a little honey.", image: "🍯", available: true },
  { name: "Cocoa Milk", category: "Milk Drinks", price: 125, description: "Creamy milk with mellow cocoa—not too sweet, just right.", image: "🍫", available: true },
  { name: "Strawberry Milk", category: "Milk Drinks", price: 130, description: "Cold fresh milk blended with real strawberries.", image: "🍓", available: true }
];

if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is required. Configure it in the project .env file before seeding.");
  process.exit(1);
}

try {
  await mongoose.connect(process.env.MONGODB_URI);
  for (const { aliases = [], ...item } of menuItems) {
    const existing = await MenuItem.findOne({ name: { $in: [item.name, ...aliases] } });
    if (existing) {
      await MenuItem.updateOne({ _id: existing._id }, { $set: item });
    } else {
      await MenuItem.updateOne(
        { name: item.name },
        { $setOnInsert: item },
        { upsert: true, runValidators: true }
      );
    }
  }
  console.log(`Menu ready: ${menuItems.length} thoughtfully named cafe favorites.`);
} catch (error) {
  console.error("Could not seed cafe menu:", error.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
