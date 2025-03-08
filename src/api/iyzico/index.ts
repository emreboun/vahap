"use server";
/* 
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
import Iyzipay from "iyzipay";

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

const request = {
  locale: Iyzipay.LOCALE.TR,

  conversationId: "123456789",
  price: "1",
  paidPrice: "1.2",
  currency: Iyzipay.CURRENCY.TRY,
  installment: "1",
  basketId: "B67832",
  paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
  paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
  paymentCard: {
    cardHolderName: "John Doe",
    cardNumber: "5890040000000016",
    expireMonth: "12",
    expireYear: "2030",
    cvc: "123",
    registerCard: "0",
  },
  buyer: {
    id: "BY789",
    name: "John",
    surname: "Doe",
    gsmNumber: "+905350000000",
    email: "email@email.com",
    identityNumber: "74300864791",
    lastLoginDate: "2015-10-05 12:43:35",
    registrationDate: "2013-04-21 15:12:09",
    registrationAddress: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
    ip: "85.34.78.112",
    city: "Istanbul",
    country: "Turkey",
    zipCode: "34732",
  },
  shippingAddress: {
    contactName: "Jane Doe",
    city: "Istanbul",
    country: "Turkey",
    address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
    zipCode: "34742",
  },
  billingAddress: {
    contactName: "Jane Doe",
    city: "Istanbul",
    country: "Turkey",
    address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
    zipCode: "34742",
  },
  basketItems: [
    {
      id: "BI101",
      name: "Binocular",
      category1: "Collectibles",
      category2: "Accessories",
      itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
      price: "0.3",
    },
    {
      id: "BI102",
      name: "Game code",
      category1: "Game",
      category2: "Online Game Items",
      itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
      price: "0.5",
    },
    {
      id: "BI103",
      name: "Usb",
      category1: "Electronics",
      category2: "Usb / Cable",
      itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
      price: "0.2",
    },
  ],
};
