/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import axios from "axios";

export function MonthlyLibraries({ className }) {
  const [monthlyLibrary, setmonthlyLibrary] = useState([]);

  useEffect(() => {
    axios.get("/motnhly-created-library").then((res) => {
      setmonthlyLibrary(res.data);
    });
  }, []);

  return (
 
    <div className={`card card-custom ${className}`}>
      {/* Head */}
      <div className="card-header border-0 py-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label font-weight-bolder text-dark">
            Güncel Görüntü Sayısı{" "}
          </span>
        </h3>
      </div>

      {/* Body */}

      <div className="card-body pt-0 pb-3">
        <div className="tab-content">
          <div className="table-responsive">
            <table className="table table-head-custom table-head-bg table-borderless table-vertical-center">
              <thead>
                <tr className="text-left text-uppercase">
                  <th className="pl-7" style={{ minWidth: "250px" }}>
                    <span className="text-dark-75">Tarih</span>
                  </th>

                  <th style={{ minWidth: "100px" }}>Görüntü Sayısı</th>
                </tr>
              </thead>
              <tbody>
                {monthlyLibrary.map((library) => {
                  return (
                    <tr>
                      <td className="">
                        <div className="d-flex align-items-center">
                          <div className="text-dark-75 font-weight-bolder mb-1 font-size-lg">
                            {library.CreatedDate}
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className="text-dark-75 font-weight-bolder d-block font-size-lg">
                          {library.Count}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
