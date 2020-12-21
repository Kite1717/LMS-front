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

export function RollCallPage({ match }) {
  

 




  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    console.log(match);
    if (match.params !== undefined && match.params !== null) {
      axios
        .get(`/meeting-users/user/meeting/${match.params.id}/all`)
        .then((res) => {
          console.log(res.data, match.params.id);
          setUsers(res.data);
        });
    }
  }, [match]);



 



//   const handleFilterByTime = () =>{

//     if(begined !== null && begined !== undefined && begined !== "Invalid Date" 
//     &&
//     finised !== null && finised !== undefined && finised !== "Invalid Date"
//     && match.params !== undefined && match.params !== null)
//     {
//       axios
//       .post(`/exam-result/exam/filter/${match.params.id}/${match.params.coid}`,{begined,finised})
//       .then((res) => {
//         console.log(res.data, match.params.cid);
//         setUsers(res.data);
//       });

//     }
//     else{
//       Swal.fire({
//         icon: "warning",
//         text: "Lütfen başlangıç ve bitiş tarihleri doğru giriniz ve doldurunuz",
//         showConfirmButton: false,
//         timer: 1500,
//       });

//     }

//   }


const handleFilterByStatus = (status) =>{

    if (match.params !== undefined && match.params !== null) {
        axios
          .get(`/meeting-users/user/meeting/${match.params.id}/${status}`)
          .then((res) => {
           
            setUsers(res.data);
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
                  handleFilterByStatus(e.target.options[e.target.selectedIndex].id)
                console.log(e.target.options[e.target.selectedIndex].id)
              }}
             
            >
              <option id='all'>{"Hepsi"}</option>
              <option id='joined'>{"Katılanlar"}</option>
              <option id='not-joined'>{"Katılmayanlar"}</option>
             
            </select>
          </div>
        </div>



      
        <table class="table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">TC No</th>
              <th scope="col">Adı</th>
              <th scope="col">Soyadı</th>
              <th scope="col">Katılma Zamanı</th>
              <th scope="col">Katılma Durumu</th>
              
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
                    {moment(user.Joined).format("DD/MM/YYYY HH:mm:ss") ===
                    "Invalid date"
                      ? ""
                      : moment(user.Joined).format("DD/MM/YYYY HH:mm:ss")}
                  </td>
                  <td>
                   {user.Joined !== null 
                    ?"Katıldı"
                    :"Katılmadı"
                   
                    }
                  </td>
                 

                 
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
