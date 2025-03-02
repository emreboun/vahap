import { Box, Typography } from "@mui/material";

interface PurchaseItemProps {
  item: any;
}

const PurchaseItem: React.FC<PurchaseItemProps> = ({ item }) => {
  const { product, user } = item;
  const { email } = user;
  const { name, price, discount } = product;
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          gap: 1.5,
          //position: "relative",
          //right: -6,
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
    </>
  );
};

export default PurchaseItem;
