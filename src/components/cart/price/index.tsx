import { Box, Typography } from "@mui/material";

interface PriceProps {
  value: number | string;
  fontSize?: number;
  isPc?: boolean;
  isSign?: string;
  isDecimal?: boolean;
  color?: string;
  sx?: any;
}

export const Price: React.FC<PriceProps> = ({
  value,
  fontSize = 20,
  isPc,
  isSign = "₺",
  isDecimal = false,
  color = "text.primary",
  sx,
}) => {
  if (typeof value === "string" && !value) return <>??</>;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          color: color,
          //flexDirection: "row-reverse"
          ...sx,
        }}
      >
        {!isSign || (
          <div
            style={{
              marginRight: 1,
              marginTop: 2,
              fontSize: fontSize - 3,
              alignSelf: "center",
              fontWeight: 400,
              fontFamily: "__Inter_e66fe9",
            }}
          >
            {"₺"}
          </div>
        )}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            fontSize={fontSize}
            fontWeight={600}
            fontFamily={"Lexend, Roboto, __Inter_e66fe9"}
            letterSpacing={-0.4}
          >
            {Math.floor(Number(value))}
          </Typography>

          <Typography
            style={{
              marginLeft: !isDecimal ? 1 : 0,
              marginTop: !isDecimal ? 1.5 : 0,
            }}
            fontSize={fontSize - 4}
            fontFamily={"Lexend, Roboto, __Inter_e66fe9"}
            fontWeight={600}
            letterSpacing={-0.6}
          >
            {!isDecimal || <>{"."}</>}
            {Number(value).toFixed(2).split(".")[1]}
          </Typography>

          <Typography
            fontSize={fontSize - 4}
            letterSpacing={-0.4}
            sx={{ pl: 0.2 }}
            fontFamily={"Lexend"}
          >
            {"TL"}
          </Typography>

          {isPc && (
            <>
              <div style={{ fontSize: fontSize + 3 }}>{"/"}</div>
              <div
                style={{
                  fontSize: fontSize - 3,
                  paddingTop: 4,
                  marginLeft: -1,
                }}
              >
                {"ad."}
              </div>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};
