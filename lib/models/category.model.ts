import { Schema, Document, model, models } from "mongoose";

interface ICategory extends Document {
  storeId: Schema.Types.ObjectId;
  billboardId: Schema.Types.ObjectId;
  products: Schema.Types.ObjectId[];
  combos: Schema.Types.ObjectId[];
  name: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema({
  storeId: { type: Schema.Types.ObjectId, ref: "Store", required: true }, // Foreign Key to Store
  name: { type: String, required: true },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  combos: [{ type: Schema.Types.ObjectId, ref: "Combo" }],
  image: { type: String, required: false }, // Add this line
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

categorySchema.index({ storeId: 1 });

const Category = models.Category || model("Category", categorySchema);

export default Category;
