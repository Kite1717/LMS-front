import React from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

import "./UserCourses.scss";

export const UserCourses = ({ history }) => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    axios.get("/course-users/user/13").then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div>
      {data.map((item) => (
        <div key={item.Id} className="course-card">
          <div>{item.Name}</div>
          <Button
            onClick={() => history.push(`/lms/user/course/topics/${item.Id}`)}
          >
            Kursa Git
          </Button>
        </div>
      ))}
    </div>
  );
};
