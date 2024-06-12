// utils/phonepe.js
"use server";
import axios from "axios";
import crypto from "crypto";

export const initiatePhonePePayment = async (amount, userId, products) => {
  // PhonePe payment initiation details
  // const phonePeInitiateUrl =
  //   "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";
  const phonePeInitiateUrl = "https://api.phonepe.com/apis/hermes/pg/v1/pay";

  const merchantId = process.env.PHONEPE_MERCHANT_ID;

  const callbackUrl = `${
    process.env.NEXT_PUBLIC_BASE_URL
  }/payment-status?merchantTransactionId=${`MT${Date.now()}`}`;
  const redirectUrl = `${
    process.env.NEXT_PUBLIC_BASE_URL
  }/payment-status?merchantTransactionId=${`MT${Date.now()}`}`;

  const merchantTransactionId = `MT${Date.now()}`;

  const payload = {
    merchantId,
    merchantTransactionId,
    merchantUserId: userId,
    amount: amount * 100,
    redirectUrl,
    redirectMode: "REDIRECT",
    callbackUrl,
    // mobileNumber,
    paymentInstrument: {
      type: "PAY_PAGE",
    },
  };

  const base64Payload = Buffer.from(JSON.stringify(payload)).toString("base64");
  const xVerify = generateXVerifyHeader(base64Payload);

  try {
    const response = await axios.post(
      phonePeInitiateUrl,
      { request: base64Payload },
      {
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": xVerify,
        },
      }
    );

    if (response.data.success) {
      return JSON.stringify({
        paymentUrl: response.data.data.instrumentResponse.redirectInfo.url,
        merchantTransactionId: merchantTransactionId,
      });
    } else {
      return JSON.stringify({
        message: "Failed to initiate payment",
        error: response.data,
      });
    }
  } catch (error) {
    console.error("Error initiating PhonePe payment:", error);
    // return res.status(500).json({ message: "Internal server error" });
  }
};

function generateXVerifyHeader(base64Payload) {
  const saltKey = process.env.PHONEPE_SALT_KEY;
  const saltIndex = process.env.PHONEPE_SALT_INDEX;
  const apiEndpoint = "/pg/v1/pay";

  const checksum = crypto
    .createHash("sha256")
    .update(base64Payload + apiEndpoint + saltKey)
    .digest("hex");

  return `${checksum}###${saltIndex}`;
}
