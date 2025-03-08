"use client";
import { createAddress } from "@/api/user/address";
import { purchaseItems } from "@/api/user/purchase";
import { AddressForm } from "@/components/address";
import { useCart } from "@/components/cart/CartProvider";
import CustomizedSteppers from "@/components/stepper";
import { Box, Paper, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { initializeCF, retrieveCF } from "../../../app/(main)/odeme/actions";
import { useRouter, useSearchParams } from "next/navigation";
import IyzipayPayment from "@/components/payment/iyzico/IyzipayPayment";
import { appConfig } from "@/config";
import { createCart } from "@/api/products/carts";
import { DoNotDisturbOn, VerifiedSharp } from "@mui/icons-material";
import { getCfPayload } from "../utils";
import { Redirecting } from "@/components/payment/Redirecting";
import { v4 as uuidv4 } from "uuid";
import { addIdNumber } from "@/api/user/account";

const PHASES = ["fatura", "odeme", "onay"];

const PaymentClient = () => {
  /* const router = useRouter();
  const searchParams = useSearchParams();
  const { state, dispatch } = useCart();

  const asama = searchParams.get("asama") ?? "fatura";
  const token = searchParams.get("token") ?? "";
  const durum = searchParams.get("durum") ?? "";

  const { sum, items } = state;

  const [userData, setUserData] = useState<any>(null);
  const [address, setAddress] = useState<any>(null);
  const [cfResult, setCfResult] = useState<any>(null);
  const [cfPayload, setCfPayload] = useState<any>(null); */

  const router = useRouter();
  const searchParams = useSearchParams();
  const asama: any = searchParams.get("asama") ?? "fatura";
  const token: any = searchParams.get("token") ?? "";
  const durum: any = searchParams.get("durum") ?? "";

  const { state, dispatch } = useCart();
  const { sum, items } = state;
  /*  if (items.length === 0) {
    router.push("/");
  } */

  useEffect(() => {
    if (items.length === 0) {
      router.push("/");
    }
  }, [items, router]);

  const handlePhase = () => {
    router.push(`/odeme?asama=${PHASES[PHASES.indexOf(asama) + 1]}`);
  };

  const [userData, setUser] = useState<any>(null);
  const [address, setAddress] = useState<any>(null);

  const [cfResult, setCfResult] = useState<any>();
  const [cfPayload, setCfPayload] = useState<any>();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") ?? "{}");
    setUser(user);
    setAddress(
      user.addresses && user.addresses.length > 0 ? user.addresses[0] : null
    );
  }, []);

  const onPaymentSuccess = useCallback(
    (status: string) => {
      if (status === "basarili") {
        //setBoughtItems(items.map((item) => item.product));
        dispatch({ type: "CLEAR_CART" });
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (asama === "onay" && token && durum) {
      onPaymentSuccess(durum);
    }
  }, [asama, token, durum, onPaymentSuccess]);

  const onSubmitAddress = async (addressVal?: any, idNumber?: string) => {
    if (idNumber) {
      const idResult = await addIdNumber(userData.id, idNumber);
      if (idResult) {
        setUser((prev: any) => ({
          ...prev,
          idNumber: idNumber,
        }));
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...JSON.parse(localStorage.getItem("user") ?? "{}"),
            idNumber: idNumber,
          })
        );
      }
    }

    if (addressVal) {
      // TODO:

      const result = await createAddress(userData.id, addressVal);
      if (!!result) {
        setAddress({ ...addressVal, id: result.id });
        const addresses = userData.addresses ?? [];
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...userData,
            addresses: [{ ...addressVal, id: result.id }, ...addresses],
          })
        );
      } else {
        return;
      }
    }
    const cartId = uuidv4();
    const payload = getCfPayload(
      addressVal ?? address,
      userData,
      sum,
      items,
      cartId
    );
    setCfPayload(payload);
    const result = await initializeCF(payload);
    if (!!result) {
      setCfResult(result);
      if (result.token && result.paymentPageUrl) {
        const resultCart = await createCart({
          token: result.token,
          userId: userData.id,
          totalPrice: sum,
          products: items.map((item) => ({
            id: item.product.id,
            price: item.product.price - item.product.discount,
          })),
        });
      }
    }
    handlePhase();
  };
  return (
    <Paper
      sx={{
        px: 4,
        pb: 3,
        pt: { xs: 4, md: 3 },
        boxShadow: 2,
        minHeight: { xs: 320, md: 480 },
        maxWidth: { xs: "100%", sm: 650, lg: 1000, xl: 1200 },
        alignSelf: "center",
        mx: "auto",
      }}
      elevation={0}
    >
      <Box
        sx={{
          pt: { xs: 1, md: 2 },
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box sx={{ py: { xs: 0, md: 1 }, mx: { xs: -2, sm: -1, md: 0 } }}>
          <CustomizedSteppers activeStep={PHASES.indexOf(asama)} />
        </Box>

        {userData && asama === "fatura" && (
          <AddressForm
            data={address}
            identityNumber={userData.idNumber}
            // errors={errors}
            onSubmit={onSubmitAddress}
          />
        )}

        {asama === "odeme" && cfResult && (
          <IyzipayPayment initPayload={cfPayload} initResponse={cfResult} />
        )}

        {asama === "onay" && (
          <>
            <Paper
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1.5,
                pt: 3,
                pb: 3,
                px: { xs: 1, sm: 2, md: 3, lg: 4 },
                mx: -1,
                maxWidth: 720,
                alignSelf: "center",
              }}
            >
              {durum === "basarili" ? (
                <>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <VerifiedSharp
                      color={"success"}
                      sx={{ mb: 0.4, fontSize: 32 }}
                    />
                    <Typography
                      fontFamily={"Montserrat"}
                      fontWeight={500}
                      letterSpacing={-0.3}
                      fontSize={20}
                    >
                      {"Ödeme işlemi başarıyla tamamlandı."}
                    </Typography>
                  </Box>
                </>
              ) : (
                <>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <DoNotDisturbOn
                      color={"error"}
                      sx={{ mb: 0.4, fontSize: 32 }}
                    />
                    <Typography
                      fontFamily={"Montserrat"}
                      fontWeight={500}
                      letterSpacing={-0.3}
                      fontSize={20}
                    >
                      {"Bir hata oluştu."}
                    </Typography>
                  </Box>
                  <Typography
                    fontFamily={"Montserrat"}
                    fontWeight={500}
                    letterSpacing={-0.3}
                    textAlign={"center"}
                  >
                    {
                      "Ödeme sırasında bir problemle karşılaşıldı. Lütfen daha sonra tekrar deneyin."
                    }
                  </Typography>
                </>
              )}
            </Paper>

            {durum === "basarili" && (
              <Box sx={{ alignSelf: "center" }}>
                <Redirecting />
              </Box>
            )}
          </>
        )}
      </Box>
    </Paper>
  );
};

export default PaymentClient;
