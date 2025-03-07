import { appConfig } from "@/config";

export const getCfPayload = (
  address: any,
  userData: any,
  sum: number,
  items: any[]
) => {
  const billingAddress = {
    contactName: address.fullName,
    address: address.address,
    city: address.city,
    country: address.country,
  };
  const buyer = {
    id: userData.id,
    name: userData.firstName,
    surname: userData.lastName,
    identityNumber: "74300864791",
    email: userData.email,
    gsmNumber: `+9${userData.phone}`,
    registrationAddress: billingAddress.address,
    city: billingAddress.city,
    country: billingAddress.country,
  };
  const basketItems = items.map((item) => ({
    id: item.product.id,
    name: item.product.name,
    price: (item.product.price - item.product.discount).toString(),
    itemType: "VIRTUAL",
    category1: "Eğitim",
  }));
  const payload = {
    billingAddress,
    shippingAddress: billingAddress,
    basketItems,
    buyer,
    locale: "tr",
    currency: "TRY",
    paymentSource: "zooz",
    enabledInstallments: [2, 3],
    paymentGroup: "PRODUCT",
    basketId: "qweqwe",
    price: sum.toString(),
    paidPrice: sum.toString(),
    callbackUrl: `${appConfig.url}/api/iyzipay-callback`,
    conversationId: "sampleConversationId",
  };
  return payload;
};
