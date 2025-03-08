"use server";
import { headers } from "next/headers";

import { generateAuthorizationString } from "@/api/iyzico/axios";
import axios from "axios";

/* export const initialize3DPayment = async (body: any = dRequest) => {
  try {
    const result = await axios.post(
      "https://sandbox-api.iyzipay.com/payment/3dsecure/initialize",
      body,
      {
        headers: {
          Authorization: generateAuthorizationString(
            "/payment/3dsecure/initialize",
            body
          ), //"IYZWSv2 YXBpS2V5OnlvdXItYXBpLWtleSZyYW5kb21LZXk6MTczOTY1ODAwNjUzMiZzaWduYXR1cmU6ZjY1NzAxYzNmMjNhMGJlODlkYmE1ZTM4NGNhYmE1MDI2NGY2ZWJkNjllNjM1ZTM4ZjUyYjM5NjcwZTIzZWZhZg==",
          "x-iyzi-rnd": 123456789,
        },
      }
    );
    console.log(result.data);
    return result.data;
  } catch (e) {
    console.error(e);
  }
};
 */
export const initializePayment = async (body: any = INIT_PAYMENT) => {
  try {
    const result = await axios.post(
      //"https://sandbox-api.iyzipay.com/payment/pay-with-iyzico/initialize",
      "https://sandbox-api.iyzipay.com/payment/iyzipos/checkoutform/initialize/auth/ecom",
      body,
      {
        headers: {
          Authorization: generateAuthorizationString(
            "/payment/iyzipos/checkoutform/initialize/auth/ecom",
            body
          ), //"IYZWSv2 YXBpS2V5OnlvdXItYXBpLWtleSZyYW5kb21LZXk6MTczOTY1ODAwNjUzMiZzaWduYXR1cmU6ZjY1NzAxYzNmMjNhMGJlODlkYmE1ZTM4NGNhYmE1MDI2NGY2ZWJkNjllNjM1ZTM4ZjUyYjM5NjcwZTIzZWZhZg==",
          "x-iyzi-rnd": 123456789,
        },
      }
    );
    console.log(result.data);
    return result.data;
  } catch (e) {
    console.error(e);
  }
};

export const initializeCF = async (body: any) => {
  try {
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || "Unknown IP";
    const result = await axios.post(
      //"https://sandbox-api.iyzipay.com/payment/pay-with-iyzico/initialize",
      "https://sandbox-api.iyzipay.com/payment/iyzipos/checkoutform/initialize/auth/ecom",
      { ...body, buyer: { ...body.buyer, ip } },
      {
        headers: {
          Authorization: generateAuthorizationString(
            "/payment/iyzipos/checkoutform/initialize/auth/ecom",
            { ...body, buyer: { ...body.buyer, ip } }
          ), //"IYZWSv2 YXBpS2V5OnlvdXItYXBpLWtleSZyYW5kb21LZXk6MTczOTY1ODAwNjUzMiZzaWduYXR1cmU6ZjY1NzAxYzNmMjNhMGJlODlkYmE1ZTM4NGNhYmE1MDI2NGY2ZWJkNjllNjM1ZTM4ZjUyYjM5NjcwZTIzZWZhZg==",
          "x-iyzi-rnd": 123456789,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.error(e);
  }
};

export const retrieveCF = async (token: string) => {
  try {
    const result = await axios.post(
      "https://sandbox-api.iyzipay.com/payment/iyzipos/checkoutform/auth/ecom/detail",
      {
        conservationId: "sampleConversationId",
        token,
      },
      {
        headers: {
          Authorization: generateAuthorizationString(
            "/payment/iyzipos/checkoutform/auth/ecom/detail",
            {
              conservationId: "sampleConversationId",
              token,
            }
          ), //"IYZWSv2 YXBpS2V5OnlvdXItYXBpLWtleSZyYW5kb21LZXk6MTczOTY1ODAwNjUzMiZzaWduYXR1cmU6ZjY1NzAxYzNmMjNhMGJlODlkYmE1ZTM4NGNhYmE1MDI2NGY2ZWJkNjllNjM1ZTM4ZjUyYjM5NjcwZTIzZWZhZg==",
          "x-iyzi-rnd": 123456789,
        },
      }
    );
    console.log(result.data);
    return result.data;
  } catch (e) {
    console.log(e);
  }
};

const INIT_PAYMENT = {
  locale: "tr",
  conversationId: "conversationID",
  price: "10.91",
  basketId: "basketID",
  paymentGroup: "OTHER",
  callbackUrl: "https://localhost:3000",
  currency: "TRY",
  paidPrice: "49.91",
  enabledInstallments: [2, 3, 6, 9, 12],
  buyer: {
    id: "buyerID",
    name: "buyerName",
    surname: "buyerSurname",
    identityNumber: "11111111111",
    email: "email@email.com",
    gsmNumber: "+905350000000",
    registrationAddress: "Burhaniye Mahallesi Atilla Sokak No:7 Üsküdar",
    city: "Istanbul",
    country: "Turkey",
    ip: "85.34.78.112",
  },
  shippingAddress: {
    address: "Burhaniye Mahallesi Atilla Sokak No:7 Üsküdar",
    contactName: "Contact Name",
    city: "Istanbul",
    country: "Turkey",
  },
  billingAddress: {
    address: "Burhaniye Mahallesi Atilla Sokak No:7 Üsküdar",
    contactName: "Contact Name",
    city: "Istanbul",
    country: "Turkey",
  },
  basketItems: [
    {
      id: "ItemID",
      price: "10.91",
      name: "product Name",
      category1: "Category Name",
      itemType: "PHYSICAL",
    },
  ],
};
