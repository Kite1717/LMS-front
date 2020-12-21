import React, { useMemo ,useState} from "react";
import { useHtmlClassService } from "../../_core/MetronicLayout";
import { Modal, Button } from "react-bootstrap";
export function Footer() {
  const today = new Date().getFullYear();
  const uiService = useHtmlClassService();

  const handleClose = () => setShowKVK(false);
  const [showKVK, setShowKVK] = useState(false);

  const layoutProps = useMemo(() => {
    return {
      footerClasses: uiService.getClasses("footer", true),
      footerContainerClasses: uiService.getClasses("footer_container", true),
    };
  }, [uiService]);

  return (
    <div
      className={`footer bg-white py-4 d-flex flex-lg-column  ${layoutProps.footerClasses}`}
      id="kt_footer"
    >
      <div
        className={`${layoutProps.footerContainerClasses} d-flex flex-column flex-md-row align-items-center justify-content-between`}
      >
        <div className="text-dark order-2 order-md-1">
          <span className="text-muted font-weight-bold mr-2">
            {today.toString()}
          </span>{" "}
         
          <a
            
            onClick = {()=>{
              setShowKVK(true)
            }}
          
            rel="noopener noreferrer"
            className="text-dark-75 text-hover-primary"
          >
            KVKK Metni
             </a>
            <Modal scrollable={true} size="lg" show={showKVK}>
          <Modal.Header closeButton>
            <Modal.Title>{/* NESS */} KVKK METNİ</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca,
            Şirketimiz tarafından, Veri Sorumlusu sıfatıyla, kişisel
            verileriniz, iş amaçlarıyla bağlı olarak, aşağıda açıklandığı
            çerçevede kullanılmak, kaydedilmek, saklanmak, güncellenmek,
            aktarılmak ve/veya sınıflandırılmak suretiyle işlenecektir.
            <br />
            <br />
            <br />
            Bu kapsamda Şirketimiz tarafından başta özel hayatın gizliliği olmak
            üzere, kişilerin temel hak ve özgürlüklerini korumak ve kişisel
            verilerin korunması amacıyla düzenlenen Kanun ve Yönetmelikler
            gereğince Şirketimiz, kişisel verilerinizin hukuka aykırı olarak
            işlenmesini önleme, hukuka aykırı olarak erişilmesini önleme ve
            muhafazasını sağlama amacıyla, uygun güvenlik düzeyini temin etmeye
            yönelik tüm teknik ve idari tedbirleri almaktadır.
            <br />
            <br />
            <br />
            Bu metnin hedef kitlesi, Şirketimiz çalışanları veya Şirketimize iş
            başvurusu yapmış olan çalışan adayları dışındaki, Şirketimiz
            tarafından kişisel verileri işlenen tüm gerçek kişilerdir.
            <br />
            <br />
            <br />
            Veri sorumlusu sıfatıyla işlenen kişisel verilere, burada
            belirtilenlerle sınırlı sayıda olmamak üzere aşağıda yer
            verilmektedir:
            <br />
            <br />
            <br />
            İsim, soy isim, şirket sicil numarası, sağlık verileri, T.C. kimlik
            numarası, adres, telefon numarası, e-posta adresi, imza, fiziksel
            mekan/güvenlik görüntü kaydı, çağrı merkezi/hizmet kalitesi ses
            kaydı, banka hesap numarası, cookie kayıtları,
            <br />
            <br />
            <br />
            <b>Kişisel verilerin işlenme amaçları ve hukuki sebepleri;</b>{" "}
            <br /> Tarafınızca paylaşılan kişisel verileriniz;
            <br />
            • Şirketimiz tarafından sunulan ürün ve hizmetlerden sizleri ve/veya
            temsil ettiğiniz kurum ve kuruluşları faysslandırmak için,
            Şirketimizin ticari ve iş stratejilerinin belirlenmesi ve
            uygulanması, pazarlama faaliyetlerinin yapılması, iş geliştirme ve
            planlama faaliyetlerinin gerçekleştirilmesi dahil ve fakat bunlarla
            sınırlı olmamak üzere gerekli çalışmaların yürütülmesi,
            <br />
            • Şirketimiz tarafından yürütülen iletişime yönelik idari
            operasyonların yürütülmesi,
            <br />
            • Şirketimizin kullanımda olan lokasyonların fiziksel güvenliğinin
            ve denetiminin sağlanması,
            <br />
            • İş ortağı/müşteri/tedarikçi (yetkili veya çalışanları)
            ilişkilerinin kurulması,
            <br />
            • İş ortaklarımız, tedarikçilerimiz veya sair üçüncü kişilerle
            birlikte sunulan ürün ve
            <br />
            hizmetlere ilişkin sözleşme gereklerinin ve finansal mutabakatın
            sağlanması,
            <br />
            • Şirketimizin insan kaynakları politikalarının yürütülmesi,
            <br />
            • Şirketimizin çağrı merkezinin aranması veya internet sayfasının
            kullanılması ve/veya
            <br />
            • Şirketimizin düzenlediği eğitim, seminer veya organizasyonlara
            katılım sağlanması amacıyla işlenecektir.
            <br />
            <br />
            <br />
            <b>Kişisel verilerin toplanma ve saklanma yöntemi; </b> Şirketimizle
            paylaştığınız kişisel verileriniz, otomatik ya da otomatik olmayan
            yöntemlerle, ofisler, şubeler, çağrı merkezi, internet sitesi,
            sosyal medya mecraları, mobil uygulamalar ve benzeri vasıtalarla
            sözlü, yazılı ya da elektronik olarak toplanabilir. Kişisel
            verileriniz elektronik ve/veya fiziksel ortamlarda saklanacaktır.
            <br />
            <br />
            <br />
            Şirketimiz tarafından temin edilen ve saklanan kişisel verilerinizin
            saklandıkları ortamlarda yetkisiz erişime maruz kalmamaları,
            manipülasyona uğramamaları, kaybolmamaları ve zarar görmemeleri
            amacıyla gereken iş süreçlerinin tasarımı ile teknik güvenlik
            altyapı geliştirmeleri uygulanmaktadır.
            <br />
            <br />
            <br />
            Kişisel verileriniz, size bildirilen amaçlar ve kapsam dışında
            kullanılmamak kaydı ile gerekli tüm bilgi güvenliği tedbirleri de
            alınarak işlenecek ve yasal saklama süresince veya böyle bir süre
            öngörülmemişse işleme amacının gerekli kıldığı süre boyunca
            saklanacak ve işlenecektir. Bu süre sona erdiğinde, kişisel
            verileriniz silinme, yok edilme ya da anonimleştirme yöntemleri ile
            Şirketimizin veri akışlarından çıkarılacaktır.
            <br />
            <br />
            <br />
            <b> Kişisel Verilerin aktarılması;</b>
            Kişisel verileriniz, Kanunlar ve sair mevzuat kapsamında ve
            açıklanan amaçlarla;
            <br />
            • Yetki vermiş olduğumuz, Şirketimiz nam ve hesabına faaliyette
            bulunan şirketler, temsilcilerimize,
            <br />
            • Düzenleyici ve denetleyici kurumlara, kişisel verilerinizi tabi
            olduğu kanunlarında açıkça talep etmeye yetkili olan kamu kurum veya
            kuruluşlara,
            <br />
            • Belirtilen amaçlar kapsamında iş ortaklıkları, tedarikçi ve
            yüklenici şirketler, bankalar ve sair gerçek veya tüzel kişilere,
            <br />
            • Vergi ve benzeri danışmanlara, yasal takip süreçleri ile ilgili
            zorunlu kişilere, kurum ve kuruluşlara ve denetimciler de dâhil
            olmak üzere danışmanlık aldığımız üçüncü
            <br />
            kişilere ve bunlarla sınırlı olmaksızın, yurt içinde ve yurt
            dışında, yukarıda belirtilen amaçlarla iş ortakları, hizmet alınan
            üçüncü kişi, yetkilendirilen kişi ve kuruluşlara aktarılabilecektir.
            <br />
            <br />
            <br />
            <b>KVKK’nın 11. maddesi gereği haklarınız;</b> Şirketimize
            başvurarak, kişisel verilerinizin;
            <br />
            1. İşlenip işlenmediğini öğrenme,
            <br />
            2. İşlenmişse bilgi talep etme,
            <br />
            3. İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını
            öğrenme,
            <br />
            4. Yurt içinde / yurt dışında aktarıldığı 3. kişileri bilme,
            <br />
            5. Eksik / yanlış işlenmişse düzeltilmesini isteme,
            <br />
            6. KVKK’nın 7. maddesinde öngörülen şartlar çerçevesinde silinmesini
            / yok edilmesini isteme,
            <br />
            7. Aktarıldığı 3. kişilere yukarıda sayılan (e) ve (f) bentleri
            uyarınca yapılan işlemlerin bildirilmesini isteme,
            <br />
            8. Münhasıran otomatik sistemler ile analiz edilmesi nedeniyle
            aleyhinize bir sonucun ortaya çıkmasına itiraz etme,
            <br />
            9. Kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde
            zararın giderilmesini talep etme haklarına sahipsiniz.
            <br />
            KVK Kanunu’nun 13. maddesinin 1. fıkrası gereğince, yukarıda
            belirtilen haklarınızı kullanmak ile ilgili talebinizi, yazılı
            olarak veya Kişisel Verileri Koruma Kurulu’nun belirlediği diğer
            yöntemlerle Şirketimize iletebilirsiniz.
            <br /> <br />
            <br />
            Yukarıda belirtilen haklarınızı kullanmak için kimliğinizi tespit
            edici gerekli bilgiler ile talep dilekçenizi bizzat elden teslim
            edebilir, noter kanalıyla veya Kişisel Verileri Koruma Kurulu
            tarafından belirlenen diğer yöntemler ile gönderebilir. {/* veya
            nessisletmecilik@hs02.kep.tr adresine güvenli elektronik imzalı
            olarak iletebilirsiniz. */}
            <br />{" "}
          </Modal.Body>
          <Modal.Footer>
            
            <button  class="btn btn-primary" onClick={handleClose}>
             Kapat
            </button>
          </Modal.Footer>
        </Modal>
         
        </div>
        <div className="nav nav-dark order-1 order-md-2"></div>
      </div>
    </div>
  );
}
