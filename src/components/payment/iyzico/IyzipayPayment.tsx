import { useEffect, useState } from "react";
import useIyzipayScript from "./useIyzipayScript";
import { initializeCF } from "@/app/(main)/(misc)/odeme/actions";

const IyzipayPayment = ({ userData, address, items, sum }: any) => {
  const [checkoutFormContent, setCheckoutFormContent] = useState("");
  console.log(checkoutFormContent);
  useIyzipayScript();

  useEffect(() => {
    if (!userData || !address || !items || !sum) return;

    const billingAddress = {
      contactName: address.fullName,
      address: address.address,
      city: address.city,
      country: address.country,
    };

    const buyer = {
      id: userData.id,
      name: userData.firstName,
      surname: userData.lastName,
      identityNumber: "74300864791",
      email: userData.email,
      gsmNumber: `+9${userData.phone}`,
      registrationAddress: billingAddress.address,
      city: billingAddress.city,
      country: billingAddress.country,
    };

    const basketItems = items.map((item: any) => ({
      id: item.product.id,
      name: item.product.name,
      price: (item.product.price - item.product.discount).toString(),
      itemType: "VIRTUAL",
      category1: "Eğitim",
    }));

    const payload = {
      billingAddress,
      shippingAddress: billingAddress,
      basketItems,
      buyer,
      locale: "tr",
      currency: "TRY",
      paymentSource: "zooz",
      enabledInstallments: [2, 3],
      paymentGroup: "PRODUCT",
      basketId: "qweqwe",
      price: sum.toString(),
      paidPrice: sum.toString(),
      callbackUrl: "http://127.0.0.1:3000/api/iyzipay-callback",
      conversationId: "sampleConversationId",
    };

    initializeCF(payload).then((result: any) => {
      if (result && result.checkoutFormContent) {
        setCheckoutFormContent(result.checkoutFormContent);
      }
    });
  }, [userData, address, items, sum]);

  return (
    <div id='iyzipay-checkout-form'>
      {/* <div dangerouslySetInnerHTML={{ __html: checkoutFormContent }}></div> */}
    </div>
  );
};

export default IyzipayPayment;
