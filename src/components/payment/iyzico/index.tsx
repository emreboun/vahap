import React, { useState } from "react";
import axios from "axios";

export const IyzicoPayment: React.FC<any> = ({ onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);

  const handlePayment = async () => {
    setLoading(true);
    try {
      onSubmit();
      /* const response = await axios.post("/api/payment/initialize", {
        price: "5.2",
        currency: "TRY",
      });

      if (response.data.paymentPageUrl) {
        setPaymentUrl(response.data.paymentPageUrl);
        window.location.href = response.data.paymentPageUrl; // Redirect to Iyzico
      } */
    } catch (error) {
      console.error("Payment initialization failed", error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Iyzico Payment</h2>
      <button onClick={handlePayment} disabled={loading}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
      {paymentUrl && <p>Redirecting to payment...</p>}
    </div>
  );
};
