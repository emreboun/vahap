import { Html } from "@react-email/html";
import { Head } from "@react-email/head";
import { Body } from "@react-email/body";
import { Container } from "@react-email/container";
import { Text } from "@react-email/text";
import { Button } from "@react-email/button";

interface ResetPasswordProps {
  resetLink: string;
}

export const ResetPasswordEmail = ({ resetLink }: ResetPasswordProps) => {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#f3f4f6", padding: "20px" }}>
        <Container
          style={{
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <Text style={{ fontSize: "20px", fontWeight: "bold" }}>
            Şifre Sıfırlama Talebi
          </Text>
          <Text>
            Şifrenizi sıfırlamak için aşağıdaki butona tıklayın. Bağlantı **30
            dakika** içinde sona erecektir.
          </Text>
          <Button
            href={resetLink}
            style={{
              backgroundColor: "#4F46E5",
              color: "#ffffff",
              padding: "10px 20px",
              borderRadius: "5px",
              textDecoration: "none",
            }}
          >
            Şifremi Sıfırla
          </Button>
          <Text>
            Eğer bu isteği siz yapmadıysanız, bu e-postayı göz ardı
            edebilirsiniz.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};
//export default ResetPasswordEmail;
