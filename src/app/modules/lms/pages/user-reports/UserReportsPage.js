import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
} from "../../../../../_metronic/_partials/controls";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

export const UserReportsPage = () => {
  const [tcNo, setTcNo] = useState(null);

  const history = new useHistory();

  return (
    <>
      <Card>
        <CardHeader title="Kişi Bazlı Raporlar"></CardHeader>
        <CardBody style={{ margin: "20px" }}>
          <input
            type="number"
            className="form-control"
            name="TCNo"
            placeholder="TC'ye Göre Kullanıcı Ara"
            maxLength="11"
            onChange={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value))
                .toString()
                .slice(0, 11);
              let value = e.target.value;
              setTcNo(value);
            }}
            required
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "20px",
            }}
          >
            <button
              onClick={() =>
                axios.post("/users/find/by/TCNo", { tcNo }).then((res) => {
                  if (res.data.length > 0) {
                    history.push(
                      `/lms/reports/${res.data[0].Id}/detail/company/${res.data[0].CompanyId}`
                    );
                  } else {
                    Swal.fire({
                      icon: "warning",
                      text: "Kullanıcı Bulunamadı",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  }
                })
              }
              className="btn btn-success"
            >
              ARA
            </button>
          </div>
        </CardBody>
      </Card>
    </>
  );
};
