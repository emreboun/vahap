"use client";
import { getEditedFields } from "@/utils";
import { Box, Button, FormControl, TextField } from "@mui/material";
import { useState } from "react";

interface AddressFormProps {
  data: any;
  identityNumber?: string;
  onSubmit: (address?: any, idNumber?: string) => void;
}
export const AddressForm: React.FC<AddressFormProps> = ({
  data,
  identityNumber,
  onSubmit,
}) => {
  const [form, setForm] = useState<any>({ ...data });
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [edited, setEdited] = useState(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [idNumber, setIdNumber] = useState<string>(identityNumber ?? "");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, checked } = event.target as any;

    setErrors((prev) => prev.filter((p) => p !== name));

    setForm((prev: object) => ({
      ...prev,
      [name]: value,
    }));
    setEdited(true);
  };

  const handleChangeId = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, checked } = event.target as any;

    setErrors((prev) => prev.filter((p) => p !== name));
    setIdNumber(value);
    setEdited(true);
  };
  //console.log(form.toString);
  const handleSubmit = async () => {
    const list: any = [];
    const PROPS = ["country", "city", "fullName", "address"];

    PROPS.forEach((key) => {
      if (!form[key]) {
        list.push(key);
      }
    });
    if (!identityNumber) {
      if (!idNumber) {
        list.push("idNumber");
      }
    }
    if (list.length > 0) {
      setErrors(list);
      setSubmitted(true);
      return;
    }

    if (
      !data ||
      Object.keys(getEditedFields(data, form, ["id"])).length !== 0
    ) {
      onSubmit({ ...form, id: undefined }, idNumber);
    } else {
      onSubmit(undefined, idNumber);
    }
  };

  return (
    <>
      <FormControl
        component={"form"}
        sx={{
          pt: 4,
          pb: 2,
          flexDirection: "column",
          display: "flex",
          alignItems: "stretch",
          px: { xs: 0, sm: 4, md: 8, lg: 12, xl: 16 },
          gap: 1.2,
        }}
      >
        <TextField
          name={"title"}
          label={"Adres Başlığı"}
          defaultValue={data?.title}
          onChange={handleChange}
          sx={{ flex: 1 }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 1.2,
          }}
        >
          {!identityNumber && (
            <TextField
              name={"idNumber"}
              label={"Tc Kimlik No"}
              defaultValue={""}
              onChange={handleChangeId}
              sx={{ flex: 1 }}
              required={true}
              error={submitted && errors.includes("idNumber")}
              helperText={
                submitted && errors.includes("idNumber") && "Bu alan zorunlu."
              }
            />
          )}
          <TextField
            name={"fullName"}
            label={"Ad Soyad"}
            defaultValue={data?.fullName}
            onChange={handleChange}
            sx={{ flex: 1 }}
            required={true}
            error={submitted && errors.includes("fullName")}
            helperText={
              submitted && errors.includes("fullName") && "Bu alan zorunlu."
            }
          />
        </Box>
        <TextField
          name={"address"}
          label={"Adres"}
          defaultValue={data?.address}
          multiline
          minRows={3}
          maxRows={6}
          onChange={handleChange}
          sx={{ flex: 1 }}
          required={true}
          error={submitted && errors.includes("address")}
          helperText={
            submitted && errors.includes("address") && "Bu alan zorunlu."
          }
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 1,
          }}
        >
          {/* <TextField
            name={"zipCode"}
            label={"Posta Kodu"}
            onChange={handleChange}
            sx={{ flex: 1 }}
          /> */}

          <TextField
            name={"city"}
            label={"Şehir"}
            defaultValue={data?.city}
            onChange={handleChange}
            sx={{ flex: 1 }}
            required={true}
            error={submitted && errors.includes("city")}
            helperText={
              submitted && errors.includes("city") && "Bu alan zorunlu."
            }
          />

          <TextField
            name={"country"}
            label={"Ülke"}
            defaultValue={data?.country}
            onChange={handleChange}
            sx={{ flex: 1 }}
            required={true}
            error={submitted && errors.includes("country")}
            helperText={
              submitted && errors.includes("country") && "Bu alan zorunlu."
            }
          />
        </Box>
        <Button
          variant={"contained"}
          sx={{
            mt: 1,
            py: 1,
            textTransform: "none",
            alignSelf: { xs: "stretch", md: "flex-end" },
          }}
          onClick={handleSubmit}
        >
          {!data || edited ? "Adresi Kaydet" : "Adresi Onayla"}
        </Button>
      </FormControl>
    </>
  );
};
