"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useEffect, useState } from "react";
import { initiatePhonePePayment } from "@/utils/phonepay";
import { useCart } from "@/context/cartContext";
import router from "next/router";
import { useAuth } from "@clerk/nextjs";
import { createOrder } from "@/lib/actions/order.action";
import { validateCoupon } from "@/lib/actions/coupon.action";
import { toast } from "sonner";
import AddressModal from "@/components/product/AddressModal";
import { Dialog } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { JSONContent } from "novel";

interface Image {
  _id: string;
  url: string;
}

interface Category {
  _id: string;
  name: string;
}

interface Flavour {
  _id: string;
  name: string;
}

interface Size {
  _id: string;
  name: string;
}

interface IProduct {
  _id: string;
  storeId: string;
  categoryId: Category;
  name: string;
  price: number;
  fakePrice: number;
  features: string[];
  content?: JSONContent;
  contentHTML?: string;
  isFeatured: boolean;
  isArchived: boolean;
  sizeId: Size[];
  flavourId: Flavour[];
  images: Image[];
  orderItems: string[];
  feedbacks: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface CartItem {
  product: IProduct;
  quantity: number;
  flavor: string;
  size: string;
}

export default function CartComponent() {
  const { cart, updateCart, removeFromCart, clearCart } = useCart();
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [isValidCoupon, setIsValidCoupon] = useState<null | boolean>(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [couponId, setCouponId] = useState<string | undefined>(undefined);
  const { userId } = useAuth();

  useEffect(() => {
    const calculateTotals = () => {
      const cartTotal = cart.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      );
      const discountAmount = (cartTotal * discount) / 100;
      setTotal(cartTotal);
      setFinalTotal(cartTotal - discountAmount);
    };

    calculateTotals();
  }, [cart, discount]);

  const handleQuantityChange = async (
    product: IProduct,
    quantity: number,
    flavor: string,
    size: string
  ) => {
    if (quantity <= 0) return;
    await updateCart(product, quantity, flavor, size);
  };

  const handleRemoveFromCart = async (productId: string) => {
    await removeFromCart(productId);
  };

  const handleClearCart = async () => {
    await clearCart();
  };

  const handleApplyCoupon = async () => {
    try {
      const response = await validateCoupon(couponCode);
      const data = JSON.parse(response);
      if (data.valid) {
        setDiscount(data.discountPercentage);
        setIsValidCoupon(true);
        setCouponId(data.couponId);
        toast.success("Coupon applied");
      } else {
        setDiscount(0);
        setIsValidCoupon(false);
        setCouponId(undefined);
        toast.error("Invalid coupon applied");
      }
    } catch (error) {
      console.error("Error validating coupon:", error);
      setIsValidCoupon(false);
      setCouponId(undefined);
    }
  };

  const handleCheckout = async () => {
    if (!userId) {
      router.push("/sign-in");
      return;
    }
    setIsAddressModalOpen(true);
  };

  const handleAddressSubmit = async () => {
    if (cart.length > 0) {
      try {
        const amount = finalTotal;
        const products = cart.map((item) => ({
          productId: item.product._id,
          quantity: item.quantity,
          flavor: item.flavor,
          size: item.size,
        }));

        const paymentResponse = await initiatePhonePePayment(
          amount,
          userId,
          products
        );
        const response = JSON.parse(paymentResponse!);

        if (response.merchantTransactionId) {
          const order = await createOrder(
            userId as string,
            products,
            amount,
            response.merchantTransactionId,
            couponId // Pass couponId if valid
          );

          if (response.paymentUrl) {
            window.location.href = response.paymentUrl;
          }
        } else {
          toast.error("Failed to get transaction ID");
        }
      } catch (error) {
        console.error("Payment initiation failed:", error);
        toast.error("Failed to initiate payment");
      }
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 py-24">
          <h2 className="text-2xl font-bold">
            No items found. Add items to your cart.
          </h2>
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            href="/"
          >
            Go to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full py-12">
      <div className="container grid gap-6 md:gap-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          <div className="grid gap-1">
            <h1 className="text-2xl font-bold tracking-tight">Cart</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Review your items and proceed to checkout.
            </p>
          </div>
        </div>
        <div className="grid gap-8">
          <div className="grid gap-6">
            {cart.map(({ product, quantity, flavor, size }, index) => (
              <div
                key={index}
                className="grid grid-cols-[100px_1fr_auto] items-center gap-4"
              >
                <Image
                  alt={product.images[0].url}
                  className="aspect-square rounded-md object-cover"
                  height={100}
                  src={product.images[0].url}
                  width={100}
                />
                <div className="grid gap-1">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    ₹{product.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">Flavor: {flavor}</p>
                  <p className="text-sm text-gray-500">Size: {size}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() =>
                      handleQuantityChange(product, quantity - 1, flavor, size)
                    }
                  >
                    <MinusIcon className="h-4 w-4" />
                  </Button>
                  <span>{quantity}</span>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() =>
                      handleQuantityChange(product, quantity + 1, flavor, size)
                    }
                  >
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleRemoveFromCart(product._id)}
                  >
                    <Trash2Icon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <div className="flex items-center gap-4">
                <Input
                  type="text"
                  placeholder="Apply a coupon to get a discount."
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <Button onClick={handleApplyCoupon}>Apply</Button>
              </div>
              {isValidCoupon !== null && (
                <div className="text-sm">
                  {isValidCoupon ? (
                    <span className="text-green-500">
                      Coupon applied! Discount: ₹
                      {((total * discount) / 100).toFixed(2)}
                    </span>
                  ) : (
                    <span className="text-red-500">
                      Invalid or expired coupon
                    </span>
                  )}
                </div>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Subtotal
                </span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              {isValidCoupon !== null && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Discount
                  </span>
                  <span> - ₹{((total * discount) / 100).toFixed(2)}</span>
                </div>
              )}
              <div className="flex items-center justify-between font-semibold">
                <span>Total</span>
                <span>₹{finalTotal.toFixed(2)}</span>
              </div>
            </div>
            <Separator className="my-2" />
            <div className="flex flex-row items-center gap-3 justify-end">
              <Button size="lg" variant="outline" onClick={handleClearCart}>
                Clear Cart
              </Button>
              <Button size="lg" onClick={handleCheckout}>
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isAddressModalOpen} onOpenChange={setIsAddressModalOpen}>
        <AddressModal
          isOpen={isAddressModalOpen}
          onClose={() => setIsAddressModalOpen(false)}
          onSubmit={handleAddressSubmit}
        />
      </Dialog>
    </section>
  );
}

function MinusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="M5 12h14" />
    </svg>
  );
}

function PlusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function Trash2Icon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  );
}
