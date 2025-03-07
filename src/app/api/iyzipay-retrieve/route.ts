import { NextApiRequest, NextApiResponse } from "next";

export async function POST(request: Request) {
  console.log("request");
  console.log(request);
  console.log(request.body);
}

/* 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const token = req.body.token || localStorage.getItem("iyziToken");
  if (!token) {
    return res.status(400).json({ error: "Missing token" });
  }

  try {
    const response = await fetch(
      "https://sandbox-api.iyzipay.com/payment/iyzipos/checkoutform/auth/detail",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer YOUR_SECRET_KEY`, // Replace with real API Key
        },
        body: JSON.stringify({
          locale: "en",
          token,
          conversationId: "sampleConversationId",
        }),
      }
    );

    const result = await response.json();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve payment status" });
  }
}
 */
