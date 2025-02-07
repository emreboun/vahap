import { Article } from "@/components/article";

export default function AboutPage() {
  return (
    <>
      <Article
        title={"Hakkımda"}
        sections={[
          {
            title: "",
            content: `Merhaba,ben GM Vahap Şanal.6 yaşından beri satranç oynuyorum.Şu an 26 yaşındayım ve ülkemizi birçok kez A Milli Takım'da oynayarak temsil ettim.

Sizlerle yıllar içinde profesyonel kariyerimde öğrendiğim bilgileri paylaşabilmek için buradayım.`,
          },
          {
            title: "Kariyerimdeki başarılar:",
            content: `- En yüksek ulaştığım FIDE ratingi:2608
- 2019-2020 ve 2024 yıllarında Türkiye Satranç Şampiyonluğu
- 2023 FIDE Dünya Kupası'nda 4. tura kadar ilerleyerek ülkemizde bu turnuvada elde edilen en iyi sonuca ulaştım.
- 2022 Türkiye Satranç Süper Ligi'nin birinci masasında 9/12 puan ve 2796 elo performansıyla birincilik
- 2018 Avrupa Hızlı ve Yıldırım Satranç Şampiyonası'nda 3.'lük
- 2017 ve 2019 yıllarında Lienz Open turnuvasında 1.'lik
- 2021 Fagernes Open turnuvasında 1.'lik
- Dünya 16 Yaş Altı Satranç Olimpiyatı'nda birinci masa 1.'liği`,
          },
        ]}
      />
    </>
  );
}
