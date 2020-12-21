import React from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { Table } from "react-bootstrap";

export function MyProfilePage() {
  const [users, setUsers] = React.useState("");
  React.useEffect(() => {
    axios.get("/users/get-info").then((res) => {
      console.log(res.data);
      setUsers(res.data);
    });
  }, []);

  return (
    <Card>
      <CardHeader title="Profilim" />
      <CardBody>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th></th>
              <th>Bilgilerim</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>TC No</td>
              <td>{users.TCNo}</td>
            </tr>
            <tr>
              <td>İsim</td>
              <td>{users.FirstName}</td>
            </tr>
            <tr>
              <td>Soyisim</td>
              <td>{users.LastName}</td>
            </tr>
            <tr>
              <td>Telefon</td>
              <td>{users.PhoneNumber}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{users.Email}</td>
            </tr>
            <tr>
              <td>Adres</td>
              <td>{users.Address}</td>
            </tr>

            <tr>
              <td>Şube</td>
              <td>{users.CompanyName}</td>
            </tr>
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
}
