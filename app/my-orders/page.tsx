"use client";

import { useState, useEffect, useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useAuth } from "@clerk/nextjs";
import { fetchUserOrders } from "@/lib/actions/order.action";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";

interface Product {
  name: string;
  image: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  products: Product[];
  status: "Pending" | "Completed" | "Failed";
  total: number;
}

export default function Component() {
  const { userId } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const getOrders = async () => {
      if (userId) {
        const fetchedOrders = await fetchUserOrders(userId);
        const response = JSON.parse(fetchedOrders);
        setOrders(response);
      }
    };
    getOrders();
  }, [userId]);

  const [sortBy, setSortBy] = useState<keyof Order>("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "Pending" | "Completed" | "Failed"
  >("all");

  const handleSortByChange = (value: string) => {
    setSortBy(value as keyof Order);
  };

  const handleSortOrderChange = (value: string) => {
    setSortOrder(value as "asc" | "desc");
  };

  const handleFilterStatusChange = (value: string) => {
    setFilterStatus(value as "all" | "Completed" | "Pending" | "Failed");
  };

  const filteredOrders = useMemo(() => {
    return orders
      .filter((order) => {
        if (filterStatus === "all") return true;
        return order.status.toLowerCase() === filterStatus.toLowerCase();
      })
      .sort((a, b) => {
        if (sortOrder === "asc") {
          return a[sortBy] > b[sortBy] ? 1 : -1;
        } else {
          return a[sortBy] < b[sortBy] ? 1 : -1;
        }
      });
  }, [orders, sortBy, sortOrder, filterStatus]);

  return (
    <section className="w-full max-w-6xl mx-auto px-4 md:px-6 py-8">
      <div className="flex flex-wrap items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Your Orders</h1>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <ListOrderedIcon className="w-4 h-4" />
                <span>Sort by</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuRadioGroup
                value={sortBy}
                onValueChange={handleSortByChange}
                className="grid gap-1"
              >
                <DropdownMenuRadioItem value="date">Date</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="total">
                  Total
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="status">
                  Status
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={sortOrder}
                onValueChange={handleSortOrderChange}
                className="grid gap-1"
              >
                <DropdownMenuRadioItem value="asc">
                  Ascending
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="desc">
                  Descending
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <FilterIcon className="w-4 h-4" />
                <span>Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuRadioGroup
                value={filterStatus}
                onValueChange={handleFilterStatusChange}
                className="grid gap-1"
              >
                <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Completed">
                  Completed
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Pending">
                  Pending
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Failed">
                  Failed
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="grid gap-6">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="font-medium">Order #{order.id}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {order.date}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {order.products.map((product) => (
                    <div
                      key={product.name}
                      className="grid grid-cols-[64px_1fr_auto] items-center gap-4"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={64}
                        height={64}
                        className="rounded-md"
                      />
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Qty: {product.quantity}
                        </div>
                      </div>
                      <div className="font-medium">
                        ₹{(product.price * product.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div
                  className={`px-2 py-1 rounded-full text-sm font-medium ${
                    order.status === "Completed"
                      ? "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                      : order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400"
                      : "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                  }`}
                >
                  {order.status}
                </div>
                <div className="font-medium">₹{order.total.toFixed(2)}</div>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-24">
            <ShoppingBag className="w-16 h-16 text-gray-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-500 mb-2">
              No orders found
            </h2>
            <p className="text-gray-500">
              Please place an order to see it here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function FilterIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function ListOrderedIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="10" x2="21" y1="6" y2="6" />
      <line x1="10" x2="21" y1="12" y2="12" />
      <line x1="10" x2="21" y1="18" y2="18" />
      <path d="M4 6h1v4" />
      <path d="M4 10h2" />
      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
    </svg>
  );
}
