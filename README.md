Sistemin daha hızlı ve kolay kurulması açısından şimdilik sadece web uygulaması şeklinde yapabiliriz. İleride zaman/ihtiyaç olursa ios/android uygulamaları yazılır. Bu aşamada telefondan data girmek isteyen telefondaki tarayıcı üzerinden sisteme giriş yapar.
Gönderidğiniz linkten benim anladığım sistem şu şekilde kurulabilir:
3 farklı rol olur: Admin (dernek yöneticileri), Hemşire, Hoca. Herkes sisteme kendi mail adresi/şifresi ile girer, o mail adresine atanmış role göre ekran görür.

Adminin yapabilecekleri:

    Hemşire/Hoca/Hasta/Admin ekleme, bunları listeleme/arama,
    hemşirelere hasta atama (ya da hastalara hemşire atama),
    hemşirelerin yazdığı raporları listeleyebilme, seçilen hastaya yazılmış raporları listeleyebilme vb.. (rapordan kastım hastanın kilosu, cihaz durumu vs. form bilgileri)

Hemşirenin yapabilecekleri:

    Kendisine atanmış hastalara ait adres/telefon vb. bilgileri görebilme
    Hastalarına daha önce yazılmış raporları görebilme
    Hastalara yeni rapor yazabilme.

Hocalar:

    Sistemde kayıtlı tüm hastaları listeleyebilir/arayabilir/excele aktarabilir
    Hastalar için rapor yazabilir
    Hemşirelerin hastalara yazdıkları raporların detaylı listesini excele aktarabilir.

----- TABLOLAR ------

KİŞİLER
    adı
    soyadı
    tc
    telefon
    adres
    rol : hasta / admin / hemşire / hoca
    not
    durum: ayrıldı/ara verdi/devam ediyor

HASTA_ATAMA
    hasta_id
    ilgili_kisi_id
    tarih
    atayan_kisi

RAPORLAR
    hasta_id
    yazar_id
    rapor_tarihi
    kilo vs..



# ------------- ATOMİC DESİGN NOTLARI
- Material ui componentleri kullanacaksan ve sonradan bunları değiştirme düşüncen yoksa, bunları atomların içine sarmak mantıksız. Molekül-organizm içinde doğrudan kullan. Bunlar zaten hazır atomlar.
- 

# ---- TO DO

-   Hastanın değişmeyen bilgilerinin girileceği/editleneceği ekran yap: ilk yakınma tarihi, sosyo-ekonomik durumu vs. bilgiler.
-   Cihaz envanteri sabit bilgilere eklensin. 
-   Yeni rapor yazma ekranına form ekle
-   hemşire-hoca ekranları 
-   detaylı rapor inputları
-   excele aktarmalar
-   kisi ve rapor filtreleme-süzme işlemleri
-   tasarım - responsive mi
-   Yeni kullanıcı eklerken mail-şifre de yazmalıyız ki o kişi login olabilsin.
-   Sorulacak: hemşire sadece kendi yazdığı raporları mı görsün yoksa kendi hastalarına yazılan tüm raporları - başkası yazmış olsa bile - görsün mü?
-   pagination
-   scroll bar biraz büyük olsun, aşağı çekilemiyor.

# ---- SORUNLAR---
-   rapor yazarken iletişim yöntemi diğer seçilince bunu rapor ekranına getirmiyor.
-   raporlar sekmesini seçince güncel raporları çekmiyor
-   kullanıcı adı-şifre hatalıysa düzgün uyarı versin. Şimdi kırmızı hata ekranı geliyor.
-   Beni hatırla butonu
-   Token'ı locale stora'a yaz, her rapora-sayfaya girişye login ekranı gelmesin. 
-   kişiyi seçince sol tarafta bilgileri gelene kadar loading dönsün.
