import React from "react";

export const ListWidget9 = () => {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        margin: "15px",
        justifyContent: "center",

        border: "solid 0.25px",
      }}
    >
      <div
        className="col-lg-4"
        style={{
          display: "flex",
          flex: 1,
          margin: "10px",
          justifyContent: "center",
          border: "solid 0.25px",
        }}
      >
        <span
          className=" font-weight-bolder text-dark"
          style={{ display: "flex", flexDirection: "column" }}
        >
          Toplam Firma Sayısı:
        </span>
        <span>24</span>
      </div>
      <div
        className="col-lg-4"
        style={{
          display: "flex",
          flex: 1,
          margin: "10px",
          justifyContent: "center",
        }}
      >
        <span className="font-weight-bolder text-dark">
          Toplam Eğitmen Sayısı
        </span>
        1
      </div>
      <div
        className="col-lg-4"
        style={{
          display: "flex",
          flex: 1,
          margin: "10px",
          justifyContent: "center",
        }}
      >
        <span className=" font-weight-bolder text-dark align-items-start flex-column">
          Toplam kullanıcı Sayısı
        </span>
        1
      </div>
    </div>
  );
};
