import { useEffect } from "react";

const useIyzipayScript = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if already injected
    if (document.getElementById("iyzi-script")) return;

    const script = document.createElement("script");
    script.src =
      "https://sandbox-static.iyzipay.com/checkoutform/v2/bundle.js?v=1741215875529";
    script.id = "iyzi-script";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);
};

export default useIyzipayScript;
