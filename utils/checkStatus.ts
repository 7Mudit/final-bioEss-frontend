// pages/api/phonepe/checkStatus.ts
"use server";

import axios from "axios";
import crypto from "crypto";

export default async function checkStatus(merchantTransactionId: string) {
  if (typeof merchantTransactionId !== "string") {
    return "invalid id";
  }

  const merchantId = process.env.PHONEPE_MERCHANT_ID;
  const saltKey = process.env.PHONEPE_SALT_KEY;
  const saltIndex = process.env.PHONEPE_SALT_INDEX;

  if (!merchantId || !saltKey || !saltIndex) {
    return JSON.stringify({ message: "Server configuration error" });
  }

  const apiEndpoint = `/pg/v1/status/${merchantId}/${merchantTransactionId}`;
  const phonePeStatusUrl = `https://api-preprod.phonepe.com/apis/pg-sandbox${apiEndpoint}`;

  const xVerify = generateXVerifyHeader(apiEndpoint, saltKey, saltIndex);

  try {
    const response = await axios.get(phonePeStatusUrl, {
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": xVerify,
        "X-MERCHANT-ID": merchantId,
      },
    });

    return JSON.stringify(response.data);
  } catch (error) {
    console.error("Error checking payment status:", error);
    return JSON.stringify({ message: "Internal server error" });
  }
}

function generateXVerifyHeader(
  endpoint: string,
  saltKey: string,
  saltIndex: string
): string {
  const checksum = crypto
    .createHash("sha256")
    .update(`${endpoint}${saltKey}`)
    .digest("hex");

  return `${checksum}###${saltIndex}`;
}
