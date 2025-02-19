import { Box } from "@mui/material";

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
        <div style={{ display: "flex" }}>
          <div
            style={{
              fontSize: fontSize,
              fontFamily: "__Inter_e66fe9",
              //textDecorationLine: "line-through",
            }}
          >
            {Math.floor(Number(value))}
          </div>

          <div
            style={{
              fontSize: !isDecimal ? fontSize - 4 : fontSize,
              marginLeft: !isDecimal ? 1 : 0,
              marginTop: !isDecimal ? 1.5 : 0,
              fontFamily: "__Inter_e66fe9",
            }}
          >
            {!isDecimal || <>{"."}</>}
            {Number(value).toFixed(2).split(".")[1]}
          </div>

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
        </div>
      </Box>
    </>
  );
};
