/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import axios from "axios";
import moment from "moment";

export function SistemLogAdmin({ className }) {
  const [entities, setEntities] = React.useState([]);

  useEffect(() => {
    axios.get("/activity-logs").then((res) => {
      console.log(res);
      setEntities(res.data.entities);
    });
  }, []);

  return (
    <div className={`card card-custom ${className}`}>
      {/* Header */}
      <div className="card-header align-items-center border-0 mt-4">
        <h3 className="card-title align-items-start flex-column">
          <span className="font-weight-bolder text-dark">
            En Son Hareketler
          </span>
          {/*    <span className="text-muted mt-3 font-weight-bold font-size-sm">
              890,344 Sales
            </span> */}
        </h3>
      </div>
      {/* Body */}
      <div className="card-body pt-0">
        <div className="timeline timeline-5 mt-3">
          {entities.map((entity) => {
            return (
              <div className="timeline-item align-items-start">
                <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3">
                  {moment(entity.CreatedAt).format("HH:mm")}
                </div>

                <div className="timeline-badge">
                  <i className="fa fa-genderless text-success icon-xxl"></i>
                </div>

                <div className="timeline-content text-dark-50">
                  {entity.FullName +
                    " " +
                    entity.IpAddress +
                    " Ip Adresiyle" +
                    " " +
                    entity.Detail}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
