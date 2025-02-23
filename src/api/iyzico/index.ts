/* "use server";
import { PaymentRequestData } from "iyzipay";
import { iyzipay, requestExample } from "./init";

export const processPayment = async (
  payment: PaymentRequestData = requestExample
) => {
  try {
    const response = iyzipay.payment.create(
      payment,
      function (err: any, result: any) {
        if (err) {
          console.error(err);
        }
        return result;
      }
    );
    console.log(response);
    return response;
  } catch (e: unknown) {
    console.error(e);
  }
}; */

const PAYLOAD = {
  locale: "en",
  conversationId: "sampleConversationId",
  price: "5.2",
  basketId: "B67832",
  paymentGroup: "PRODUCT",
  buyer: {
    id: "BY789",
    name: "Higher",
    surname: "Faster",
    identityNumber: "74300864791",
    email: "stronger@implementation.com",
    gsmNumber: "+905555434332",
    registrationAddress: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
    city: "Istanbul",
    country: "Turkey",
    ip: "85.34.78.112",
  },
  shippingAddress: {
    address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
    contactName: "Jane Doe",
    city: "Istanbul",
    country: "Turkey",
  },
  billingAddress: {
    address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
    contactName: "Jane Doe",
    city: "Istanbul",
    country: "Turkey",
  },
  basketItems: [
    {
      id: "BI101",
      price: "5.2",
      name: "Binocular",
      category1: "Category 1",
      itemType: "PHYSICAL",
    },
  ],
  callbackUrl: "YOUR_CALLBACKURL",
  currency: "TRY",
  paidPrice: "5.2",
  paymentSource: "zooz",
  enabledInstallments: [2, 3],
};
