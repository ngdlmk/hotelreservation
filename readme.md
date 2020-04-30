1. api ve client klasörü altında npm install komutunu çalıştır.
2. api server çalıştırmak için api klasörü altından node index.js komutunu çalıştır
3. react projesini çalıştırmak için client klasörü altında yarn start veya npm start yap
4. admin paneline gitmek için adress satırına http://localhost:9000/admin gir
5. kullanıcı adı: admin şifre: admin

-----Notlar------
mongo db kullandım kullandığım mongodb atlas üzerinde ve deneyebilmek için ip adresinizi white liste girmem gerek


----Eksik Taraflar----
Her ne kadar test case olsa da baya zaman gerektiren birşey çünkü birçok detay var halledilmesi gereken
1.) tokenların daha etkin kullanılması
2.) mongodb index ve performans ayarlamalarının yapılması
3.) arayüze her ne kadar zaman haracamamaya çalışsam da en basit hali bile oldukça zaman alıcıydı
4.) çok daha iyi arama algoritmaları eklenebilirdi.
5.) check-in check-out tarihlerinin otellere göre doluluklarının kontrol edilmesi 
6.) arama kısmında pagination yapılması