import { initializeCF } from "@/app/(main)/(misc)/odeme/actions";
import { useEffect, useState } from "react";

const IyzipayPayment = () => {
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);

  useEffect(() => {
    /* const createPayment = async () => {
      const data = await initializeCF();
      console.log(data);
      if (data.token && data.paymentPageUrl) {
        localStorage.setItem("iyziToken", data.token); // Store token for later validation
        setPaymentUrl(data.paymentPageUrl);
      }
    };

    createPayment(); */
  }, []);

  const handleRedirect = () => {
    console.log(localStorage.getItem("iyziToken"));
    if (paymentUrl) {
      window.location.href = paymentUrl;
    }
  };

  return (
    <div>
      <button onClick={handleRedirect} disabled={!paymentUrl}>
        Proceed to Payment
      </button>
    </div>
  );
};

export default IyzipayPayment;
/* 
import { useEffect } from "react";
import useIyzipayScript from "./useIyzipayScript";

const IyzipayPayment = () => {
  useIyzipayScript();

  useEffect(() => {
    if (typeof window === "undefined") return;

    (window as any).iyziInit = {
      currency: "TRY",
      token: "aef389a1-7e0a-49cb-8114-f4c816cd2a16",
      price: 5.2,
      pwiPrice: 5.2,
      locale: "tr",
      baseUrl: "https://sandbox-api.iyzipay.com",
      merchantGatewayBaseUrl: "https://sandbox-merchantgw.iyzipay.com",
      consumerGatewayBaseUrl: "https://sandbox-consumerapigw.iyzipay.com",
      registerCardEnabled: false,
      bkmEnabled: false,
      bankTransferEnabled: false,
      enabledApmTypes: ["SOFORT", "IDEAL", "QIWI", "GIROPAY"],
      payWithIyzicoEnabled: true,
      buyerName: "Higher",
      buyerSurname: "Faster",
      merchantName: "Sandbox Merchant Name - 3403015",
      gsmNumber: "+905555434332",
      email: "stronger@implementation.com",
      payWithIyzicoUsed: false,
      createTag: function () {
        const iyziJSTag = document.createElement("script");
        iyziJSTag.src =
          "https://sandbox-static.iyzipay.com/checkoutform/v2/bundle.js?v=1741215875529";
        document.head.appendChild(iyziJSTag);
      },
    };

    (window as any).iyziInit.createTag();
  }, []);

  return <div id='iyzipay-checkout-form'></div>;
};

export default IyzipayPayment; */
