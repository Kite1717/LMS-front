import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import { login } from "../_redux/authCrud";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import { Footer } from "../../../../_metronic/layout/components/footer/Footer";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

import { Formik, Form, Field } from "formik";
import { InputTel } from "../../../../_metronic/_partials/controls";
import { Profile } from "../../../../_metronic/_partials/profile/Profile";
/*
  INTL (i18n) docs:
  https://github.com/formatjs/react-intl/blob/master/docs/Components.md#formattedmessage
*/

/*
  Formik+YUP:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
*/
const profile = 1;
const initialValues = {
  Username: "",
  Password: "",
  PhoneNumber: "",
};
let axiosToken = "";

function Login(props) {
  const { intl } = props;
  const [loading, setLoading] = useState(false);
  const button = useRef(null);
  const LoginSchema = Yup.object().shape({
    Username: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    Password: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
  });

  const PhoneSaveSchema = Yup.object().shape({
    PhoneNumber: Yup.string()
      .min(15, "En az 11 karakterli olmalıdır")
      .max(15, "En Fazla 11 karakterli olmalıdır")
      .matches(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2}[-\s\.]?[0-9]{2}$/,
        "Telefonu numaranızı eksik girdiniz"
      )
      .required("Telefon girilmesi gereklidir"),
  });

  const [enter, setEnter] = useState(false);
  const [showKVK, setShowKVK] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleClose = () => setShowKVK(false);
  const handleShow = () => setShowKVK(true);

  const enableLoading = () => {
    setLoading(true);
  };
  const acceptKVK = () => {
    const data = {
      kvkk: 1,
    };

    axios.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${axiosToken}`;

        return config;
      },
      (err) => Promise.reject(err)
    );

    console.log(axiosToken, "rrrr");
    const response = axios.put("/update-user-missing-info", data).then(() => {
      handleClose();
    });
  };

  const phoneNumber = React.createRef(null);
  const acceptPhone = (value) => {
    const temp = value.replace(/\s/g, "");

    console.log(temp);
    const patt = new RegExp(
      "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{2}[-s.]?[0-9]{2}$"
    );
    const ret = patt.test(temp);
    console.log(ret);
    if (ret) {
      axios.interceptors.request.use(
        (config) => {
          config.headers.Authorization = `Bearer ${axiosToken}`;

          return config;
        },
        (err) => Promise.reject(err)
      );
      const response = axios
        .put("/update-user-missing-info", { phone: value })
        .then(() => {
          setShowPhone(false);
        });
    }
  };

  React.useEffect(() => {
    if (showKVK) {
      setEnter(true);
    }
  }, [showKVK]);

  React.useEffect(() => {
    if (!enter) {
      setShowKVK(false);
    }
  }, [enter]);

  React.useEffect(() => {
    if (showProfile) {
      console.log(showProfile, "xdxddxxdxd");
      setEnter(true);
    }
  }, [showProfile]);

  React.useEffect(() => {
    console.log(enter, "   ENTERRRR");
    if (!enter) {
      setShowProfile(false);
    }
  }, [enter]);

  const disableLoading = () => {
    setLoading(false);
  };

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  const formik = useFormik({
    initialValues,
    // validationSchema: LoginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      if (values.Username !== "" && values.Password !== "") {
        setTimeout(() => {
          enableLoading();
          //alert(showKVK)
          login(values.Username, values.Password)
            .then(({ data }) => {
              if (data !== "Username/Password Wrong") {
                const { token, ...rest } = data;

                axiosToken = token;

                console.log(data);
                if (rest.ResumeControl === 1 && rest.IsResumeOk === 0) {
                  setShowProfile(true);
                }
                if (rest.KVKK === null) {
                  handleShow();
                } else if (rest.PhoneNumber === null) {
                  setShowPhone(true);
                }

                if (enter) props.login(token, rest);
                if (
                  rest.KVKK !== null &&
                  rest.PhoneNumber !== null &&
                  (rest.ResumeControl !== 1 || rest.IsResumeOk !== 0)
                )
                  props.login(token, rest);

                disableLoading();
              } else {
                disableLoading();

                setSubmitting(false);
                setStatus(
                  intl.formatMessage({
                    id: "AUTH.VALIDATION.INVALID_LOGIN",
                  })
                );
              }
            })
            .catch(() => {
              disableLoading();

              setSubmitting(false);
              setStatus(
                intl.formatMessage({
                  id: "AUTH.VALIDATION.INVALID_LOGIN",
                })
              );
            });
        }, 1000);
      }
    },
  });

  return (
    <>
      <div className="login-form login-signin" id="kt_login_signin_form">
        {/* begin::Head */}
        <div className="text-center mb-10 mb-lg-20">
         <Link to="/" className="flex-column-auto mt-5">
            <img
              alt="Logo"
              className="max-h-150px"
              src={toAbsoluteUrl("/media/logos/nes-logo.png")}
            />
          </Link> 

{/* <Link to="/" className="flex-column-auto mt-5">
            <img
              alt="Logo"
              className="max-h-80px"
              src={toAbsoluteUrl("/media/logos/nes-logo.png")}
            />
          </Link> */}
          <br />
          <br />

          <h3 className="font-size-h1">
            <FormattedMessage id="AUTH.LOGIN.TITLE" />
          </h3>
        </div>
        {/* end::Head */}

        {/*begin::Form*/}
        <form
          onSubmit={formik.handleSubmit}
          className="form fv-plugins-bootstrap fv-plugins-framework"
        >
          {formik.status ? (
            <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
              <div className="alert-text font-weight-bold">{formik.status}</div>
            </div>
          ) : (
              <div></div>
            )}

          <div className="form-group fv-plugins-icon-container">
            <input
              placeholder={intl.formatMessage({
                id: "AUTH.VALIDATION.LOGIN.USERNAME",
              })}
              type="text"
              className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                "email"
              )}`}
              name="Username"
              {...formik.getFieldProps("Username")}
            />
            {formik.touched.Username && formik.errors.Username ? (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{formik.errors.Username}</div>
              </div>
            ) : null}
          </div>
          <div className="form-group fv-plugins-icon-container">
            <input
              placeholder={intl.formatMessage({
                id: "AUTH.VALIDATION.LOGIN.PASSWORD",
              })}
              type="password"
              className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                "password"
              )}`}
              name="Password"
              {...formik.getFieldProps("Password")}
            />
            {formik.touched.Password && formik.errors.Password ? (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{formik.errors.Password}</div>
              </div>
            ) : null}
          </div>
          <div className="form-group d-flex flex-wrap justify-content-center align-items-center">
            <button
              id="kt_login_signin_submit"
              type="submit"
              className={`btn btn-primary font-weight-bold px-9 py-4 my-3`}
            >
              {intl.formatMessage({
                id: "AUTH.VALIDATION.LOGIN.BUTTON",
              })}
              {loading && <span className="ml-3 spinner spinner-white"></span>}
            </button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
{/*             Powered by NESS WORLDWIDE SERVICES
 */}          </div>
        </form>
      </div>

      <>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={PhoneSaveSchema}
          onSubmit={(values) => { }}
        >
          {({ handleSubmit, values }) => (
            <>
              <Modal scrollable={true} size="lg" show={showKVK}>
                <Modal.Header closeButton>
                  <Modal.Title>{/* NESS */} KVKK METNİ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”)
                  uyarınca, Şirketimiz tarafından, Veri Sorumlusu sıfatıyla,
                  kişisel verileriniz, iş amaçlarıyla bağlı olarak, aşağıda
                  açıklandığı çerçevede kullanılmak, kaydedilmek, saklanmak,
                  güncellenmek, aktarılmak ve/veya sınıflandırılmak suretiyle
                  işlenecektir.
                  <br />
                  <br />
                  <br />
                  Bu kapsamda Şirketimiz tarafından başta özel hayatın gizliliği
                  olmak üzere, kişilerin temel hak ve özgürlüklerini korumak ve
                  kişisel verilerin korunması amacıyla düzenlenen Kanun ve
                  Yönetmelikler gereğince Şirketimiz, kişisel verilerinizin
                  hukuka aykırı olarak işlenmesini önleme, hukuka aykırı olarak
                  erişilmesini önleme ve muhafazasını sağlama amacıyla, uygun
                  güvenlik düzeyini temin etmeye yönelik tüm teknik ve idari
                  tedbirleri almaktadır.
                  <br />
                  <br />
                  <br />
                  Bu metnin hedef kitlesi, Şirketimiz çalışanları veya
                  Şirketimize iş başvurusu yapmış olan çalışan adayları
                  dışındaki, Şirketimiz tarafından kişisel verileri işlenen tüm
                  gerçek kişilerdir.
                  <br />
                  <br />
                  <br />
                  Veri sorumlusu sıfatıyla işlenen kişisel verilere, burada
                  belirtilenlerle sınırlı sayıda olmamak üzere aşağıda yer
                  verilmektedir:
                  <br />
                  <br />
                  <br />
                  İsim, soy isim, şirket sicil numarası, sağlık verileri, T.C.
                  kimlik numarası, adres, telefon numarası, e-posta adresi,
                  imza, fiziksel mekan/güvenlik görüntü kaydı, çağrı
                  merkezi/hizmet kalitesi ses kaydı, banka hesap numarası,
                  cookie kayıtları,
                  <br />
                  <br />
                  <br />
                  <b>
                    Kişisel verilerin işlenme amaçları ve hukuki sebepleri;
                  </b>{" "}
                  <br /> Tarafınızca paylaşılan kişisel verileriniz;
                  <br />
                  • Şirketimiz tarafından sunulan ürün ve hizmetlerden sizleri
                  ve/veya temsil ettiğiniz kurum ve kuruluşları faysslandırmak
                  için, Şirketimizin ticari ve iş stratejilerinin belirlenmesi
                  ve uygulanması, pazarlama faaliyetlerinin yapılması, iş
                  geliştirme ve planlama faaliyetlerinin gerçekleştirilmesi
                  dahil ve fakat bunlarla sınırlı olmamak üzere gerekli
                  çalışmaların yürütülmesi,
                  <br />
                  • Şirketimiz tarafından yürütülen iletişime yönelik idari
                  operasyonların yürütülmesi,
                  <br />
                  • Şirketimizin kullanımda olan lokasyonların fiziksel
                  güvenliğinin ve denetiminin sağlanması,
                  <br />
                  • İş ortağı/müşteri/tedarikçi (yetkili veya çalışanları)
                  ilişkilerinin kurulması,
                  <br />
                  • İş ortaklarımız, tedarikçilerimiz veya sair üçüncü kişilerle
                  birlikte sunulan ürün ve
                  <br />
                  hizmetlere ilişkin sözleşme gereklerinin ve finansal
                  mutabakatın sağlanması,
                  <br />
                  • Şirketimizin insan kaynakları politikalarının yürütülmesi,
                  <br />
                  • Şirketimizin çağrı merkezinin aranması veya internet
                  sayfasının kullanılması ve/veya
                  <br />
                  • Şirketimizin düzenlediği eğitim, seminer veya
                  organizasyonlara katılım sağlanması amacıyla işlenecektir.
                  <br />
                  <br />
                  <br />
                  <b>Kişisel verilerin toplanma ve saklanma yöntemi; </b>{" "}
                  Şirketimizle paylaştığınız kişisel verileriniz, otomatik ya da
                  otomatik olmayan yöntemlerle, ofisler, şubeler, çağrı merkezi,
                  internet sitesi, sosyal medya mecraları, mobil uygulamalar ve
                  benzeri vasıtalarla sözlü, yazılı ya da elektronik olarak
                  toplanabilir. Kişisel verileriniz elektronik ve/veya fiziksel
                  ortamlarda saklanacaktır.
                  <br />
                  <br />
                  <br />
                  Şirketimiz tarafından temin edilen ve saklanan kişisel
                  verilerinizin saklandıkları ortamlarda yetkisiz erişime maruz
                  kalmamaları, manipülasyona uğramamaları, kaybolmamaları ve
                  zarar görmemeleri amacıyla gereken iş süreçlerinin tasarımı
                  ile teknik güvenlik altyapı geliştirmeleri uygulanmaktadır.
                  <br />
                  <br />
                  <br />
                  Kişisel verileriniz, size bildirilen amaçlar ve kapsam dışında
                  kullanılmamak kaydı ile gerekli tüm bilgi güvenliği tedbirleri
                  de alınarak işlenecek ve yasal saklama süresince veya böyle
                  bir süre öngörülmemişse işleme amacının gerekli kıldığı süre
                  boyunca saklanacak ve işlenecektir. Bu süre sona erdiğinde,
                  kişisel verileriniz silinme, yok edilme ya da anonimleştirme
                  yöntemleri ile Şirketimizin veri akışlarından çıkarılacaktır.
                  <br />
                  <br />
                  <br />
                  <b> Kişisel Verilerin aktarılması;</b>
                  Kişisel verileriniz, Kanunlar ve sair mevzuat kapsamında ve
                  açıklanan amaçlarla;
                  <br />
                  • Yetki vermiş olduğumuz, Şirketimiz nam ve hesabına
                  faaliyette bulunan şirketler, temsilcilerimize,
                  <br />
                  • Düzenleyici ve denetleyici kurumlara, kişisel verilerinizi
                  tabi olduğu kanunlarında açıkça talep etmeye yetkili olan kamu
                  kurum veya kuruluşlara,
                  <br />
                  • Belirtilen amaçlar kapsamında iş ortaklıkları, tedarikçi ve
                  yüklenici şirketler, bankalar ve sair gerçek veya tüzel
                  kişilere,
                  <br />
                  • Vergi ve benzeri danışmanlara, yasal takip süreçleri ile
                  ilgili zorunlu kişilere, kurum ve kuruluşlara ve denetimciler
                  de dâhil olmak üzere danışmanlık aldığımız üçüncü
                  <br />
                  kişilere ve bunlarla sınırlı olmaksızın, yurt içinde ve yurt
                  dışında, yukarıda belirtilen amaçlarla iş ortakları, hizmet
                  alınan üçüncü kişi, yetkilendirilen kişi ve kuruluşlara
                  aktarılabilecektir.
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
                  3. İşlenme amacını ve amacına uygun kullanılıp
                  kullanılmadığını öğrenme,
                  <br />
                  4. Yurt içinde / yurt dışında aktarıldığı 3. kişileri bilme,
                  <br />
                  5. Eksik / yanlış işlenmişse düzeltilmesini isteme,
                  <br />
                  6. KVKK’nın 7. maddesinde öngörülen şartlar çerçevesinde
                  silinmesini / yok edilmesini isteme,
                  <br />
                  7. Aktarıldığı 3. kişilere yukarıda sayılan (e) ve (f)
                  bentleri uyarınca yapılan işlemlerin bildirilmesini isteme,
                  <br />
                  8. Münhasıran otomatik sistemler ile analiz edilmesi nedeniyle
                  aleyhinize bir sonucun ortaya çıkmasına itiraz etme,
                  <br />
                  9. Kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız
                  hâlinde zararın giderilmesini talep etme haklarına sahipsiniz.
                  <br />
                  KVK Kanunu’nun 13. maddesinin 1. fıkrası gereğince, yukarıda
                  belirtilen haklarınızı kullanmak ile ilgili talebinizi, yazılı
                  olarak veya Kişisel Verileri Koruma Kurulu’nun belirlediği
                  diğer yöntemlerle Şirketimize iletebilirsiniz.
                  <br /> <br />
                  <br />
                  Yukarıda belirtilen haklarınızı kullanmak için kimliğinizi
                  tespit edici gerekli bilgiler ile talep dilekçenizi bizzat
                  elden teslim edebilir, noter kanalıyla veya Kişisel Verileri
                  Koruma Kurulu tarafından belirlenen diğer yöntemler ile
                  gönderebilir.{/*  veya nessisletmecilik@hs02.kep.tr adresine
                  güvenli elektronik imzalı olarak iletebilirsiniz. */}
                  <br />{" "}
                </Modal.Body>
                <Modal.Footer>
                  <button
                    class="btn btn-secondary"
                    onClick={() => setEnter(false)}
                  >
                    Vazgeç
                  </button>
                  <button
                    ref={button}
                    type="submit"
                    class="btn btn-primary"
                    onClick={acceptKVK}
                  >
                    Okudum Kabul Ediyorum
                  </button>
                </Modal.Footer>
              </Modal>
              <Modal show={showPhone}>
                <Modal.Body className="overlay overlay-block">
                  <Form className="form form-label-right">
                    <div className="form-group row">
                      <label className="ml-4">Telefon numranızı giriniz</label>
                      <div className="col-lg-12">
                        <Field
                          ref={phoneNumber}
                          name="PhoneNumber"
                          component={InputTel}
                          placeholder={intl.formatMessage({
                            id: intl.formatMessage({
                              id: "USERS.NEW_EDIT.PHONE",
                            }),
                          })}
                        //  label = "Telefon numaranızı girin"
                        />
                      </div>
                    </div>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <button
                    onClick={() => setShowPhone(false)}
                    className="btn btn-light btn-elevate"
                  >
                    {intl.formatMessage({
                      id: "BUTTON.CANCEL",
                    })}
                  </button>
                  <> </>
                  <button
                    type="submit"
                    onClick={() => acceptPhone(values.PhoneNumber)}
                    className="btn btn-primary btn-elevate"
                  >
                    {intl.formatMessage({
                      id: "BUTTON.SAVE",
                    })}
                  </button>
                </Modal.Footer>
              </Modal>
            </>
          )}
        </Formik>

        <Modal scrollable={true} size="xl" show={showProfile}>
          <Modal.Header closeButton>
            <Modal.Title>ÖZGEÇMİŞ FORMU</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Profile setShow={setShowProfile} axiosToken={axiosToken} />
          </Modal.Body>
        </Modal>
      </>
    </>
  );
}

export default injectIntl(connect(null, auth.actions)(Login));
