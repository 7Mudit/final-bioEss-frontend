"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { z } from "zod";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchAddress, updateAddress } from "@/lib/actions/address.action";
import { useAuth } from "@clerk/nextjs";

const stateOptions = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Lakshadweep",
  "Puducherry",
  "Ladakh",
] as const;

const addressSchema = z.object({
  addressLine1: z.string().min(1, "Address Line 1 is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.enum(stateOptions),
  postalCode: z.string().min(1, "Postal Code is required"),
  country: z.string().min(1, "Country is required"),
  phoneNumber: z.string().optional(),
});

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const AddressModal = ({ isOpen, onClose, onSubmit }: AddressModalProps) => {
  const { isLoaded, userId } = useAuth();
  const [initialAddress, setInitialAddress] = useState<z.infer<
    typeof addressSchema
  > | null>(null);

  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "Andhra Pradesh",
      postalCode: "",
      country: "",
      phoneNumber: "",
    },
  });

  useEffect(() => {
    const fetchInitialAddress = async () => {
      if (isLoaded && userId) {
        try {
          const response = await fetchAddress();
          const address = response ? JSON.parse(response) : null;
          setInitialAddress(address);
          if (address) {
            form.reset(address);
          }
        } catch (err) {
          console.error("Failed to fetch address:", err);
          setInitialAddress(null);
        }
      }
    };

    if (isOpen) {
      fetchInitialAddress();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, userId, isOpen]);

  async function handleSubmit(values: z.infer<typeof addressSchema>) {
    await updateAddress(values);
    onSubmit();
    onClose();
  }

  if (!isLoaded || !userId) {
    return null;
  }

  return (
    <DialogContent className="sm:max-w-[425px] overflow-y-scroll max-h-screen">
      <DialogHeader>
        <DialogTitle>Add your Address</DialogTitle>
        <DialogDescription>Give us your exact address.</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-2">
        <div className="mx-auto grid-cols-6 w-full max-w-sm ">
          <div className="p-4 pb-0">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="addressLine1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Line 1</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your address line 1"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="addressLine2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Line 2</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your address line 2 (optional)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your city" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="min-w-[150px] pl-3 ">
                            <SelectValue placeholder="Select a state" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {stateOptions.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your postal code"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your country" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your phone number (optional)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Submit</Button>
                  <Button type="button" onClick={onClose}>
                    Cancel
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default AddressModal;
