import crypto from "crypto";
import { encode } from "base-64";

const apiKey = process.env.IYZICO_API_KEY || "your-api-key";
const secretKey = process.env.IYZICO_SECRET_KEY || "your-secret-key";
const baseUrl = "https://api.iyzipay.com";

function generateAuthorizationString(uriPath: any, requestData: any) {
  const randomKey = Date.now().toString();
  const payload = `${randomKey}${uriPath}${JSON.stringify(requestData)}`;
  const encryptedData = crypto
    .createHmac("sha256", secretKey)
    .update(payload)
    .digest("hex");

  const authorizationString = `apiKey:${apiKey}&randomKey:${randomKey}&signature:${encryptedData}`;
  const base64EncodedAuthorization = encode(authorizationString);

  return `IYZWSv2 ${base64EncodedAuthorization}`;
}

export const tempFunction = () => {
  return generateAuthorizationString("/payment/3dsecure/initialize", {
    locale: "tr",
    conversationId: "123456789",
    price: "1.0",
    paidPrice: "1.2",
    installment: 1,
    paymentChannel: "WEB",
    basketId: "B67832",
    paymentGroup: "PRODUCT",
    paymentCard: {
      cardHolderName: "John Doe",
      cardNumber: "5528790000000008",
      expireYear: "2030",
      expireMonth: "12",
      cvc: "123",
    },
    buyer: {
      id: "BY789",
      name: "John",
      surname: "Doe",
      identityNumber: "74300864791",
      email: "email@email.com",
      gsmNumber: "+905350000000",
      registrationDate: "2013-04-21 15:12:09",
      lastLoginDate: "2015-10-05 12:43:35",
      registrationAddress: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
      city: "Istanbul",
      country: "Turkey",
      zipCode: "34732",
      ip: "85.34.78.112",
    },
    shippingAddress: {
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
      zipCode: "34742",
      contactName: "Jane Doe",
      city: "Istanbul",
      country: "Turkey",
    },
    billingAddress: {
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
      zipCode: "34742",
      contactName: "Jane Doe",
      city: "Istanbul",
      country: "Turkey",
    },
    basketItems: [
      {
        id: "BI101",
        price: "0.3",
        name: "Binocular",
        category1: "Collectibles",
        category2: "Accessories",
        itemType: "PHYSICAL",
      },
      {
        id: "BI102",
        price: "0.5",
        name: "Game code",
        category1: "Game",
        category2: "Online Game Items",
        itemType: "VIRTUAL",
      },
      {
        id: "BI103",
        price: "0.2",
        name: "Usb",
        category1: "Electronics",
        category2: "Usb / Cable",
        itemType: "PHYSICAL",
      },
    ],
    currency: "TRY",
    callbackUrl: "https://www.merchant.com/callback",
  });
};
