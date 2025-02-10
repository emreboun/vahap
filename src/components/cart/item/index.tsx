import Image from "next/image";
import { DeleteOutline as DeleteIcon } from "@mui/icons-material";
import { Button, Select, MenuItem } from "@mui/material";

import { Price } from "@/components/cart/price";

interface ItemProps {
  item: any;
}

export const CartItem: React.FC<ItemProps> = ({ item }) => {
  const onSelect = (v: unknown) => {
    console.log(v);
    //const {product, quantity} = cart[i];
    //
    //dispatch(updateCartAct({ product: result[i].product, quantity: v }));
  };

  return (
    <>
      <li
        //key={i}
        style={{
          borderBottom: "1px solid lightgrey",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 16,
          paddingLeft: 32,
          paddingRight: 32,
          maxHeight: 128,
        }}
      >
        <div
          style={{
            display: "flex",
            marginRight: 32,
            paddingTop: 12,
            paddingBottom: 12,
            //alignItems: "center",
          }}
        >
          <Image
            src={item.product.imageUrls[0]}
            alt=''
            width={114}
            height={50}
            style={{ height: "100%", width: "auto" }}
          />
        </div>

        <div
          style={{
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          <div className={"limitedLine"}>{item.product.name}</div>

          <Price value={Number(item.product.price)} isPc />
        </div>

        <div
          style={{
            fontWeight: 600,
            fontSize: 24,
            fontFamily: "Open Sans",
            flex: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingLeft: 6,
              paddingRight: 2,
              paddingBottom: 4,
              width: "100%",
            }}
          >
            <div style={{ fontSize: 10, marginTop: 4 }}>{"Ara Toplam"}</div>
            <Price
              value={Number(item.product.price) * item.quantity}
              fontSize={18}
              isSign={item.product.priceCurrency}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              variant={"outlined"}
              sx={{
                py: 0,
                px: 0,
                mr: 1,
                mt: -0.2,
                border: "0.5px solid rgb(51,90,32, 0.3)",
                height: "48px",
                minWidth: "56px",
                width: "56px",
              }}
              onClick={() => {} /* handleUpdateCart(item.product, 0) */}
            >
              <DeleteIcon />
            </Button>

            <Select
              value={item.quantity}
              sx={{
                py: 0,
                minWidth: "65px",
                width: "65px",
                height: "52px",
              }}
              MenuProps={{
                PaperProps: {
                  sx: { maxHeight: { xs: "80%", lg: "60%" } },
                },
              }}
              onChange={(e) => onSelect(e.target.value)}
            >
              {Array.from(Array(30).keys()).map((el, i2) => (
                <MenuItem key={i2} value={el + 1}>
                  {el + 1}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
      </li>
    </>
  );
};
