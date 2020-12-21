import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
} from "../../../../../_metronic/_partials/controls";

import { Formik } from "formik";

const SurveysPage = () => {
  return (
    <>
      <Card>
        <CardHeader title="Eğitim Değerlendirme Formu"></CardHeader>
        <CardBody style={{ margin: "40px" }}>
          <div className="form-group row">
            <h3 className="col-lg-12 text-center text-danger mb-3 ">
              * Lütfen aldığınız eğitim ile ilgili aşağıdaki anketi doldurunuz.
            </h3>
          </div>

          <div className="form-group row">
            <div className="col-lg-5"></div>
            <div className="col-lg-7">
              <div
                className="col-lg-8"
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                <label
                  style={{
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    margin: "3px",
                  }}
                >
                  Hiç <br />
                  Katılmıyorum
                </label>
                <label
                  style={{
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    margin: "3px",
                  }}
                >
                  <br />
                  Katılmıyorum
                </label>
                <label
                  style={{
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    margin: "3px",
                  }}
                >
                  Kısmen <br />
                  Katılıyorum
                </label>
                <label
                  style={{
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    margin: "3px",
                  }}
                >
                  <br /> Katılıyorum
                </label>
                <label
                  style={{
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    margin: "3px",
                  }}
                >
                  Tamamen <br />
                  Katılıyorum
                </label>
              </div>
            </div>
          </div>

          <div className="form-group row">
            <div
              className="col-lg-5"
              style={{ fontSize: "25px", color: "red" }}
            >
              EĞİTİM
            </div>
          </div>

          <div className="form-group row">
            <div className="col-lg-5">
              1. İş yaşamıma katkıda bulunacağına inanıyorum.
            </div>
            <div className="col-lg-7">
              <div
                className="col-lg-8"
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
              </div>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-lg-5">
              2. Konuyla ilgili hedefler ve mesaj, açık ve anlaşılırdı.
            </div>
            <div className="col-lg-7">
              <div
                className="col-lg-8"
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
              </div>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-lg-5">3. Yeterince ayrıntıya girildi.</div>
            <div className="col-lg-7">
              <div
                className="col-lg-8"
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
              </div>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-lg-5">
              4. Uygulamaya ilişkin örnekler yeterliydi.
            </div>
            <div className="col-lg-7">
              <div
                className="col-lg-8"
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
              </div>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-lg-5">
              5. Eğitimde kullanılan görüntü ve işitsel araçlar öğrenmemi
              kolaylaştırdı.
            </div>
            <div className="col-lg-7">
              <div
                className="col-lg-8"
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
              </div>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-lg-5">
              6. Basılı dökümanlar içerik ve biçim olarak etkiliydi.
            </div>
            <div className="col-lg-7">
              <div
                className="col-lg-8"
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
              </div>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-lg-5">
              7. Konuyla ilgili alıntılar yeterliydi.
            </div>
            <div className="col-lg-7">
              <div
                className="col-lg-8"
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
              </div>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-lg-5">
              8. Öğrendiklerim işimi kaliteli yapmama katkıda bulunabilir.
            </div>
            <div className="col-lg-7">
              <div
                className="col-lg-8"
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
              </div>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-lg-5">9. Başkalarına bu eğitimi öneririm.</div>
            <div className="col-lg-7">
              <div
                className="col-lg-8"
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
              </div>
            </div>
          </div>
          <div className="form-group row"></div>

          <div className="form-group row">
            <div
              className="col-lg-5"
              style={{ fontSize: "25px", color: "red" }}
            >
              EĞİTİMCİ
            </div>
          </div>

          <div className="form-group row">
            <div className="col-lg-5">
              10. Verdiği eğitim konusunda yeterli bilgiye sahip
            </div>
            <div className="col-lg-7">
              <div
                className="col-lg-8"
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
              </div>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-lg-5">
              11. Konuyla ilgili deneyimlerini eğitime yansıtabiliyor
            </div>
            <div className="col-lg-7">
              <div
                className="col-lg-8"
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
              </div>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-lg-5">
              12. Konuya uygun eğitim yöntemini belirlemede başarılı
            </div>
            <div className="col-lg-7">
              <div
                className="col-lg-8"
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
              </div>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-lg-5">
              13. Bilgilerini aktarırken eğitimi alan kişilerin özelliklerine
              göre uygun bir dil kullanıyor
            </div>
            <div className="col-lg-7">
              <div
                className="col-lg-8"
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
              </div>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-lg-5">
              14. Grubun katılımını sağlamada başarılı
            </div>
            <div className="col-lg-7">
              <div
                className="col-lg-8"
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
              </div>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-lg-5">
              15. Sorulara açık, anlaşılır yanıtlar veriyor
            </div>
            <div className="col-lg-7">
              <div
                className="col-lg-8"
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
              </div>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-lg-5">16. Dikkati konuya toplayabiliyor</div>
            <div className="col-lg-7">
              <div
                className="col-lg-8"
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
              </div>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-lg-5">
              17. Bu eğitimcilerin hazırlayacağı diğer eğitimlere katılırım
            </div>
            <div className="col-lg-7">
              <div
                className="col-lg-8"
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
              </div>
            </div>
          </div>

          <div className="form-group row"></div>

          <div className="form-group row">
            <div
              className="col-lg-5"
              style={{ fontSize: "25px", color: "red" }}
            >
              EĞİTİM ORTAMI VE SÜRESİ
            </div>
          </div>

          <div className="form-group row">
            <div className="col-lg-5">
              18. Büyüklüğü katılımcı sayısına uygundu
            </div>
            <div className="col-lg-7">
              <div
                className="col-lg-8"
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
              </div>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-lg-5">19. Oturma düzeni rahattı</div>
            <div className="col-lg-7">
              <div
                className="col-lg-8"
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
              </div>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-lg-5">20. ortam rahat ve sessizdi</div>
            <div className="col-lg-7">
              <div
                className="col-lg-8"
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
              </div>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-lg-5">
              21. Konuların işlenebilmesi için ayrılan süre yeterliydi
            </div>
            <div className="col-lg-7">
              <div
                className="col-lg-8"
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
                <input
                  type="radio"
                  style={{ width: "20px", height: "20px" }}
                  class="radio"
                  value="1"
                  name="fooby[1][]"
                />
              </div>
            </div>
          </div>

          <div className="form-group row"></div>

          <div className="form-group row">
            <div
              className="col-lg-5"
              style={{ fontSize: "25px", color: "red" }}
            >
              DİĞER DÜŞÜNCE VE ÖNERİLERİNİZ
            </div>
          </div>
          <div className="form-group row">
            <div className="col-lg-5"></div>

            <textarea
              className="col-lg-10"
              style={{ height: "80px" }}
            ></textarea>
          </div>
        </CardBody>
        <CardFooter>
          <div className="form-group row">
            <div className="col-lg-10 text-right">
              <button type="button" className="btn btn-success btn-elevate ">
                Gönder
              </button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default SurveysPage;
