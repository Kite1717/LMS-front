import React from "react";
import { Link } from "react-router-dom";
import "./exams.scss";

export const Dashboard = () => {
  return (
    <div className="kt-widget5">
      <div className="kt-portlet__body">
        <div className="kt-widget5__title">
          <h3>Bekleyen Sınavlarım</h3>
        </div>
        <div className="kt-widget5__subtitle">
          <h5>
            <i
              className="fa fa-info"
              style={{ paddingRight: "0.2rem", color: "#464e5f" }}
            ></i>
          </h5>
          <h5>Bekleyen sınavınız bulunmamaktadır.</h5>
        </div>
        <h3>Sınav Sonuçlarım</h3>
        <div>
          <div className="kt-widget5__item">
            <div className="kt-widget5__content">
              <div className="kt-widget5__pic">
                <i className="fa fa-edit fa-4x kt-widget7__img"></i>
              </div>
              <div className="kt-widget5__section">
                <Link className="section-title">Section 1</Link>
                <p className="kt-widget5__desc">1</p>
                <div className="kt-widget5__info">
                  <span>Sınav Tamamlanma Tarihi : </span>
                  <span className="kt-font-info">6.7.2020</span>
                  <span>Sınavı Bitirme Süresi : </span>
                  <span className="kt-font-info">00:01:05 dk</span>
                  <span>Minimum Başarı Oranı : </span>
                  <span className="kt-font-info">74 %</span>
                  <span>Başarı Oranı : </span>
                  <span className="kt-font-success">50 %</span>
                </div>
              </div>
            </div>
            <div className="kt-widget5__content">
              <div className="kt-widget5__stats">
                <i className="fa fa-remove fa-4x"></i>
                <h4 style={{ color: "darkred" }}>Başarısız</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
