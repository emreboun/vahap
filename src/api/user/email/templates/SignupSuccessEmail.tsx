import { Html } from "@react-email/html";
import { Head } from "@react-email/head";
import { Body } from "@react-email/body";
import { Container } from "@react-email/container";
import { Text } from "@react-email/text";

const SignupSuccessEmail = () => {
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
            Hoş Geldiniz!
          </Text>
          <Text>
            Kaydınız başarıyla tamamlandı. Hesabınızı kullanmaya hemen
            başlayabilirsiniz!
          </Text>
        </Container>
      </Body>
    </Html>
  );
};
export default SignupSuccessEmail;
