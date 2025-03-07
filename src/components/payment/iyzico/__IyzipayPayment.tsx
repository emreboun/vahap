import { useEffect, useState } from "react";
import useIyzipayScript from "./useIyzipayScript";

const IyzipayPayment = ({
  initPayload,
  initResponse,
}: {
  initPayload: any;
  initResponse: any;
}) => {
  useIyzipayScript();
  const [checkoutFormContent, setCheckoutFormContent] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    (window as any).iyziInit = {
      currency: "TRY",
      ...initPayload,
      token: initResponse.token,
      baseUrl: "https://sandbox-api.iyzipay.com",
      merchantGatewayBaseUrl: "https://sandbox-merchantgw.iyzipay.com",
      consumerGatewayBaseUrl: "https://sandbox-consumerapigw.iyzipay.com",
      createTag: function () {
        /* const iyziJSTag = document.createElement("script");
        iyziJSTag.src =
          "https://sandbox-static.iyzipay.com/checkoutform/v2/bundle.js?v=1741215875529"; */
        //document.head.appendChild(iyziJSTag);
      },
    };

    if (initResponse.checkoutFormContent) {
      setCheckoutFormContent(initResponse.checkoutFormContent);

      // Create a wrapper div and inject checkout form safely
      const wrapperDiv = document.createElement("div");
      wrapperDiv.innerHTML = initResponse.checkoutFormContent;

      // Append the form inside #iyzipay-checkout-form
      const checkoutForm = document.getElementById("iyzipay-checkout-form");
      if (checkoutForm) {
        checkoutForm.innerHTML = "";
        checkoutForm.appendChild(wrapperDiv);
      }
    }
  }, [initPayload, initResponse]);

  return <div id='iyzipay-checkout-form'></div>;
};

export default IyzipayPayment;
/* import { useEffect, useState } from "react";
import useIyzipayScript from "./useIyzipayScript";

const IyzipayPayment = ({
  initPayload,
  initResponse,
}: {
  initPayload: any;
  initResponse: any;
}) => {
  useIyzipayScript();
  const [checkoutFormContent, setCheckoutFormContent] = useState(
    initResponse.checkoutFormContent || ""
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    (window as any).iyziInit = {
      currency: "TRY",
      ...initPayload,
      token: initResponse.token,
      createTag: function () {
        const iyziJSTag = document.createElement("script");
        iyziJSTag.src =
          "https://sandbox-static.iyzipay.com/checkoutform/v2/bundle.js?v=1741215875529";
        document.head.appendChild(iyziJSTag);
      },
    };

    if (initResponse.checkoutFormContent) {
      setCheckoutFormContent(initResponse.checkoutFormContent);
      const scriptTag = document.createElement("script");
      scriptTag.type = "text/javascript";
      scriptTag.text = initResponse.checkoutFormContent;
      document.head.appendChild(scriptTag);
    }
  }, [initPayload, initResponse]);

  return (
    <div
      id='iyzipay-checkout-form'
      dangerouslySetInnerHTML={{ __html: checkoutFormContent }}
    ></div>
  );
};

export default IyzipayPayment; */
/* import { useEffect } from "react";
import useIyzipayScript from "./useIyzipayScript";

const IyzipayPayment = ({
  initPayload,
  initResponse,
}: {
  initPayload: any;
  initResponse: any;
}) => {
  useIyzipayScript();
  console.log(initResponse.checkoutFormContent);
  useEffect(() => {
    if (typeof window === "undefined") return;

    (window as any).iyziInit = {
      currency: "TRY",
      ...initPayload,
      //token: "aef389a1-7e0a-49cb-8114-f4c816cd2a16",
      token: initResponse.token,

      price: 5.2,
      pwiPrice: 5.2,
      locale: "en",
      baseUrl: "https://sandbox-api.iyzipay.com",
      merchantGatewayBaseUrl: "https://sandbox-merchantgw.iyzipay.com",
      consumerGatewayBaseUrl: "https://sandbox-consumerapigw.iyzipay.com",
      registerCardEnabled: true,
      bkmEnabled: true,
      bankTransferEnabled: false,
      enabledApmTypes: ["SOFORT", "IDEAL", "QIWI", "GIROPAY"],
      payWithIyzicoEnabled: true,
      buyerName: "Higher",
      buyerSurname: "Faster",
      merchantName: "Sandbox Merchant Name - 3403015",
      gsmNumber: "+905555434332",
      //email: "stronger@implementation.com",
      //payWithIyzicoUsed: false,
      createTag: function () {
        const iyziJSTag = document.createElement("script");
        iyziJSTag.src =
          "https://sandbox-static.iyzipay.com/checkoutform/v2/bundle.js?v=1741215875529";
        document.head.appendChild(iyziJSTag);
      },
    };
    //initResponse.checkoutFormContent;
    (window as any).iyziInit.createTag();
  }, [initPayload, initResponse]);

  return <div id='iyzipay-checkout-form'></div>;
};

export default IyzipayPayment;
 */
