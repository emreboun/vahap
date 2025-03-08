import { getCartByToken, updateCart } from "@/api/products/carts";
import { purchaseItems } from "@/api/user/purchase";
import { retrieveCF } from "@/app/(main)/odeme/actions";
import { NextApiRequest, NextApiResponse } from "next";
import { redirect } from "next/navigation";

async function readStream(stream: ReadableStream) {
  const reader = stream.getReader();
  let result = "";

  try {
    // Keep reading until the stream is done
    while (true) {
      const { done, value } = await reader.read();
      if (done) break; // End of stream
      result += new TextDecoder().decode(value);
    }
  } catch (error) {
    console.error("Error reading the stream:", error);
  } finally {
    reader.releaseLock(); // Always release the lock after reading
  }

  return result;
}

export async function POST(request: NextApiRequest) {
  const result = await readStream(request.body);
  if (!result) {
    redirect(`/`);
  }
  const token = result.replace("token=", "");
  if (!token) {
    redirect("/");
  }
  const cart: any = await getCartByToken(token);
  if (!cart) {
    redirect(`/`);
  }
  const cfResponse = await retrieveCF(token);
  if (
    cfResponse.status === "success" &&
    cfResponse.paymentStatus === "SUCCESS"
  ) {
    const purchases = await purchaseItems(
      cart.userId,
      cart.cartItems.map((item: any) => item.productId)
    );
    const updated: any = await updateCart(cart.id, { status: "SUCCESS" });

    redirect(`/odeme?asama=onay&token=${token}&durum=basarili`);
  } else {
    const updated: any = await updateCart(cart.id, { status: "FAILURE" });
    redirect(`/odeme?asama=onay&token=${token}&durum=basarisiz`);
  }
}

/* export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ error: "Token missing in callback" });
  }

  // Store token for later CF-Retrieve step
  localStorage.setItem("iyziToken", token);

  // Redirect to success/failure page
  res.redirect(`/payment-result?token=${token}`);
}
 */
