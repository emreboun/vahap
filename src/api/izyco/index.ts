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
