import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  DatePickerField,
  InputTel,
} from "../../../_metronic/_partials/controls";
import { Formik, Form, Field, FieldArray } from "formik";

import axios from "axios";

export const Profile = ({ setShow, axiosToken }) => {
  const StaticData = {
    Istihdam28GunBosluk: "",
    BoslukSebebiSorulduMu: false,
    BoslukAciklama: "",
    IstihdamKontrolSonucu: false,
    IstihdamKontolAciklama: "",
    EgitimDurumu: 1,
    AdliSicilBelgeSunulduMu: false,
    AdliSicilKaydiVarMi: false,
    AdliSicilArsivKaydiVarMi: false,
    HakkindaSorusturmaVarMi: false,
    TerorVsNedeniyleKamudanCikarilmisMi: false,
    OzgecmisKontrolSonucu: false,
    HGPSvarmi: false,
    TPSSvarmi: false,
    OnaylandiMi: false,
    HGPSbitis: "",
    TPSSbitis: "",
    UserId: 0,
  };
  const JobTitle = [
    {
      Unvan: "",
      BaslamaTarihi: "",
      BitisTarihi: "",
      YetkiliAdi: "",
      YetKiliTel: "",
    },
  ];

  const Reference = [
    {
      AdSoyad: "",
      Unvan: "",
      Tel: "",
    },
  ];

  const School = [
    {
      OkulUnvani: "",
      OkulAdresi: "",
    },
  ];

  const acceptProfile = (values) => {
    setTimeout(() => {
      console.log(JSON.stringify(values, null, 2));
      //alert(JSON.stringify(values, null, 2));

      axios.interceptors.request.use(
        (config) => {
          config.headers.Authorization = `Bearer ${axiosToken}`;

          return config;
        },
        (err) => Promise.reject(err)
      );

      axios.post("/resumes", values).then(() => {
        setShow(false);
      });
    }, 400);
  };

  return (
    <div>
      <Formik
        initialValues={{
          StaticData,
          JobTitle,
          School,
          Reference,
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <Card>
            <CardHeader title="Kullanıcı Bilgileri"></CardHeader>
            <CardBody style={{ marginLeft: "50px" }}>
              <div className="form-group row">
                <h3 className="col-lg-12 text-center text-danger mb-3 ">
                  * Lütfen özgeçmiş bilgilerinizi güncelleyiniz. Özgeçmişiniz
                  onaylanmadan diğer ekranlara geçiş yapamazsınız.
                </h3>
              </div>

              <form>
                <div className="form-group row">
                  <div className="col-lg-12 text-center">İş Durumu</div>
                </div>

                <div className="form-group row"></div>

                <FieldArray
                  name="JobTitle"
                  render={(arrayHelpers) => (
                    <>
                      {values.JobTitle &&
                        values.JobTitle.length > 0 &&
                        values.JobTitle.map((friend, index) => (
                          <div key={index}>
                            <div className="form-group row">
                              <hr />
                            </div>

                            <div className="form-group row">
                              <div className="col-lg-3">Unvan</div>
                              <div className="col-lg-7">
                                <Field
                                  className="input-group-text"
                                  style={{ width: "350px" }}
                                  onChange={handleChange}
                                  name={`JobTitle[${index}].Unvan`}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-lg-3">Başlama Tarihi</div>
                              <div className="col-lg-9">
                                <Field
                                  className="input-group-text"
                                  type="date"
                                  onChange={handleChange}
                                  name={`JobTitle[${index}].BaslamaTarihi`}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-lg-3">Bitiş Tarihi</div>
                              <div className="col-lg-7">
                                <Field
                                  className="input-group-text"
                                  type="date"
                                  onChange={handleChange}
                                  name={`JobTitle[${index}].BitisTarihi`}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-lg-3">Yetkili Adı</div>
                              <div className="col-lg-7">
                                <Field
                                  className="input-group-text"
                                  style={{ width: "350px" }}
                                  onChange={handleChange}
                                  name={`JobTitle[${index}].YetkiliAdi`}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-lg-3">
                                Yetkili Telefon Numarası
                              </div>
                              <div className="col-lg-7">
                                <Field
                                  className="input-group-text"
                                  style={{ width: "350px" }}
                                  onChange={handleChange}
                                  name={`JobTitle[${index}].YetKiliTel`}
                                />
                              </div>
                            </div>

                            {index !== 0 && (
                              <button
                                className="btn btn-success btn-elevate"
                                type="button"
                                onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                              >
                                -
                              </button>
                            )}
                            <div className="form-group row">
                              <hr />
                            </div>
                          </div>
                        ))}

                      <>
                        <button
                          className="btn btn-success btn-elevate"
                          type="button"
                          onClick={() =>
                            arrayHelpers.push({
                              BaslamaTarihi: "",
                              BitisTarihi: "",
                              YetkiliAdi: "",
                              YetKiliTel: "",
                            })
                          }
                        >
                          {/* show this when user has removed all friends from the list */}
                          Ekle
                        </button>
                        <hr />
                      </>
                    </>
                  )}
                />

                <div className="form-group row">
                  <div className="col-lg-3">
                    Çalışma dönemleriniz arasında 28 günden fazla işsiz
                    kaldıysanız, nedenini buraya yazın
                  </div>
                  <div className="col-lg-7">
                    <input
                      className="input-group-text"
                      style={{ width: "350px", height: "100px" }}
                      name="StaticData.Istihdam28GunBosluk"
                      onChange={handleChange}
                      value={values.StaticData.Istihdam28GunBosluk}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-lg-12 text-center">Eğitim Durumu</div>
                </div>
                <div className="form-group row"></div>

                <div className="form-group row">
                  <div className="col-lg-3">Eğitim Durumu</div>
                  <div className="col-lg-7">
                    <select
                      className="form-control"
                      style={{ width: "350px" }}
                      name="StaticData.EgitimDurumu"
                      onChange={handleChange}
                      value={values.StaticData.EgitimDurumu}
                    >
                      <option value="1">İlköğretim</option>
                      <option value="2">Lise</option>
                      <option value="3">Ön Lisans</option>
                      <option value="4">Lisans</option>
                      <option value="5">Lisans Üstü</option>
                    </select>
                  </div>
                </div>

                <FieldArray
                  name="School"
                  render={(arrayHelpers) => (
                    <>
                      {values.School &&
                        values.School.length > 0 &&
                        values.School.map((friend, index) => (
                          <div key={index}>
                            <div className="form-group row">
                              <hr />
                            </div>

                            <div className="form-group row">
                              <div className="col-lg-3">Okul Unvanı</div>
                              <div className="col-lg-7">
                                <Field
                                  className="input-group-text"
                                  style={{ width: "350px" }}
                                  placeholder="Okul Unvanı"
                                  onChange={handleChange}
                                  name={`School[${index}].OkulUnvani`}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-lg-3">Okul Adresi</div>
                              <div className="col-lg-7">
                                <Field
                                  className="input-group-text"
                                  style={{ width: "350px" }}
                                  placeholder="Okul Adresi"
                                  onChange={handleChange}
                                  name={`School[${index}].OkulAdresi`}
                                />
                              </div>
                            </div>

                            {index !== 0 && (
                              <button
                                className="btn btn-success btn-elevate"
                                type="button"
                                onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                              >
                                -
                              </button>
                            )}
                            <div className="form-group row">
                              <hr />
                            </div>
                          </div>
                        ))}

                      <>
                        <button
                          className="btn btn-success btn-elevate"
                          type="button"
                          onClick={() =>
                            arrayHelpers.push({
                              OkulUnvani: "",
                              OkulAdresi: "",
                            })
                          }
                        >
                          {/* show this when user has removed all friends from the list */}
                          Ekle
                        </button>
                      </>
                    </>
                  )}
                />

                <div className="form-group row">
                  <div className="col-lg-12 text-center">
                    Adli Sicil Kontrolü
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-lg-3">Adli sicil belge sunuldu mu? </div>
                  <div className="col-lg-7 text-center">
                    <label class="checkbox">
                      <Field
                        className="form-check-input"
                        type="checkbox"
                        name="StaticData.AdliSicilBelgeSunulduMu"
                        onChange={handleChange}
                        value={values.StaticData.AdliSicilBelgeSunulduMu}
                        checked={values.StaticData.AdliSicilBelgeSunulduMu}
                      />
                      <span></span>
                    </label>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-lg-3">Adli sicil kaydı var mı? </div>
                  <div className="col-lg-7 text-center">
                    <label class="checkbox">
                      <Field
                        className="form-check-input"
                        type="checkbox"
                        name="StaticData.AdliSicilKaydiVarMi"
                        onChange={handleChange}
                        value={values.StaticData.AdliSicilKaydiVarMi}
                        checked={values.StaticData.AdliSicilKaydiVarMi}
                      />
                      <span></span>
                    </label>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-lg-3">
                    Adli sicil arşiv kaydı var mı?{" "}
                  </div>
                  <div className="col-lg-7 text-center">
                    <label class="checkbox">
                      <Field
                        type="checkbox"
                        name="StaticData.AdliSicilArsivKaydiVarMi"
                        onChange={handleChange}
                        value={values.StaticData.AdliSicilArsivKaydiVarMi}
                        checked={values.StaticData.AdliSicilArsivKaydiVarMi}
                      />
                      <span></span>
                    </label>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-lg-3">Hakkında soruşturma var mı? </div>
                  <div className="col-lg-7 text-center">
                    <label class="checkbox">
                      <Field
                        type="checkbox"
                        name="StaticData.HakkindaSorusturmaVarMi"
                        onChange={handleChange}
                        value={values.StaticData.HakkindaSorusturmaVarMi}
                        checked={values.StaticData.HakkindaSorusturmaVarMi}
                      />
                      <span></span>
                    </label>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-lg-3">
                    Terör vs nedeniyle kamudan çıkarılmış mı?
                  </div>
                  <div className="col-lg-7 text-center">
                    <label class="checkbox">
                      <Field
                        type="checkbox"
                        name="StaticData.TerorVsNedeniyleKamudanCikarilmisMi"
                        onChange={handleChange}
                        value={
                          values.StaticData.TerorVsNedeniyleKamudanCikarilmisMi
                        }
                        checked={
                          values.StaticData.TerorVsNedeniyleKamudanCikarilmisMi
                        }
                      />
                      <span></span>
                    </label>
                  </div>
                </div>

                <div className="form-group row"></div>
                <div className="form-group row">
                  <div className="col-lg-12 text-center">Referanslar</div>
                </div>
                <div className="form-group row"></div>

                <FieldArray
                  name="Reference"
                  render={(arrayHelpers) => (
                    <>
                      {values.Reference &&
                        values.Reference.length > 0 &&
                        values.Reference.map((friend, index) => (
                          <div key={index}>
                            <div className="form-group row">
                              <hr />
                            </div>

                            <div className="form-group row">
                              <div className="col-lg-3">Ad Soyad</div>
                              <div className="col-lg-7">
                                <Field
                                  className="input-group-text"
                                  style={{ width: "350px" }}
                                  placeholder="Ad Soyad"
                                  onChange={handleChange}
                                  name={`Reference[${index}].AdSoyad`}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-lg-3">Unvan</div>
                              <div className="col-lg-7">
                                <Field
                                  className="input-group-text"
                                  style={{ width: "350px" }}
                                  placeholder="Unvan"
                                  onChange={handleChange}
                                  name={`Reference[${index}].Unvan`}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-lg-3">
                                Şube Telefon Numarası
                              </div>
                              <div className="col-lg-7">
                                <Field
                                  className="input-group-text"
                                  style={{ width: "350px" }}
                                  placeholder="Şube Telefon Numarası"
                                  onChange={handleChange}
                                  name={`Reference[${index}].Tel`}
                                />
                              </div>
                            </div>

                            {index !== 0 && (
                              <button
                                className="btn btn-success btn-elevate"
                                type="button"
                                onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                              >
                                -
                              </button>
                            )}
                            <div className="form-group row">
                              <hr />
                            </div>
                          </div>
                        ))}

                      <>
                        <button
                          className="btn btn-success btn-elevate"
                          type="button"
                          onClick={() =>
                            arrayHelpers.push({
                              AdSoyad: "",
                              Unvan: "",
                              Tel: "",
                            })
                          }
                        >
                          {/* show this when user has removed all friends from the list */}
                          Ekle
                        </button>
                      </>
                    </>
                  )}
                />

                <div className="form-group row"></div>

                <div className="form-group row">
                  <div className="col-lg-3">HGPS sertifikası var mı?</div>
                  <div className="col-lg-7 text-center">
                    <label class="checkbox">
                      <Field
                        className="form-check-input"
                        type="checkbox"
                        name="StaticData.HGPSvarmi"
                        onChange={handleChange}
                        value={values.StaticData.HGPSvarmi}
                        checked={values.StaticData.HGPSvarmi}
                      />
                      <span></span>
                    </label>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-lg-3">Bitiş Tarihi</div>
                  <div className="col-lg-7">
                    <input
                      className="input-group-text"
                      type="date"
                      name="StaticData.HGPSbitis"
                      onChange={handleChange}
                      value={values.StaticData.HGPSbitis}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-lg-3">TPSS sertifikası var mı?</div>
                  <div className="col-lg-7 text-center">
                    <label class="checkbox">
                      <Field
                        className="form-check-input"
                        type="checkbox"
                        name="StaticData.TPSSvarmi"
                        onChange={handleChange}
                        value={values.StaticData.TPSSvarmi}
                        checked={values.StaticData.TPSSvarmi}
                      />
                      <span></span>
                    </label>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-lg-3">Bitiş Tarihi</div>
                  <div className="col-lg-7">
                    <input
                      className="input-group-text"
                      type="date"
                      name="StaticData.TPSSbitis"
                      onChange={handleChange}
                      value={values.StaticData.TPSSbitis}
                    />
                  </div>
                </div>
              </form>
            </CardBody>
            <CardFooter>
              {" "}
              <div className="form-group row">
                <div className="col-lg-3"></div>
                <div className="col-lg-7 text-right">
                  <button
                    type="button"
                    className="btn btn-success btn-elevate"
                    onClick={() => acceptProfile(values)}
                  >
                    Bilgilerimi Güncelle
                  </button>
                </div>
              </div>
            </CardFooter>
          </Card>
        )}
      </Formik>
    </div>
  );
};
