import { Paper } from "@mui/material";
import { AdminAccountMenu } from "./menu";
import { NavigationLink } from "@/components/app-bar/link";
import Image from "next/image";
import { cookies } from "next/headers";

interface BarProps {
  children?: React.ReactNode;
}

export const AdminBar: React.FC<BarProps> = async ({}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  /* const [token, setToken] = useState("");
  useEffect(() => {
    setToken(localStorage.getItem("token")?.toString() ?? "");
  }, []); */

  return (
    <>
      <Paper
        style={{
          height: "56px",
          position: "relative", // "fixed",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1rem 0 2rem",
          borderRadius: 0,
        }}
        elevation={2}
      >
        <NavigationLink
          href='/admin'
          title={"Anasayfa"}
          style={{ display: "flex", alignItems: "center" }}
        >
          <>
            <Image
              src='/logo-trans.png'
              alt='logo'
              height={52}
              width={142}
              style={{ transform: "scale(0.8)" }}
              priority
            />
          </>
        </NavigationLink>

        {!!token && <AdminAccountMenu account={{}} />}
      </Paper>
    </>
  );
};
