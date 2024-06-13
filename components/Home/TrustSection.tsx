"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { validateBatch } from "@/lib/actions/batch.action";
import { CheckCircle, XCircle } from "lucide-react";
import Modal from "../modals/Modal"; // Adjust the path to where you save the Modal component

const TrustSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [batchId, setBatchId] = useState("");
  const [isValid, setIsValid] = useState<null | boolean>(null);
  const [loading, setLoading] = useState(false);

  const handleValidate = async () => {
    setLoading(true);
    const valid = await validateBatch(batchId);
    setIsValid(valid);
    setLoading(false);
  };

  return (
    <div>
      <div onClick={() => setIsModalOpen(true)} className="cursor-pointer">
        <Image
          src="/trust/trust.webp"
          width={1000}
          height={1000}
          className="w-full h-full hidden md:block object-cover"
          alt="trust image"
        />
        <Image
          src="/trust/mobile-trust.webp"
          width={1000}
          height={1000}
          className="w-full block md:hidden h-full object-cover"
          alt="trust image"
        />
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-lg font-semibold">Validate Batch ID</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Enter the batch ID to validate its authenticity.
        </p>
        <div className="space-y-4 mt-4">
          <Input
            placeholder="Enter Batch ID"
            value={batchId}
            onChange={(e) => setBatchId(e.target.value)}
          />
          <Button onClick={handleValidate} disabled={loading}>
            Validate
          </Button>
          {isValid !== null && (
            <div className="flex items-center space-x-2">
              {isValid ? (
                <CheckCircle className="text-green-500" />
              ) : (
                <XCircle className="text-red-500" />
              )}
              <span>{isValid ? "Validated" : "Not Validated"}</span>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default TrustSection;
