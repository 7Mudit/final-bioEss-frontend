"use server";
import Order from "@/lib/models/order.model";
import { Types } from "mongoose";

interface Product {
  productId: string;
  quantity: number;
  flavor: string;
  size: string;
}

export async function createOrder(
  clerkId: string,
  products: Product[],
  totalAmount: number,
  merchantTransactionId: string
): Promise<string> {
  try {
    const order = new Order({
      clerkId,
      products: products.map((product) => ({
        productId: new Types.ObjectId(product.productId),
        quantity: product.quantity,
        flavor: product.flavor,
        size: product.size,
      })),
      merchantTransactionId,
      totalAmount,
      status: "Pending",
    });

    await order.save();
    console.log(order);
    return JSON.stringify(order);
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error("Failed to create order");
  }
}

export async function updateOrderStatus(
  merchantTransactionId: string,
  status: "Pending" | "Completed" | "Failed"
) {
  try {
    await Order.updateOne(
      { merchantTransactionId: merchantTransactionId },
      { status }
    );
  } catch (error) {
    console.error("Error updating order status:", error);
    throw new Error("Failed to update order status");
  }
}

export async function fetchUserOrders(clerkId: string) {
  try {
    const orders = await Order.find({ clerkId })
      .sort({ createdAt: -1 })
      .populate({
        path: "products.productId",
        populate: {
          path: "images",
        },
      })
      .exec();

    return JSON.stringify(
      orders.map((order) => ({
        id: order._id.toString(),
        date: order.createdAt.toISOString().split("T")[0],
        products: order.products.map((product: any) => ({
          name: product.productId.name,
          image: product.productId.images[0]?.url || "/placeholder.svg",
          quantity: product.quantity,
          price: product.productId.price,
        })),
        status: order.status,
        total: order.totalAmount,
      }))
    );
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw new Error("Failed to fetch user orders");
  }
}
