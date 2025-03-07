import {
  initialize3DPayment,
  initializeCF,
  initializePayment,
} from "@/app/(main)/(misc)/odeme/actions";
import React, { useEffect, useState } from "react";
import HtmlRenderer from "./HtmlRenderer";
import IyzipayPayment from "./IyzipayPayment";

export const IyzicoPayment: React.FC<any> = ({ onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);

  const [init3dResult, setInit3dResult] = useState<any>(null);
  const [initCfResult, setInitCfResult] = useState<any>(null);

  useEffect(() => {
    const init = async () => {
      /* const res = await initialize3DPayment();
      const cfRes = await initializeCF(); */
      /* const decodedHtml = Buffer.from(
        res.threeDSHtmlContent,
        "base64"
      ).toString("utf-8");

      console.log(decodedHtml); */
      /* setInit3dResult(res.threeDSHtmlContent);
      setInitCfResult(cfRes.checkoutFormContent); */
    };

    init();
  }, []);
  const handlePayment = async () => {
    setLoading(true);
    try {
      /* const result = await initializePayment();
      console.log(result);
      const res = await initialize3DPayment();
      console.log(res); */
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
    <>
      {/*  {!!init3dResult && (
        <>
          <h2>Iyzico Payment</h2>
          <button onClick={handlePayment} disabled={loading}>
            {loading ? "Processing..." : "Pay Now"}
          </button>
          {paymentUrl && <p>Redirecting to payment...</p>}
        </>
      )}

      {init3dResult && <HtmlRenderer base64Html={init3dResult} />}

      {initCfResult} */}
    </>
  );
};
