import React from "react";
import axios from "axios";
import * as companyActions from "../../_redux/companies/companiesActions";
import { FormControl } from "react-bootstrap";
import { useHistory } from "react-router";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { Select } from "../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";
import moment from "moment";


import Swal from 'sweetalert2'

export function ExamReportsPage({ match }) {
  const { currentState } = useSelector(
    (state) => ({ currentState: state.companies }),
    shallowEqual
  );

  const history = useHistory();

  const { entities } = currentState;
  // Companies Redux state
  const dispatch = useDispatch();
  React.useEffect(() => {
    // server call by queryParams
    dispatch(companyActions.fetchAllCompanies());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("examss", match.params.id);

  let pushToUrl = (coid) => {
    console.log("zzzzzzzz", coid);
    history.push(`/lms/exam-reports/exam/${match.params.id}/${coid}`);
  };

  const [users, setUsers] = React.useState([]);
  React.useEffect(() => {
    console.log(match);
    if (match.params !== undefined && match.params !== null) {
      axios
        .get(`/exam-result/exam/${match.params.id}/${match.params.coid}`)
        .then((res) => {
          console.log(res.data, match.params.id);
          setUsers(res.data);
        });
    }
  }, [match]);

  const intl = useIntl();

  const handleResult = (examResult) => {
    if (examResult === 1) {
      return "Geçti";
    } else if (examResult === 0) {
      return "Kaldı";
    }
  };



  const[begined,setBegined] = React.useState(null)
  const[finised,setFinised] = React.useState(null)
  const handleFilterByTime = () =>{

    if(begined !== null && begined !== undefined && begined !== "Invalid Date" 
    &&
    finised !== null && finised !== undefined && finised !== "Invalid Date"
    && match.params !== undefined && match.params !== null)
    {
      axios
      .post(`/exam-result/exam/filter/${match.params.id}/${match.params.coid}`,{begined,finised})
      .then((res) => {
        console.log(res.data, match.params.cid);
        setUsers(res.data);
      });

    }
    else{
      Swal.fire({
        icon: "warning",
        text: "Lütfen başlangıç ve bitiş tarihleri doğru giriniz ve doldurunuz",
        showConfirmButton: false,
        timer: 1500,
      });

    }

  }




  return (
    <Card>
      <CardHeader />
      <CardBody>
      <div className="form-group row ml-5">
          <div className="form-group">
            <select
              className="form-control"
              name="CompanyId"
              onChange={(e) => {
                if(e.target.value === "Seçiniz")
                {
                  pushToUrl("all");
                }

                else pushToUrl(e.target.value);
              }}
              label={intl.formatMessage({
                id: intl.formatMessage({
                  id: "USERS.NEW_EDIT.COMPANY",
                }),
              })}
            >
              <option key={'all'}>{"Seçiniz"}</option>
              {entities !== null &&
                entities !== undefined &&
                entities.map(({ Id, FullName }) => (
                  <option key={Id} value={Id}>
                    {FullName}
                  </option>
                ))}
            </select>
          </div>
        </div>



        <div className="form-group row ml-5">
          <div className="form-group">
            <input
            type = "date"
              className="form-control"
              name="Begined"
              onChange={(e) => {
               setBegined(e.target.value)
              }}
              label="Başlangıç Tarihi"
            >
             
            </input>
          </div>


          <div className="form-group">
            <input
            type = "date"
              className="form-control"
              name="Finised"
              onChange={(e) => {
               setFinised(e.target.value)
              }}
              label="Bitiş Tarihi"
            >
             
            </input>
          </div>

          <div className="form-group">
          <button onClick = {handleFilterByTime} type="button" class="btn btn-success">Filtrele</button>
          </div>
        </div>

        <table class="table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">TC No</th>
              <th scope="col">Adı</th>
              <th scope="col">Soyadı</th>
              <th scope="col">Başlangıç Tarihi</th>
              <th scope="col">Bitiş Tarihi</th>
              <th scope="col">Geçirilen Dakika</th>
              <th scope="col">Doğru Sayısı</th>
              <th scope="col">Yanlış Sayısı</th>
              <th scope="col">Başarı Oranı</th>
              <th scope="col">Sınav Sonucu</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr>
                  <th scope="row"></th>
                  <td>{user.TCNo}</td>
                  <td>{user.FirstName}</td>
                  <td>{user.LastName}</td>
                  <td>
                    {moment(user.Begined).format("DD/MM/YYYY HH:mm:ss") ===
                    "Invalid date"
                      ? ""
                      : moment(user.Begined).format("DD/MM/YYYY HH:mm:ss")}
                  </td>
                  <td>
                    {" "}
                    {moment(user.Finised).format("DD/MM/YYYY HH:mm:ss") ===
                    "Invalid date"
                      ? ""
                      : moment(user.Finised).format("DD/MM/YYYY HH:mm:ss")}
                  </td>
                  <td>{user.UsageTimeAsHour}</td>
                  <td>{user.CorrectCount}</td>
                  <td>{user.WrongCount}</td>
                  <td>
                    {user.UserSuccessRate !== null &&
                      user.UserSuccessRate !== undefined &&
                      user.UserSuccessRate + "%"}
                  </td>

                  <td>{handleResult(user.ExanResult)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
