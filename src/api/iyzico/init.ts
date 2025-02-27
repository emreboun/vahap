/* "use server";
//import Iyzipay, { PaymentRequestData } from "iyzipay";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const Iyzipay = require("iyzipay");

const iyzipay = new Iyzipay({
  apiKey: process.env.IYZICO_API_KEY ?? "",
  secretKey: process.env.IYZICO_SECRET_KEY ?? "",
  uri: process.env.IYZICO_URI ?? "",
});

const requestExample: any = {
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
    cardNumber: "5528790000000008",
    expireMonth: "12",
    expireYear: "2030",
    cvc: "123",
    registerCard: 0,
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

export const init = async () => {
  try {
    console.log(Object.values(iyzipay));
    iyzipay.payment.create(requestExample, function (err: any, result: any) {
      console.log(err, result);
    });
  } catch (error) {
    console.error(error);
  }
};
 */
