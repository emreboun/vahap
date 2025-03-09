--
-- PostgreSQL database dump
--

-- Dumped from database version 14.17 (Ubuntu 14.17-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.17 (Ubuntu 14.17-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: lecture_tags; Type: TABLE DATA; Schema: public; Owner: root
--



--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.products (id, slug, image_url, name, description, status, "order", price, discount, created_at, updated_at) VALUES ('bb1f3d44-51c2-47af-90a4-950e32ce299e', 'uyumlu-taslar', '', 'Uyumlu Taşlar', 'Daha kaliteli oyunlar oynamak,stratejik anlayışınızı geliştirmek,oyununuza istikrar sağlamak için ''''Uyumlu Taşlar'''' konulu dersin çok faydalı olacağını düşünüyorum.

Derste anlattığım konular:
*Örnek oyun analizleri: Bu konunun uzmanlıkla uygulandığı,elit oyuncuların oyunlarının detaylı anlatımı
*Taşlarınızı en uyumlu şekilde nasıl konumlandırabilirsiniz?
*Taşların uyumlu olup olmadığı nasıl anlaşılır?
*Bu konuda kendinizi geliştirmek için hangi çalışma metodlarını uygulayabilirsiniz?
*Taşlarınızın uyumlu olması neden bu kadar önemlidir,ve oyunun sonucunu neden ciddi bir şekilde etkiler?

Bu soruların hepsinin yanıtlarını,kariyerimde bu beceriyi nasıl geliştirdiğimi,ve sizlere nasıl geliştirebileceğinizi anlatıyorum.

Kimler İçin Uygun?
Dersleri her seviyeden oyuncunun faydalanabileceği şekilde anlatmaya çalışıyorum. Ancak, dersin bazı bölümleri ileri düzey analiz içerdiği için özellikle 1800+ seviyesindeki oyunculara daha faydalı olabilir.
Bu sadece bir öneridir. Elimden geldiğince dersleri hem üst düzey hem de anlaşılabilir şekilde planladım, böylece her seviyeden oyuncu faydalanabilir.', true, 1, 1500, 100, '2025-02-18 18:31:47.97', '2025-02-18 19:26:46.604');
INSERT INTO public.products (id, slug, image_url, name, description, status, "order", price, discount, created_at, updated_at) VALUES ('ef220e1f-a90a-4f58-9009-6a2314e7e396', 'stratejik-konumlarda-hamle-bulma-metodlari', NULL, 'Stratejik konumlarda hamle bulma metodları', 'Satranç oyuncularının en zorlandığı konulardan bir tanesi,hamle ararken hangi metodları kullanacağını bilmemesi,veya karar verememesidir.Profesyonel kariyerimde dünyanın en iyi antrenörlerinden öğrendiğim bu metodları sizlerle paylaşıyorum.

**Derste anlattığım konular:**

* Oyunlarımda sürekli kullandığım ve çok faydalandığım stratejik konumlarda kullanabileceğiniz hamle bulma metodları
* Elit oyuncuların bu metodları en doğru şekilde kullandığı örnek oyunlar
* Bu metodları öğendikten sonra,sürekli geliştirebilmeniz için çalışma yöntemleri

Bu soruların hepsinin yanıtlarını,kariyerimde bu beceriyi nasıl geliştirdiğimi,ve sizlere nasıl geliştirebileceğinizi anlatıyorum.

**Kimler İçin Uygun?**

Dersleri her seviyeden oyuncunun faydalanabileceği şekilde anlatmaya çalışıyorum. Ancak, dersin bazı bölümleri ileri düzey analiz içerdiği için özellikle 1800+ seviyesindeki oyunculara daha faydalı olabilir.

Bu sadece bir öneridir. Elimden geldiğince dersleri hem üst düzey hem de anlaşılabilir şekilde planladım, böylece her seviyeden oyuncu faydalanabilir.', true, 3, 1500, 0, '2025-02-21 19:41:46.433', '2025-02-21 19:41:46.433');
INSERT INTO public.products (id, slug, image_url, name, description, status, "order", price, discount, created_at, updated_at) VALUES ('7eafb08e-8030-4a4f-9bfe-0ca2835703d3', 'sah-guvenligi', NULL, 'Şah Güvenliği', 'Şah güvenliği konusunun satrancın en önemli konularından biri olduğunu,ve oyunlarınıza çok faydalı olacağını düşünüyorum.

 

Derste anlattığım konular:

*Şah güvenliği nedir,ve neden satrancın en önemli konularından bir tanesidir?

*Şah güvenliğinin seviyesi nasıl değerlendirilir? Hangi metodları kullanarak şahınızın ne kadar güvende olduğunu anlayabilirsiniz?

Kendi oyunlarımda kullandığım ve çok faydasını gördüğüm,şah güvenliğini değerlendirebileceğiniz metodlar anlatacağım.

*Bu konunun en uzman isimlerinden biri olan Magnus Carlsen,ve kendi kariyerimde kullandığım örnek oyunlarımı detaylı bir şekilde anlatarak,şah güvenliği konusunun pratikte nasıl uygulandığını göstereceğim.

 

Bu soruların hepsinin yanıtlarını,kariyerimde bu beceriyi nasıl geliştirdiğimi,ve sizlere nasıl geliştirebileceğinizi anlatacağım.

 

Kimler İçin Uygun?
Dersleri her seviyeden oyuncunun faydalanabileceği şekilde anlatmaya çalışıyorum. Ancak, dersin bazı bölümleri ileri düzey analiz içerdiği için özellikle 1800+ seviyesindeki oyunculara daha faydalı olabilir.

Bu sadece bir öneridir. Elimden geldiğince dersleri hem üst düzey hem de anlaşılabilir şekilde planladım, böylece her seviyeden oyuncu faydalanabilir.', true, 4, 1500, 0, '2025-02-21 22:15:46.433', '2025-02-21 22:15:46.433');
INSERT INTO public.products (id, slug, image_url, name, description, status, "order", price, discount, created_at, updated_at) VALUES ('8d17eb7a-f856-418a-9170-e35aab014d2a', 'satrancta-plan-kurma', '', 'Satrançta plan kurma', 'Satrançta plan kurma konusu benim kariyerim için en faydalı konulardan bir tanesi oldu. Oyunu kazanmak için çok daha kontrollü bir yol izleyebildim. Bu yüzden dersin sizlere de çok faydalı olacağını düşünüyorum.

Derste anlatacağım konular:
*Plan kurmanız gereken doğru anı nasıl anlarsınız?
*Plan kurarken konumda dikkat etmeniz gereken en önemli detaylar nelerdir?
*Plan kurma konusunda en üst düzey beceriye sahip elit oyuncuların örnek oyunlarını detaylı bir şekilde fikirleriyle anlatacağım.
*Plan kurma becerinizi hangi çalışma yöntemleriyle geliştirebilirsiniz? Bu çalışmaları kendiniz nasıl yapabilirsiniz?

Bu soruların hepsinin yanıtlarını,kariyerimde bu beceriyi nasıl geliştirdiğimi,ve sizlere nasıl geliştirebileceğinizi anlattım.

Kimler İçin Uygun?
Dersleri her seviyeden oyuncunun faydalanabileceği şekilde anlatmaya çalışıyorum. Ancak, dersin bazı bölümleri ileri düzey analiz içerdiği için özellikle 1800+ seviyesindeki oyunculara daha faydalı olabilir.
Bu sadece bir öneridir. Elimden geldiğince dersleri hem üst düzey hem de anlaşılabilir şekilde planladım, böylece her seviyeden oyuncu faydalanabilir.', true, 2, 1500, 100, '2025-02-17 23:57:54.004', '2025-03-02 06:37:00.752');
INSERT INTO public.products (id, slug, image_url, name, description, status, "order", price, discount, created_at, updated_at) VALUES ('78c4e500-9b64-48ff-84df-b96c8723e1b7', 'tum-dersler-4-ders-video-kayit', NULL, 'Tüm Dersler (4 Ders - Video Kayıt)', 'Tüm Dersler (4 Ders-Video Kayıt) ürününü satın aldığınızda:

''''Uyumlu Taşlar’’ konulu satranç dersi (Video Kayıt)

‘’Şah Güvenliği’’ konulu satranç dersi (Video Kayıt)

‘’Satrançta Plan kurma’’ konulu satranç dersi (Video Kayıt)

‘’Stratejik konumlarda hamle bulma metodları’’ konulu satranç dersi (Video Kayıt)

 

derslerinin hepsinin izleme linki ve parolası size 15 dakika içerisinde gönderilecektir.

 

Bu 4 ders,benim kariyerimde öğrendiğim onlarca konudan ‘’en önemli olanlar’’ kategorisine koyduğum konulardan oluşmaktadır.

 

Tüm konuları hala aktif olarak oyunlarımda kullanıyor,ve çok faydasını görüyorum.Hangi seviyede olursanız olun,sizlerin de oyunlarına çok faydası olacağını düşünüyorum. 

 

Dersleri önerdiğim izleme sırası:

1)Uyumlu Taşlar

2)Şah Güvenliği

3)Satrançta Plan kurma

4)Stratejik konumlarda hamle bulma', true, 17, 6000, 1500, '2025-02-23 11:20:03.74', '2025-02-23 11:20:03.74');
INSERT INTO public.products (id, slug, image_url, name, description, status, "order", price, discount, created_at, updated_at) VALUES ('30d733e8-55ec-42f3-a9d8-de96a6307660', 'qwe', NULL, 'Deneme Bileti', '', true, 18, 1000, 300, '2025-02-26 20:38:50.371', '2025-03-02 07:41:08.488');
INSERT INTO public.products (id, slug, image_url, name, description, status, "order", price, discount, created_at, updated_at) VALUES ('156366e3-2116-4288-9eaf-90e79579dad4', 'yeni-bilet', NULL, 'Yeni Bilet', '', true, 19, 1000, 300, '2025-03-02 08:24:20.779', '2025-03-02 08:24:20.779');
INSERT INTO public.products (id, slug, image_url, name, description, status, "order", price, discount, created_at, updated_at) VALUES ('405606f0-38d4-46b2-b8fd-0e61cda2b4b0', 'yeni-bilet-2-workshop', NULL, 'Yeni Bilet 2 - Workshop', '', true, 20, 1000, 200, '2025-03-02 08:25:49.944', '2025-03-02 08:25:49.944');


--
-- Data for Name: lectures; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.lectures (id, slug, name, description, status, intro_video, main_video, thumbnail, min_elo, max_elo, misc, duration, "order", created_at, updated_at, product_id) VALUES ('f6e3f8f4-090c-4377-807c-45f1414aef25', 'stratejik-konumlarda-hamle-bulma-metodlari', 'Stratejik konumlarda hamle bulma metodları', 'Satranç oyuncularının en zorlandığı konulardan bir tanesi,hamle ararken hangi metodları kullanacağını bilmemesi,veya karar verememesidir.Profesyonel kariyerimde dünyanın en iyi antrenörlerinden öğrendiğim bu metodları sizlerle paylaşıyorum.

**Derste anlattığım konular:**

* Oyunlarımda sürekli kullandığım ve çok faydalandığım stratejik konumlarda kullanabileceğiniz hamle bulma metodları
* Elit oyuncuların bu metodları en doğru şekilde kullandığı örnek oyunlar
* Bu metodları öğendikten sonra,sürekli geliştirebilmeniz için çalışma yöntemleri

Bu soruların hepsinin yanıtlarını,kariyerimde bu beceriyi nasıl geliştirdiğimi,ve sizlere nasıl geliştirebileceğinizi anlatıyorum.

**Kimler İçin Uygun?**

Dersleri her seviyeden oyuncunun faydalanabileceği şekilde anlatmaya çalışıyorum. Ancak, dersin bazı bölümleri ileri düzey analiz içerdiği için özellikle 1800+ seviyesindeki oyunculara daha faydalı olabilir.

Bu sadece bir öneridir. Elimden geldiğince dersleri hem üst düzey hem de anlaşılabilir şekilde planladım, böylece her seviyeden oyuncu faydalanabilir.', true, NULL, 'https://vimeo.com/1050368189?share=copy', '', 1600, 2400, NULL, 7920, 2, '2025-02-21 19:41:46.433', '2025-03-02 02:03:06.328', 'ef220e1f-a90a-4f58-9009-6a2314e7e396');
INSERT INTO public.lectures (id, slug, name, description, status, intro_video, main_video, thumbnail, min_elo, max_elo, misc, duration, "order", created_at, updated_at, product_id) VALUES ('45ec24c4-1372-4682-a9da-7fc78ac044f1', 'sah-guvenligi', 'Şah Güvenliği', 'Şah güvenliği konusunun satrancın en önemli konularından biri olduğunu,ve oyunlarınıza çok faydalı olacağını düşünüyorum.

 

Derste anlattığım konular:

*Şah güvenliği nedir,ve neden satrancın en önemli konularından bir tanesidir?

*Şah güvenliğinin seviyesi nasıl değerlendirilir? Hangi metodları kullanarak şahınızın ne kadar güvende olduğunu anlayabilirsiniz?

Kendi oyunlarımda kullandığım ve çok faydasını gördüğüm,şah güvenliğini değerlendirebileceğiniz metodlar anlatacağım.

*Bu konunun en uzman isimlerinden biri olan Magnus Carlsen,ve kendi kariyerimde kullandığım örnek oyunlarımı detaylı bir şekilde anlatarak,şah güvenliği konusunun pratikte nasıl uygulandığını göstereceğim.

 

Bu soruların hepsinin yanıtlarını,kariyerimde bu beceriyi nasıl geliştirdiğimi,ve sizlere nasıl geliştirebileceğinizi anlatacağım.

 

Kimler İçin Uygun?
Dersleri her seviyeden oyuncunun faydalanabileceği şekilde anlatmaya çalışıyorum. Ancak, dersin bazı bölümleri ileri düzey analiz içerdiği için özellikle 1800+ seviyesindeki oyunculara daha faydalı olabilir.

Bu sadece bir öneridir. Elimden geldiğince dersleri hem üst düzey hem de anlaşılabilir şekilde planladım, böylece her seviyeden oyuncu faydalanabilir.', true, NULL, 'https://vimeo.com/1049436256?share=copy', '', 1600, 2400, NULL, 7920, 4, '2025-02-21 22:15:46.433', '2025-03-02 02:03:13.895', '7eafb08e-8030-4a4f-9bfe-0ca2835703d3');
INSERT INTO public.lectures (id, slug, name, description, status, intro_video, main_video, thumbnail, min_elo, max_elo, misc, duration, "order", created_at, updated_at, product_id) VALUES ('c9771da4-4453-4c1f-92c8-af1ecb7cfd1a', 'satrancta-plan-kurma', 'Satrançta plan kurma', 'Satrançta plan kurma konusu benim kariyerim için en faydalı konulardan bir tanesi oldu. Oyunu kazanmak için çok daha kontrollü bir yol izleyebildim. Bu yüzden dersin sizlere de çok faydalı olacağını düşünüyorum.

**Derste anlatacağım konular:**
* Plan kurmanız gereken doğru anı nasıl anlarsınız?
* Plan kurarken konumda dikkat etmeniz gereken en önemli detaylar nelerdir?
* Plan kurma konusunda en üst düzey beceriye sahip elit oyuncuların örnek oyunlarını detaylı bir şekilde fikirleriyle anlatacağım.
* Plan kurma becerinizi hangi çalışma yöntemleriyle geliştirebilirsiniz? Bu çalışmaları kendiniz nasıl yapabilirsiniz?

Bu soruların hepsinin yanıtlarını,kariyerimde bu beceriyi nasıl geliştirdiğimi,ve sizlere nasıl geliştirebileceğinizi anlattım.

**Kimler İçin Uygun?**
Dersleri her seviyeden oyuncunun faydalanabileceği şekilde anlatmaya çalışıyorum. Ancak, dersin bazı bölümleri ileri düzey analiz içerdiği için özellikle 1800+ seviyesindeki oyunculara daha faydalı olabilir.
Bu sadece bir öneridir. Elimden geldiğince dersleri hem üst düzey hem de anlaşılabilir şekilde planladım, böylece her seviyeden oyuncu faydalanabilir.', true, 'https://vimeo.com/26168268?share=copy', 'https://vimeo.com/1049794483?share=copy', '', 2000, 2400, '{"pgns":[{"name":"qweqwe","content":"qvweqvw"}]}', 7560, 3, '2025-02-17 23:57:54.004', '2025-02-26 20:13:52.045', '8d17eb7a-f856-418a-9170-e35aab014d2a');
INSERT INTO public.lectures (id, slug, name, description, status, intro_video, main_video, thumbnail, min_elo, max_elo, misc, duration, "order", created_at, updated_at, product_id) VALUES ('1a14a9fe-2330-43ee-b49e-e8f90d407009', 'uyumlu-taslar', 'Uyumlu Taşlar', 'Daha kaliteli oyunlar oynamak, stratejik anlayışınızı geliştirmek,oyununuza istikrar sağlamak için ''''Uyumlu Taşlar'''' konulu dersin çok faydalı olacağını düşünüyorum.

**Derste anlattığım konular:**
* Örnek oyun analizleri: Bu konunun uzmanlıkla uygulandığı, elit oyuncuların oyunlarının detaylı anlatımı
* Taşlarınızı en uyumlu şekilde nasıl konumlandırabilirsiniz?
* Taşların uyumlu olup olmadığı nasıl anlaşılır?
* Bu konuda kendinizi geliştirmek için hangi çalışma metodlarını uygulayabilirsiniz?
* Taşlarınızın uyumlu olması neden bu kadar önemlidir, ve oyunun sonucunu neden ciddi bir şekilde etkiler?

Bu soruların hepsinin yanıtlarını, kariyerimde bu beceriyi nasıl geliştirdiğimi, ve sizlere nasıl geliştirebileceğinizi anlatıyorum.

**Kimler İçin Uygun?**
Dersleri her seviyeden oyuncunun faydalanabileceği şekilde anlatmaya çalışıyorum. Ancak, dersin bazı bölümleri ileri düzey analiz içerdiği için özellikle 1800+ seviyesindeki oyunculara daha faydalı olabilir.
Bu sadece bir öneridir. Elimden geldiğince dersleri hem üst düzey hem de anlaşılabilir şekilde planladım, böylece her seviyeden oyuncu faydalanabilir.', true, NULL, 'https://vimeo.com/1048350962?share=copy', '', 1600, 2400, '{"pgns":[{"name":"Açılışlar-3","content":"[Event \"F/S Return Match\"]\n[Site \"Belgrade, Serbia JUG\"]\n[Date \"1992.11.04\"]\n[Round \"29\"]\n[White \"Fischer, Robert J.\"]\n[Black \"Spassky, Boris V.\"]\n[Result \"1/2-1/2\"]\n\n1.e4 e5 2.Nf3 Nc6 3.Bb5 {This opening is called the Ruy Lopez.} 3...a6\n4.Ba4 Nf6 5.O-O Be7 6.Re1 b5 7.Bb3 d6 8.c3 O-O 9.h3 Nb8 10.d4 Nbd7\n11.c4 c6 12.cxb5 axb5 13.Nc3 Bb7 14.Bg5 b4 15.Nb1 h6 16.Bh4 c5 17.dxe5\nNxe4 18.Bxe7 Qxe7 19.exd6 Qf6 20.Nbd2 Nxd6 21.Nc4 Nxc4 22.Bxc4 Nb6\n23.Ne5 Rae8 24.Bxf7+ Rxf7 25.Nxf7 Rxe1+ 26.Qxe1 Kxf7 27.Qe3 Qg5 28.Qxg5\nhxg5 29.b3 Ke6 30.a3 Kd6 31.axb4 cxb4 32.Ra5 Nd5 33.f3 Bc8 34.Kf2 Bf5\n35.Ra7 g6 36.Ra6+ Kc5 37.Ke1 Nf4 38.g3 Nxh3 39.Kd2 Kb5 40.Rd6 Kc5 41.Ra6\nNf2 42.g4 Bd3 43.Re6 1/2-1/2"},{"name":"Açılışlar-2","content":"[Event \"F/S Return Match\"]\n[Site \"Belgrade, Serbia JUG\"]\n[Date \"1992.11.04\"]\n[Round \"29\"]\n[White \"Fischer, Robert J.\"]\n[Black \"Spassky, Boris V.\"]\n[Result \"1/2-1/2\"]\n\n1.e4 e5 2.Nf3 Nc6 3.Bb5 {This opening is called the Ruy Lopez.} 3...a6\n4.Ba4 Nf6 5.O-O Be7 6.Re1 b5 7.Bb3 d6 8.c3 O-O 9.h3 Nb8 10.d4 Nbd7\n11.c4 c6 12.cxb5 axb5 13.Nc3 Bb7 14.Bg5 b4 15.Nb1 h6 16.Bh4 c5 17.dxe5\nNxe4 18.Bxe7 Qxe7 19.exd6 Qf6 20.Nbd2 Nxd6 21.Nc4 Nxc4 22.Bxc4 Nb6\n23.Ne5 Rae8 24.Bxf7+ Rxf7 25.Nxf7 Rxe1+ 26.Qxe1 Kxf7 27.Qe3 Qg5 28.Qxg5\nhxg5 29.b3 Ke6 30.a3 Kd6 31.axb4 cxb4 32.Ra5 Nd5 33.f3 Bc8 34.Kf2 Bf5\n35.Ra7 g6 36.Ra6+ Kc5 37.Ke1 Nf4 38.g3 Nxh3 39.Kd2 Kb5 40.Rd6 Kc5 41.Ra6\nNf2 42.g4 Bd3 43.Re6 1/2-1/2"},{"name":"qwe","content":"qwe"},{"name":"qwe1","content":"qwe1"},{"name":"qwe2","content":"qwceqwecq"}]}', 6960, 5, '2025-02-18 18:31:47.97', '2025-03-02 02:03:22.222', 'bb1f3d44-51c2-47af-90a4-950e32ce299e');


--
-- Data for Name: _LectureTags; Type: TABLE DATA; Schema: public; Owner: root
--



--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('1701b2c5-7a9a-4b57-a7a9-b3cf882f62f3', 'c2cef6c53b51e9fa369ba5758e7dc67f0bb715cdceb75c33c7c0e85d3906c875', '2025-03-09 05:16:42.368471+03', '20250306060540_init', NULL, NULL, '2025-03-09 05:16:42.262705+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('c2caad3b-b7a9-4348-a200-bc0b00f479aa', '9e414db2f95d016ef98922e4399e957e7c216a46c325db933367611a60866bc8', '2025-03-09 05:16:42.373595+03', '20250306110440_addresstitle', NULL, NULL, '2025-03-09 05:16:42.369706+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('b24c03e4-d9ef-42b8-8f6d-fe385b9b8cd9', 'b1463e266bd58d819c3354a2845d8fcd731085d4e4038b82793fd378479d3e91', '2025-03-09 05:16:42.37858+03', '20250306113936_', NULL, NULL, '2025-03-09 05:16:42.37479+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('d05dff45-b204-4111-9a96-db8164c07c3b', 'd6d9811ae89470f220995a07571ae6e53a18feb52d6dfb40f88aa4edc3bc99f0', '2025-03-09 05:16:42.384924+03', '20250306115632_', NULL, NULL, '2025-03-09 05:16:42.379893+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('021e0cf5-3c4a-4a46-8fc0-6d566de23350', 'ff7cdd3b29ae19466000c725d103d98ef0de7630fd8354eeb84de629fe8d3cbb', '2025-03-09 05:16:42.389752+03', '20250306115839_init', NULL, NULL, '2025-03-09 05:16:42.3861+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('6859ef7b-fdfc-4296-b0a1-9f58fa0d4411', 'e60fddf2a40e3a99bed1cdfb27fb9b2d844f70996ed846fb1037e5ac3bcc5577', '2025-03-09 05:16:42.394494+03', '20250306120231_init', NULL, NULL, '2025-03-09 05:16:42.390872+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('3e6e4543-5fd7-46a8-91c5-208ffe322db4', 'e0ba91e82c31d3825b0a90c8f09107fa637cd56d3828e326aa93d950784c238b', '2025-03-09 05:16:42.419165+03', '20250307203941_init', NULL, NULL, '2025-03-09 05:16:42.395662+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('cad5b39a-8eb9-4aa8-829c-eef27451c913', '798c77e9bef8305c79727f3ebd4acf77a6eefc29daaa46eb84719cb51dcee8c4', '2025-03-09 05:16:43.657951+03', '20250309021643_add_password_reset', NULL, NULL, '2025-03-09 05:16:43.623544+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('5d84931f-8006-427a-991f-7c039f6dc666', '165f179e38a00e33569b4123895eb250f20dd714ff0f2cb3e20016cf1ff19f86', '2025-02-09 21:07:27.581499+03', '20250209180727_init', NULL, NULL, '2025-02-09 21:07:27.519809+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('14a0f1ca-e1d1-477d-8c72-09525383880b', '17fb4cc44d193c8b4937ab7f9364af0665e625e89bdbb44e56fc2a43cdd17dae', '2025-02-09 21:27:58.96237+03', '20250209182758_discount', NULL, NULL, '2025-02-09 21:27:58.92675+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('2c24db8d-5a64-470c-92f9-3783d9ea1c13', 'f9c78d1714e6242b0f326652b5a1a9f674806894ab7141d0758c6b1417e91254', '2025-02-12 14:49:53.284346+03', '20250212114953_account', NULL, NULL, '2025-02-12 14:49:53.263167+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('dd1d0181-66dd-4e6d-b3fa-0eea7eeabbc8', '8ca78741b9134793554bbf6cab4083d0bc2db8e1d25a2666a51b645c4f0f89d2', '2025-02-09 21:29:52.657457+03', '20250209182952_status_boolean', NULL, NULL, '2025-02-09 21:29:52.65131+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('d2a48e6c-42f4-459d-9026-a1a551028e8f', 'c5f32a600c4a9e7e8844dd1bf24fc8c8debed95d19c152640e6174bd98e6bdcf', '2025-02-09 21:34:13.022409+03', '20250209183413_description', NULL, NULL, '2025-02-09 21:34:13.017526+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('0d9b590e-b6c1-4d71-8bd5-2c88c04bf3cd', '3760dbcfe61b4c0ba1f789254f72b9c34f3ca5cf079bd6a9d58e01cf4d4cfd4d', '2025-02-09 22:06:21.037552+03', '20250209190621_optionals', NULL, NULL, '2025-02-09 22:06:21.033772+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('9d6f6d84-ae94-41d3-8590-44e6544733de', '203b62ec4945a202fb20cf537cd00309f4a88bcc9a79cd583a973b355dba9be4', '2025-02-12 15:18:26.018232+03', '20250212121826_role', NULL, NULL, '2025-02-12 15:18:26.013451+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('7d4dde3f-0cab-408c-ac61-4d1188327fdd', 'eb00db15449f83d8af62ef3296dc6035665f73f1e4ea591f3290ebab58f505bb', '2025-02-09 23:26:03.926929+03', '20250209202603_int_decimal', NULL, NULL, '2025-02-09 23:26:03.913546+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('52a9d906-4667-4613-9052-611537be5f4f', 'c5262889de1cd97d7624cb5de02c4e77c2a9744b77c05a64d5e16a58329ce010', '2025-02-09 23:34:20.832688+03', '20250209203420_product_update', NULL, NULL, '2025-02-09 23:34:20.821982+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('3b04ea47-098a-4ff5-b475-9e72bba206ee', '8fd16972eb78dae48d66ddc0cf48bb3e91d4a6bce6ecdfd9303b515d7f65bf02', '2025-02-18 20:15:42.088982+03', '20250218171542_misc', NULL, NULL, '2025-02-18 20:15:42.080311+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('7486e432-eceb-4e50-a3c4-6f66a71094ac', 'e681e2f5bc9b6571a51e194d35800e96482168dacf57a422d331ac13a1e73842', '2025-02-10 00:41:16.123077+03', '20250209214116_productupdate', NULL, NULL, '2025-02-10 00:41:16.111033+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('bfa60210-cc88-4993-b1d5-cbd636b6f89e', '059d33313c7e89c1cecf5e3e7123c4da34058a5a7e20b6205774130a0656c9d0', '2025-02-13 05:36:31.363489+03', '20250213023631_video_pass', NULL, NULL, '2025-02-13 05:36:31.3586+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('0ff72a1e-86c3-475d-97cd-03d54db0ea73', 'c7c5221b2f3cf6a809d48ddd0981a946fe87d69a165222ee124b1f18389cfb95', '2025-02-10 13:33:15.037159+03', '20250210103315_cascade', NULL, NULL, '2025-02-10 13:33:15.030785+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('ae4f6349-4e83-4375-be8c-752929a16394', 'bf299fc2c0206947708e48a788e4921f45b9498d67ad1393d5b440d342b132ae', '2025-02-11 01:39:50.505255+03', '20250210223950_cascade', NULL, NULL, '2025-02-11 01:39:50.495689+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('477c9da1-8032-43e2-9c35-322c09840984', '374c718a2304a7237fd12f516b55f21768ee6b7bbe64f98c60f22a1d4fd20a7c', '2025-02-12 12:51:08.722244+03', '20250212095108_user', NULL, NULL, '2025-02-12 12:51:08.717731+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('4840b21d-3050-4ecc-bc5d-c38d26244e07', '938fb9042850353f7829d78bbbf0486d130cb274c49d3f012eb0e49916e72e51', '2025-02-13 20:07:43.834421+03', '20250213170743_order', NULL, NULL, '2025-02-13 20:07:43.82538+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('7627a4e8-b888-4124-aaa3-22ed0f75b5c2', '0d90097faa70ee1f3f73e34a6b9fa0b78acad92f464c17ab8c6683e286ecb0de', '2025-02-12 12:52:19.571677+03', '20250212095219_phone', NULL, NULL, '2025-02-12 12:52:19.567233+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('f3dc9564-5b9f-4f55-b2cc-27110232db78', '4c679160f6abec30d5e14ef264d609398d8d308e75ceab66f3ca89e9f35e37b0', '2025-02-12 12:53:16.946898+03', '20250212095316_nnames', NULL, NULL, '2025-02-12 12:53:16.942289+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('ea6174ab-0e8f-44a3-b7f2-cef2aea3e43c', '20d7c3a9d77cc970c6ccb2a18b381d58ac8db81fffb40f7b7c490e995dfb56c6', '2025-02-23 13:28:17.744952+03', '20250223102817_product_image', NULL, NULL, '2025-02-23 13:28:17.733892+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('4b813784-9904-4868-b2be-1834b4c03345', '8a4efb7c915b170d9aad5d5f94cfe858164f9adbe7e7b6a6b1a3cf201571c4ef', '2025-02-12 12:53:46.829199+03', '20250212095346_map', NULL, NULL, '2025-02-12 12:53:46.82095+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('27c52e21-fe72-4c3f-ae3b-860732047be8', '795ce29fe41a2712b7f09ca7deab679419a69bb99352e427d10c60230d4482a2', '2025-02-13 22:44:02.351171+03', '20250213194402_purchase_id', NULL, NULL, '2025-02-13 22:44:02.293091+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('cb958257-59be-4684-8ed4-8c2e5a9b4612', '2ee388845bb44e17dcb96ebaf7f9f7f9516cefa34161cec2036035a5ff9da823', '2025-02-18 22:23:45.487509+03', '20250218192345_discount', NULL, NULL, '2025-02-18 22:23:45.482194+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('ea2afe12-0987-4f61-b1bc-90c5d056886d', '81607a5337184efee1c3bd377e0b6c7cbf5b5b89b96bb2e59ecb888bef69eb81', '2025-02-17 16:13:54.11625+03', '20250217131354_files', NULL, NULL, '2025-02-17 16:13:54.059706+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('6b631dcc-a92c-4cd5-a93d-9ff5369422c5', 'b7d01c742b3d026cd759e8783dddb77b009037004cc49471cab082aa6cf0b76a', '2025-02-17 18:24:20.617693+03', '20250217152420_auto', NULL, NULL, '2025-02-17 18:24:20.607254+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('89477cfd-b85f-4a12-a459-907597c7dd13', '4f2bdc1eb9b1a69749d4b63f410bd8239b11cda9e393f57957f95fba76bcaa77', '2025-02-20 09:23:58.877121+03', '20250220062358_cascade_2', NULL, NULL, '2025-02-20 09:23:58.870184+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('17d6daa6-7b87-4762-aa2a-398671015659', 'aa8681b4bbbb8985438bd4d5e5678a4384b008a7541ca90506f5ad21f28a5e02', '2025-02-17 19:53:37.480593+03', '20250217165337_cascade_file', NULL, NULL, '2025-02-17 19:53:37.474343+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('84284d6c-0733-4065-a54f-2185d9e9007c', '9a4380e2ce24e160c7bfd51f327ad7b2696e0be1267e78d96f1d4898e575dd34', '2025-02-19 22:06:43.86138+03', '20250219190643_beta', NULL, NULL, '2025-02-19 22:06:43.830101+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('90c9fbe2-156a-4174-884b-75ba49dfc66f', 'd30db78b15886dc8b20e9eda5154123047e35f06ef89a3f857836313d01dafa7', '2025-02-17 21:21:56.407916+03', '20250217182156_lecture', NULL, NULL, '2025-02-17 21:21:56.403606+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('f920b15e-ae52-4dec-a6fd-65f0c4e8a3de', 'a9fc79163ba19cb685b09ef03da77fbda236a74df45edee48a133d8849cc08af', '2025-02-19 23:08:14.557323+03', '20250219200814_resource', NULL, NULL, '2025-02-19 23:08:14.551897+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('419cc592-2bb9-4ca9-9f47-8764cc8957c5', 'b08680ad607c5218fdbe41ecdf0b472c6af9216ccf4a6e3c0e6acbf5b211ad67', '2025-02-19 23:14:25.407193+03', '20250219201425_resources_name', NULL, NULL, '2025-02-19 23:14:25.402324+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('d97ec4b9-80d0-40c2-a86d-755b6cbf73b2', '68842ff8041ad316d54068ee6b0b4b78bfeb946ef5152f508902fbf2dcf256cd', '2025-02-22 06:09:25.12157+03', '20250222030925_tags', NULL, NULL, '2025-02-22 06:09:25.049244+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('793f0977-f45b-47b4-82df-8e2e775d46ae', 'a2361657724c5589722a4a7da02d8154ca00e1d571c04f761496fdc20b8593b3', '2025-02-20 09:17:36.71295+03', '20250220061736_cascade', NULL, NULL, '2025-02-20 09:17:36.7045+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('238ea6c6-3868-440b-8f22-99e33cf1e6e8', 'a50f7d647808f256fd35b4e68322c88600a2893ce76bf4600b40db5209e06cf7', '2025-02-22 07:06:00.356474+03', '20250222040600_granted_at', NULL, NULL, '2025-02-22 07:06:00.351128+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('51265e73-2261-4407-b37f-b09b61ea003d', 'ed42aa18b13abb019ff89ccf5bfd349ce8ff220e01af6f7761b2c7e7ee7896b6', '2025-02-23 19:04:24.918888+03', '20250223160424_namingfix', NULL, NULL, '2025-02-23 19:04:24.900125+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('5456eb52-f82c-4147-b3ae-c344e0069570', '4a30b439056e6fde5a6a53fa7e2b2c1939d564871d62a6c514dcf9aa3b317a73', '2025-02-24 00:53:54.748239+03', '20250223215354_min_max_elo_pages', NULL, NULL, '2025-02-24 00:53:54.730181+03', 1);


--
-- Data for Name: user_accounts; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.user_accounts (id, email, phone, first_name, last_name, password, role, created_at, updated_at, "idNumber") VALUES ('7bf440f9-ff8a-48ed-995f-4dcbcf37e9b9', 'lord_aurain@hotmail.com', '+905396706753', 'Emre', 'Yılmaz', '$2a$10$RNvAJIYEayxk52/rvyEZsOfjnADK7yXcPc.UAEGNI9G7H2HV9ERZu', 'user', '2025-03-09 02:21:27.555', '2025-03-09 02:22:02.617', '50518098556');
INSERT INTO public.user_accounts (id, email, phone, first_name, last_name, password, role, created_at, updated_at, "idNumber") VALUES ('3e315cfc-8a0d-4bd4-b845-74592ce84ec7', 'abdurrahmanemreyilmaz@gmail.com', '05396706753', 'Emre', 'Yılmaz', '$2a$10$NLGnh/bSwTJrfZPZ/MbuHuaK9kRfbh4TX9Wv.TNXRtUbYyYprWyBC', 'gm', '2025-02-12 11:57:11.24', '2025-03-09 04:49:23.09', NULL);
INSERT INTO public.user_accounts (id, email, phone, first_name, last_name, password, role, created_at, updated_at, "idNumber") VALUES ('039c4053-e40d-49aa-a100-76bd04b4b8c1', 'burakuysal3455@gmail.com', '+905070841294', 'Burak', 'UYSAL', '$2a$10$i2mqBXuBjjlKqMJdr5pQr.GMIAqjKJibfz5odJKfhOz/GwVq2VQE.', 'gm', '2025-02-23 18:00:43.321', '2025-03-09 06:31:52.963', NULL);
INSERT INTO public.user_accounts (id, email, phone, first_name, last_name, password, role, created_at, updated_at, "idNumber") VALUES ('6106ca80-6b15-48ef-baad-8af3e1f399e4', 'gmvahapcom1998@gmail.com', '+905333539237', 'Vahap', 'Şanal', '$2a$10$kjghpqz7zOrAFJZBB2g1Te.MyEEx4ifbXREoWoh6SZ.9F9aLVM9qm', 'gm', '2025-02-13 17:52:37.087', '2025-03-09 06:32:42.354', NULL);


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.carts (id, user_id, token, status, "totalPrice", created_at, updated_at) VALUES ('fe454aea-e642-4d8a-b133-6d0e13c62238', '7bf440f9-ff8a-48ed-995f-4dcbcf37e9b9', 'a4b9ab1c-4694-445d-9975-a15e226c8cde', 'PENDING', 1400, '2025-03-09 02:22:02.952', '2025-03-09 02:22:02.952');


--
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.cart_items (id, cart_id, product_id, price, "accountId") VALUES ('9845b924-e6aa-442d-8bdd-661ca1aaa81d', 'fe454aea-e642-4d8a-b133-6d0e13c62238', '8d17eb7a-f856-418a-9170-e35aab014d2a', 1400, NULL);


--
-- Data for Name: event_tickets; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.event_tickets (id, name, date, location, url, capacity, sold, product_id) VALUES ('a66ba345-547a-4c08-a0e0-72564403e243', 'qwe', '2025-02-28 06:39:00', NULL, 'qcqwecq', 32, 0, '30d733e8-55ec-42f3-a9d8-de96a6307660');
INSERT INTO public.event_tickets (id, name, date, location, url, capacity, sold, product_id) VALUES ('83689165-9c64-47ae-8e36-1585db35caf5', 'Yeni Bilet', '2025-03-13 08:26:00', 'qvweqvqwv', 'qwecqwecq', 40, 0, '156366e3-2116-4288-9eaf-90e79579dad4');
INSERT INTO public.event_tickets (id, name, date, location, url, capacity, sold, product_id) VALUES ('6e91e304-caa8-4268-b845-69f5beb7a1a5', 'Yeni Bilet 2 - Workshop', '2025-03-26 23:30:00', 'Kadıköy Cafe', NULL, 32, 0, '405606f0-38d4-46b2-b8fd-0e61cda2b4b0');


--
-- Data for Name: files; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.files (id, filename, path, mimetype, size, created_at, lecture_id, product_id) VALUES (8, 'thumbnail_main.jpg', '/resources/egitimler/c9771da4-4453-4c1f-92c8-af1ecb7cfd1a/image-1.jpg', 'image/jpeg', 49646, '2025-02-17 23:57:54.132', 'c9771da4-4453-4c1f-92c8-af1ecb7cfd1a', NULL);
INSERT INTO public.files (id, filename, path, mimetype, size, created_at, lecture_id, product_id) VALUES (10, 'thumbnail_main.jpg', '/resources/egitimler/1a14a9fe-2330-43ee-b49e-e8f90d407009/image-1.jpg', 'image/jpeg', 49646, '2025-02-18 18:31:48.099', '1a14a9fe-2330-43ee-b49e-e8f90d407009', NULL);
INSERT INTO public.files (id, filename, path, mimetype, size, created_at, lecture_id, product_id) VALUES (14, 'thumbnail_main.jpg', '/resources/egitimler/f6e3f8f4-090c-4377-807c-45f1414aef25/image-1.jpg', 'image/jpeg', 49646, '2025-02-21 19:41:46.563', 'f6e3f8f4-090c-4377-807c-45f1414aef25', NULL);
INSERT INTO public.files (id, filename, path, mimetype, size, created_at, lecture_id, product_id) VALUES (15, 'thumbnail_main.jpg', '/resources/egitimler/45ec24c4-1372-4682-a9da-7fc78ac044f1/image-1.jpg', 'image/jpeg', 49646, '2025-02-21 22:15:46.542', '45ec24c4-1372-4682-a9da-7fc78ac044f1', NULL);
INSERT INTO public.files (id, filename, path, mimetype, size, created_at, lecture_id, product_id) VALUES (17, 'thumbnail_main.jpg', '/resources/urunler/78c4e500-9b64-48ff-84df-b96c8723e1b7/image-1.jpg', 'image/jpeg', 49646, '2025-02-23 11:20:03.814', NULL, '78c4e500-9b64-48ff-84df-b96c8723e1b7');


--
-- Data for Name: lecture_resources; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.lecture_resources (id, lecture_id, type, name, url, content) VALUES ('581ff9af-0188-4657-ae7a-fb8b2a6b4109', '1a14a9fe-2330-43ee-b49e-e8f90d407009', 'pgn', 'Açılışlar-3', NULL, '[Event "F/S Return Match"]
[Site "Belgrade, Serbia JUG"]
[Date "1992.11.04"]
[Round "29"]
[White "Fischer, Robert J."]
[Black "Spassky, Boris V."]
[Result "1/2-1/2"]

1.e4 e5 2.Nf3 Nc6 3.Bb5 {This opening is called the Ruy Lopez.} 3...a6
4.Ba4 Nf6 5.O-O Be7 6.Re1 b5 7.Bb3 d6 8.c3 O-O 9.h3 Nb8 10.d4 Nbd7
11.c4 c6 12.cxb5 axb5 13.Nc3 Bb7 14.Bg5 b4 15.Nb1 h6 16.Bh4 c5 17.dxe5
Nxe4 18.Bxe7 Qxe7 19.exd6 Qf6 20.Nbd2 Nxd6 21.Nc4 Nxc4 22.Bxc4 Nb6
23.Ne5 Rae8 24.Bxf7+ Rxf7 25.Nxf7 Rxe1+ 26.Qxe1 Kxf7 27.Qe3 Qg5 28.Qxg5
hxg5 29.b3 Ke6 30.a3 Kd6 31.axb4 cxb4 32.Ra5 Nd5 33.f3 Bc8 34.Kf2 Bf5
35.Ra7 g6 36.Ra6+ Kc5 37.Ke1 Nf4 38.g3 Nxh3 39.Kd2 Kb5 40.Rd6 Kc5 41.Ra6
Nf2 42.g4 Bd3 43.Re6 1/2-1/2');
INSERT INTO public.lecture_resources (id, lecture_id, type, name, url, content) VALUES ('ec103bce-719e-47a4-9655-54d8cc589805', '1a14a9fe-2330-43ee-b49e-e8f90d407009', 'pgn', 'Açılışlar-2', NULL, '[Event "F/S Return Match"]
[Site "Belgrade, Serbia JUG"]
[Date "1992.11.04"]
[Round "29"]
[White "Fischer, Robert J."]
[Black "Spassky, Boris V."]
[Result "1/2-1/2"]

1.e4 e5 2.Nf3 Nc6 3.Bb5 {This opening is called the Ruy Lopez.} 3...a6
4.Ba4 Nf6 5.O-O Be7 6.Re1 b5 7.Bb3 d6 8.c3 O-O 9.h3 Nb8 10.d4 Nbd7
11.c4 c6 12.cxb5 axb5 13.Nc3 Bb7 14.Bg5 b4 15.Nb1 h6 16.Bh4 c5 17.dxe5
Nxe4 18.Bxe7 Qxe7 19.exd6 Qf6 20.Nbd2 Nxd6 21.Nc4 Nxc4 22.Bxc4 Nb6
23.Ne5 Rae8 24.Bxf7+ Rxf7 25.Nxf7 Rxe1+ 26.Qxe1 Kxf7 27.Qe3 Qg5 28.Qxg5
hxg5 29.b3 Ke6 30.a3 Kd6 31.axb4 cxb4 32.Ra5 Nd5 33.f3 Bc8 34.Kf2 Bf5
35.Ra7 g6 36.Ra6+ Kc5 37.Ke1 Nf4 38.g3 Nxh3 39.Kd2 Kb5 40.Rd6 Kc5 41.Ra6
Nf2 42.g4 Bd3 43.Re6 1/2-1/2');


--
-- Data for Name: pages; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.pages (id, slug, title, description, content, status, "order", created_at, updated_at) VALUES ('550e8400-e29b-41d4-a716-446655440001', 'sss', 'Sıkça Sorulan Sorular', 'Sıkça sorulan soruların cevapları.', '## SSS

**S: Bu siteyi nasıl kullanabilirim?**

C: Sadece kaydolun ve keşfedin!', true, 2, '2024-02-22 10:05:00', '2025-02-23 22:24:58.345');
INSERT INTO public.pages (id, slug, title, description, content, status, "order", created_at, updated_at) VALUES ('550e8400-e29b-41d4-a716-446655440000', 'hakkimda', 'Hakkımda', 'Vahap Şanal hakkında biyografik bilgiler.', 'Merhaba,ben GM Vahap Şanal. 6 yaşından beri satranç oynuyorum. Şu an 26 yaşındayım ve ülkemizi birçok kez A Milli Takım''da oynayarak temsil ettim.

Sizlerle yıllar içinde profesyonel kariyerimde öğrendiğim bilgileri paylaşabilmek için buradayım.

### Kariyerimdeki başarılar:
* En yüksek ulaştığım FIDE ratingi: 2608
* 2019-2020 ve 2024 yıllarında Türkiye Satranç Şampiyonluğu
* 2023 FIDE Dünya Kupası''nda 4. tura kadar ilerleyerek ülkemizde bu turnuvada elde edilen en iyi sonuca ulaştım.
* 2022 Türkiye Satranç Süper Ligi''nin birinci masasında 9/12 puan ve 2796 elo performansıyla birincilik
* 2018 Avrupa Hızlı ve Yıldırım Satranç Şampiyonası''nda 3.''lük
* 2017 ve 2019 yıllarında Lienz Open turnuvasında 1.''lik
* 2021 Fagernes Open turnuvasında 1.''lik
* Dünya 16 Yaş Altı Satranç Olimpiyatı''nda birinci masa 1.''liği', true, 1, '2024-02-22 10:00:00', '2025-02-23 23:13:43.65');
INSERT INTO public.pages (id, slug, title, description, content, status, "order", created_at, updated_at) VALUES ('550e8400-e29b-41d4-a716-446655440002', 'iletisim', 'İletişim', '', '', true, 3, '2025-03-09 09:37:29.667', '2025-03-09 06:37:41.651');


--
-- Data for Name: products_lectures; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.products_lectures (product_id, lecture_id) VALUES ('78c4e500-9b64-48ff-84df-b96c8723e1b7', '1a14a9fe-2330-43ee-b49e-e8f90d407009');
INSERT INTO public.products_lectures (product_id, lecture_id) VALUES ('78c4e500-9b64-48ff-84df-b96c8723e1b7', '45ec24c4-1372-4682-a9da-7fc78ac044f1');
INSERT INTO public.products_lectures (product_id, lecture_id) VALUES ('78c4e500-9b64-48ff-84df-b96c8723e1b7', 'c9771da4-4453-4c1f-92c8-af1ecb7cfd1a');
INSERT INTO public.products_lectures (product_id, lecture_id) VALUES ('78c4e500-9b64-48ff-84df-b96c8723e1b7', 'f6e3f8f4-090c-4377-807c-45f1414aef25');


--
-- Data for Name: purchases; Type: TABLE DATA; Schema: public; Owner: root
--



--
-- Data for Name: user_addresses; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.user_addresses (id, city, country, address, zip_code, created_at, updated_at, title, user_id, full_name) VALUES ('acb148d2-c3af-4be9-b153-88fd677a0f1f', 'İstanbul', 'Türkiye', 'Mevlanakapı mah. Topkapı Karakol sok. Gündeş Apt. A blok No 22 Dr 2
Gündeş Apt. A Blok', NULL, '2025-03-09 02:22:02.658', '2025-03-09 02:22:02.658', 'Ev', '7bf440f9-ff8a-48ed-995f-4dcbcf37e9b9', 'Emre Yılmaz');


--
-- Data for Name: user_lecture_access; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.user_lecture_access (user_id, lecture_id, granted_at) VALUES ('3e315cfc-8a0d-4bd4-b845-74592ce84ec7', '1a14a9fe-2330-43ee-b49e-e8f90d407009', '2025-02-23 17:29:00.443');
INSERT INTO public.user_lecture_access (user_id, lecture_id, granted_at) VALUES ('039c4053-e40d-49aa-a100-76bd04b4b8c1', '45ec24c4-1372-4682-a9da-7fc78ac044f1', '2025-02-23 18:01:19.353');
INSERT INTO public.user_lecture_access (user_id, lecture_id, granted_at) VALUES ('039c4053-e40d-49aa-a100-76bd04b4b8c1', 'c9771da4-4453-4c1f-92c8-af1ecb7cfd1a', '2025-02-23 18:05:37.45');
INSERT INTO public.user_lecture_access (user_id, lecture_id, granted_at) VALUES ('039c4053-e40d-49aa-a100-76bd04b4b8c1', '1a14a9fe-2330-43ee-b49e-e8f90d407009', '2025-02-23 18:07:14.501');
INSERT INTO public.user_lecture_access (user_id, lecture_id, granted_at) VALUES ('3e315cfc-8a0d-4bd4-b845-74592ce84ec7', 'f6e3f8f4-090c-4377-807c-45f1414aef25', '2025-02-23 21:12:44.262');
INSERT INTO public.user_lecture_access (user_id, lecture_id, granted_at) VALUES ('3e315cfc-8a0d-4bd4-b845-74592ce84ec7', '45ec24c4-1372-4682-a9da-7fc78ac044f1', '2025-02-23 21:12:44.262');
INSERT INTO public.user_lecture_access (user_id, lecture_id, granted_at) VALUES ('3e315cfc-8a0d-4bd4-b845-74592ce84ec7', 'c9771da4-4453-4c1f-92c8-af1ecb7cfd1a', '2025-02-23 21:12:44.262');
INSERT INTO public.user_lecture_access (user_id, lecture_id, granted_at) VALUES ('039c4053-e40d-49aa-a100-76bd04b4b8c1', 'f6e3f8f4-090c-4377-807c-45f1414aef25', '2025-03-09 06:31:52.762');


--
-- Data for Name: user_pass_tokens; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.user_pass_tokens (token, user_id, expires_at) VALUES ('7e7b32cc2837f0442aa6e56479b1d8e68e281a859620e80487217d9413c3ba10', '7bf440f9-ff8a-48ed-995f-4dcbcf37e9b9', '2025-03-09 03:38:54.301');
INSERT INTO public.user_pass_tokens (token, user_id, expires_at) VALUES ('a18b1ab32e88e7ed14107f879d93fb25283e6456bb9d6cd529f89868dfb2915e', '3e315cfc-8a0d-4bd4-b845-74592ce84ec7', '2025-03-09 06:19:42.825');


--
-- Name: files_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.files_id_seq', 17, true);


--
-- Name: lectures_order_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.lectures_order_seq', 9, true);


--
-- Name: pages_order_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.pages_order_seq', 3, true);


--
-- Name: products_order_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.products_order_seq', 20, true);


--
-- PostgreSQL database dump complete
--

