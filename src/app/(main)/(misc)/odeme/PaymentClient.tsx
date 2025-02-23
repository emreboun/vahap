"use client";
import { purchaseItems } from "@/api/user/purchase";
import { useCart } from "@/components/cart/CartProvider";
import { IyzicoPayment } from "@/components/payment/iyzico";

const PaymentClient = () => {
  const { state, dispatch } = useCart();
  const { sum, items } = state;
  console.log(items);

  const onSubmit = async () => {
    const result = await purchaseItems(
      state.items.map((item) => item.product.id)
    );
    if (result) {
      dispatch({ type: "CLEAR_CART" });
    } else {
    }
    console.log(result);
  };

  return (
    <>
      <IyzicoPayment onSubmit={onSubmit} />
    </>
  );
};

export default PaymentClient;
