import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
      <div className="lg:w-2/3">
        <h1 className="text-3xl font-bold mb-4">Your Protein Store</h1>
        <div className="text-sm breadcrumbs mb-6">
          <ul>
            <li>Information</li>
            <li>Shipping</li>
            <li>Payment</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Express checkout</h2>
          <div className="grid grid-cols-3 gap-4">
            <Button className="bg-purple-600 text-white">Shop Pay</Button>
            <Button className="bg-yellow-400 text-black">Amazon Pay</Button>
            <Button className="bg-yellow-300 text-blue-700">PayPal</Button>
          </div>
        </div>

        <div className="text-center my-6 text-sm text-gray-500">
          OR CONTINUE BELOW TO PAY WITH A CREDIT CARD
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Contact information</h2>
          <div className="flex justify-between items-center mb-4">
            <Input type="email" placeholder="Email" className="w-full" />
            <span className="ml-4 text-sm text-blue-600 cursor-pointer">
              Log in
            </span>
          </div>
          <div className="flex items-center">
            <Checkbox id="newsletter" />
            <label htmlFor="newsletter" className="ml-2 text-sm">
              Email me with news and offers
            </label>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Shipping address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select>
              <option>United States</option>
            </Select>
            <Input placeholder="First name" />
            <Input placeholder="Last name" />
            <Input placeholder="Company (optional)" className="md:col-span-2" />
            <Input placeholder="Address" className="md:col-span-2" />
            <Input
              placeholder="Apartment, suite, etc. (optional)"
              className="md:col-span-2"
            />
            <Input placeholder="City" />
            <Select>
              <option>Connecticut</option>
            </Select>
            <Input placeholder="ZIP code" />
            <Input placeholder="Phone (optional)" className="md:col-span-2" />
          </div>
        </div>

        <Button className="w-full bg-blue-600 text-white py-3 text-lg">
          Continue to shipping
        </Button>

        <div className="mt-8 text-sm text-gray-500">
          <a href="#" className="mr-4">
            Refund Policy
          </a>
          <a href="#" className="mr-4">
            Privacy Policy
          </a>
          <a href="#">Terms of Service</a>
        </div>
      </div>

      <div className="lg:w-1/3 bg-gray-100 p-6 rounded-lg">
        <div className="flex items-center mb-4">
          <img
            src="/placeholder.svg"
            alt="Product"
            className="w-16 h-16 object-cover rounded mr-4"
          />
          <div>
            <h3 className="font-semibold">Whey Protein Isolate - Vanilla</h3>
            <p className="text-sm text-gray-600">2 lbs</p>
          </div>
          <span className="ml-auto">$120.00</span>
        </div>

        <div className="flex mb-4">
          <Input
            placeholder="Gift card or discount code"
            className="flex-grow mr-2"
          />
          <Button variant="outline">Apply</Button>
        </div>

        <div className="border-t pt-4 mb-4">
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>$120.00</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Shipping</span>
            <span>Calculated at next step</span>
          </div>
        </div>

        <div className="flex justify-between items-center border-t pt-4 font-semibold">
          <span>Total</span>
          <span className="text-2xl">USD $120.00</span>
        </div>
      </div>
    </div>
  );
}
