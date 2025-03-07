import { getCartByToken, updateCart } from "@/api/products/carts";
import { purchaseItems } from "@/api/user/purchase";
import { retrieveCF } from "@/app/(main)/(misc)/odeme/actions";
import { readStream } from "@/components/payment/iyzico/utils";
import { NextApiRequest, NextApiResponse } from "next";
import { redirect } from "next/navigation";

export async function POST(request: NextApiRequest) {
  console.log("request");
  //console.log(request);
  console.log(request.body);
  const result = await readStream(request.body);
  if (!result) {
    redirect(`/`);
  }
  const token = result.replace("token=", "");
  if (!token) {
    redirect("/");
  }
  const cart: any = await getCartByToken(token);
  console.log(cart);
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
    console.log(updated);

    console.log(purchases);
    console.log(result);
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
