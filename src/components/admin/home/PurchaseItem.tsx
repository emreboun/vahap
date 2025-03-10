import { formatDate, turkcetarih_formati } from "@/utils";
import { Box, Typography } from "@mui/material";

interface PurchaseItemProps {
  item: any;
}

const PurchaseItem: React.FC<PurchaseItemProps> = ({ item }) => {
  const { product, user, purchasedAt } = item;
  const { email } = user;
  const { name, price, discount } = product;
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          //justifyContent: "flex-end",
          gap: 1.5,
          //position: "relative",
          //right: -6,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{ flex: 2, wordBreak: "break-word" }}
            fontSize={14}
            letterSpacing={-0.2}
            className='limitedLine'
          >
            {email}
          </Typography>
          <Typography
            sx={{ wordBreak: "break-word" }}
            fontSize={14}
            letterSpacing={-0.2}
            className='limitedLine'
          >
            {`${formatDate(purchasedAt, undefined, { showWeekday: true })}`}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{ flex: 1 }}
            fontSize={14}
            letterSpacing={-0.2}
            className='limitedLine2'
          >
            {name}
          </Typography>
          <Typography
            sx={{ minWidth: 50 }}
            fontSize={14}
            letterSpacing={-0.2}
            className='limitedLine'
          >
            {`${price - discount} TL`}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default PurchaseItem;
