import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
import "./BeforeVisualExamPage.scss";

export const BeforeVisualExamPage = ({ history, location }) => {
  const [formAgree, setFormAgree] = React.useState(false);
  console.log(location.state.ExamCode, "loccccc")
  return (
    <>
      <div className="kt-portlet__header">
        <div className="kt-portlet__header_item">Form</div>
        {/* <div className="kt-portlet__header_item">
          <Button variant="warning">Geri Dön</Button>
        </div> */}
      </div>
      <div className="kt-portlet__body">
        <h2>Sayın Katılımcı</h2>
        <h3>Sınav Kuralları aşağıda bilgilerinize sunulmuştur.</h3>
        <ul>
          <li>
            1. Sınav öncesinde bilgisayarınızın açık olduğundan, klavye ve fare
            aygıtlarının düzgün çalıştığını kontrol ediniz. Eğer kontrolleriniz
            sırasında bir sıkıntı yaşıyorsanız, sınav sorumlusu ya da sınav
            salonu teknik destek personelinden yardım isteyiniz.
          </li>
          <li>
            2. Sınav birden fazla bölümden oluşabilir. Her bölüm soruları 1(bir)
            den başlayarak sıralı gelecektir.
          </li>
          <li>
            3. Bilgisayar ekranında karşınıza gelen sorulara uygun cevapları
            klavye ya da fare yardımıyla seçerek sonraki sorulara geçiş
            yapabilirsiniz.
          </li>
          <li>
            4. Bazı sorularda süre cevaplama süre sınırı kontrol edildiği için
            ilgili soruları belirlenen süre içinde tamamlayamama durumunda
            sorunuz iptal olacaktır.
          </li>
          <li>
            5. Sınav sırasında başkasının sınav ekranına bakmak ve kopya çekmek
            yasaktır.
          </li>
          <li>
            6. Sınav sırasında bilgisayarı bozmaya teşebbüs etmek ya da donanım
            aygıtlarını çalışamaz hale getirmek yasaktır.
          </li>
          <li>
            7. Sınav salonuna içecek, yiyecek ya da benzeri malzemeler ile
            girmek yasaktır.
          </li>
          <li>
            8. Sınav sırasında cep telefonu ile görüşmek, ekranların fotoğrafını
            çekmek yasaktır.
          </li>
          <li>
            9. Sınav sırasında genel sınav kullarına uymayan, saygı ve ahlaki
            davranışların dışında hareket edilmesi yasaktır.
          </li>
          <li>
            10. Sınav sırasında yüksek sesle konuşmak, sınav başladıktan sonra
            ihtiyaç amaçlı sınav salonu dışına çıkmak yasaktır.
          </li>
          <li>
            11. Sınava giren kişiler, sınav başladıktan itibaren her ne sebep
            olursa olsun sınavdan dışarı çıkamazlar.
          </li>
          <li>
            12. Sınav sırasında sorunuz olduğunda, el kaldırarak sınav
            yetkilisinin yanınıza gelmesini bekleyiniz.
          </li>
          <li>
            13. Sınav sonrasında bir itirazınız olması durumunda sınav
            yetkilisine ilgili itirazınızın sınav sonuç tutanağına aktarılmasını
            sağlayınız.
          </li>
          <li>
            14. Sınavda sorulan soruların resmini çekmek, sınav salonu dışına
            çıkarmaya çalışmak yasaktır.
          </li>
          <li>
            15. Yukarıda belirtilen sınav şartları tüm katılımcıları bağlayıcı
            nitelikte olup, ilgili kurallara uymayan kişilerin sınavları
            geçersiz sayılarak başarısız ilan edilirler.
          </li>
          <li>
            İş bu yazıda belirtilen şartlara uyacağınızı ve bu şartlar altında
            sınav olmayı kabul ettiğinizi tarafınıza bildiririz.
          </li>
        </ul>
        <h2>Saygılarımızla</h2>
        <hr />
        <Form.Check
          label="Sözleşmeyi okudum, anladım ve kabul ediyorum"
          onChange={() => setFormAgree(!formAgree)}
          value={formAgree}
        />
        <hr />
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
            <Button
              variant="success"
              onClick={() =>
                Swal.fire({
                  title: "<strong>Emin Misiniz?</strong>",
                  html:
                    "<p>Sınava katılmak istediğnize emin misiniz? Onay vermeniz durumunda süreniz başlayacaktır.</p>",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#1BC5BD",
                  confirmButtonText: "Evet",
                  cancelButtonColor: "#F64E60",
                  cancelButtonText: "İptal",
                }).then((result) => {
                  if (result.value) {
                    Swal.fire({
                      icon: "success",
                      text: "Sınav Ekranına Yönlendiriliyorsunuz.",
                      showConfirmButton: false,
                      timer: 1200,
                    });

                    //VisualExamCode diye birşey yok ...
                    if (location.state.ExamCode) {
                      axios
                        .put(
                          `/user-exams/update-begin-end/${location.state.ExamCode}`,
                          { begined: 1 }
                        )
                        .then((res) =>
                          history.push(
                            `/lms/visual-exam/VisualExamStart/${location.state.ExamCode}`
                          )
                        );
                    }
                  }
                })
              }
              disabled={!formAgree}
            >
              Başla!
            </Button>
            <Button onClick = {()=>  history.push(
                            `/dashboard`
                          )} 
            variant="danger ml-2"
            >Vazgeç</Button>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default BeforeVisualExamPage;
