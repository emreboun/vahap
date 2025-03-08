"use server";
import { headers } from "next/headers";

import { generateAuthorizationString } from "@/api/iyzico/axios";
import axios from "axios";

import { iyzicoConfig } from "@/config";

const { url } = iyzicoConfig;
export const initializeCF = async (body: any) => {
  try {
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || "Unknown IP";
    const result = await axios.post(
      `${url}/payment/iyzipos/checkoutform/initialize/auth/ecom`,
      { ...body, buyer: { ...body.buyer, ip } },
      {
        headers: {
          Authorization: generateAuthorizationString(
            "/payment/iyzipos/checkoutform/initialize/auth/ecom",
            { ...body, buyer: { ...body.buyer, ip } }
          ),
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
      `${url}/payment/iyzipos/checkoutform/auth/ecom/detail`,
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
          ),
          "x-iyzi-rnd": 123456789,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
};
