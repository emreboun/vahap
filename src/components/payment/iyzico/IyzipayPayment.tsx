import { useEffect, useState } from "react";
import useIyzipayScript from "./useIyzipayScript";
import { iyzicoConfig } from "@/config";
export { iyzicoConfig } from "@/config";

const { url } = iyzicoConfig;

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
      pwiPrice: initPayload.price,
      baseUrl: url, //"https://sandbox-api.iyzipay.com",
      merchantGatewayBaseUrl: "https://sandbox-merchantgw.iyzipay.com",
      consumerGatewayBaseUrl: "https://sandbox-consumerapigw.iyzipay.com",
      //registerCardEnabled: false,
      //storeNewCardEnabled: true,
      //payWithIyzicoEnabled: true,
      //paymentWithNewCardEnabled: true,

      registerCardEnabled: true,
      bankTransferEnabled: false,
      bankTransferTimeLimit: { value: 5, type: "day" },
      bankTransferRedirectUrl: "",
      bankTransferCustomUIProps: {},
      bkmEnabled: false,
      campaignEnabled: false,
      campaignMarketingUiDisplay: null,
      paymentSourceName: "zooz",
      plusInstallmentResponseList: null,
      payWithIyzicoSingleTab: false,
      payWithIyzicoSingleTabV2: false,
      payWithIyzicoOneTab: false,
      mixPaymentEnabled: true,
      creditCardEnabled: true,
      bankTransferAccounts: [],
      userCards: [],
      fundEnabled: true,
      memberCheckoutOtpData: {},
      force3Ds: false,
      //isSandbox: true,
      storeNewCardEnabled: false,
      paymentWithNewCardEnabled: false,
      // enabledApmTypes: ["SOFORT", "IDEAL", "QIWI", "GIROPAY"],
      payWithIyzicoUsed: false,
      payWithIyzicoEnabled: true,
      payWithIyzicoCustomUI: {},
      buyerProtectionEnabled: false,
      hide3DS: false,
      checkConsumerDetail: {},
      subscriptionPaymentEnabled: false,
      disabledCardStorageInfoCheckbox: false,
      ucsEnabled: false,
      fingerprintEnabled: false,
      payWithIyzicoFirstTab: false,
      creditEnabled: false,
      payWithIyzicoLead: false,
      zeroAuth: false,
      goBackUrl: "",
      quickPwiEnabled: false,
      quickPwiNewCardEnabled: false,
      consumerCardList: [],
      metadata: {},
      createTag: function () {
        const iyziJSTag = document.createElement("script");
        iyziJSTag.src =
          "https://sandbox-static.iyzipay.com/checkoutform/v2/bundle.js?v=1741215875529";
        document.head.appendChild(iyziJSTag);
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
