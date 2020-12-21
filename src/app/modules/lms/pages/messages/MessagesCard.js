import React, { useMemo, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  CardHeaderToolbar,
  Input,
  Select,
} from "../../../../../_metronic/_partials/controls";
import { Row } from "react-bootstrap";
import { MessagesTable } from "./messages-table/MessagesTable";
import { useMessagesUIContext } from "./MessagesUIContext";
import { useIntl } from "react-intl";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import * as usersAction from "../../_redux/users/usersActions";

import * as messagesAction from "../../_redux/messages/messagesActions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { eachDayOfInterval } from "date-fns";




import axios from 'axios'

export function MessagesCard({ saveMessage, message, actionsLoading, onHide }) {
  const { currentState } = useSelector(
    (state) => ({
      currentState: state.users,

    }),
    shallowEqual
  );

  const [curUser, setCurUser] = React.useState(null);

  const { entities } = currentState;

  const { realNames } = currentState;
  // Companies Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(usersAction.fetchMessageUsers());


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const intl = useIntl();
  const messagesUIContext = useMessagesUIContext();
  const messagesUIProps = useMemo(() => {
    return {
      ids: messagesUIContext.ids,
      newMessageButtonClick: messagesUIContext.newMessageButtonClick,
    };
  }, [messagesUIContext]);

  const handleUser = (Id, FirstName, LastName, Role) => {
    setCurUser({ Id, FirstName, LastName, Role });
  };

  useEffect(() => {
    if (entities !== null && entities !== undefined && entities.length !== 0)
      setCurUser({
        Id: entities[0].Id,
        FirstName: entities[0].FirstName,
        LastName: entities[0].LastName,
        Role: entities[0].Role,
      });
  }, [entities]);

  const handleRole = (Role) => {
    if (Role === 1) {
      return "Admin";
    } else if (Role === 2) {
      return "Şube Yetkilisi";
    } else if (Role === 3) {
      return "Eğitmen";
    } else if (Role === 4) {
      return "Katılımcı";
    }
    return "";
  };

  const [msgs, setMsgs] = React.useState(null)

  useEffect(() => {

    const queryParams = {
      filter: { Text: "", FromUserId: "" },
      pageNumber: 1,
      pageSize: 999999,
      sortField: "Id",
      sortOrder: "desc",
    }



    axios.post("/messages/find", { queryParams }).then((res) => {


      setMsgs(res.data.entities)


    })


  }, [])
  const handleNotReadMessagesCount = (Id) => {

    if (msgs !== null && msgs !== undefined) {

      let myId = null;
      for (let i = 0; i < msgs.length; i++) {
        if (msgs[i].Name === "Siz") {

          myId = msgs[i].CreatorUserId;
          break;
        }

      }

      if (myId === null) {
        let flag = false;
        for (let i = 0; i < msgs.length; i++) {
          if (msgs[i].Name !== "gönderen") {
            flag = true;
            break;
          }

        }
        if (!flag && msgs.length > 0) {
          myId = msgs[0].ToUserId
        }
        else {
          myId = 0;
        }

      }

      let counter = 0;

      if (myId !== null) {
        for (let i = 0; i < msgs.length; i++) {

          if (msgs[i].CreatorUserId === Id && msgs[i].ToUserId === myId && msgs[i].IsRead !== 1)

            counter++;
        }


        if (counter !== 0)
          return (

            <div

              className="btn btn-icon btn-clean btn-lg mr-1 pulse pulse-primary"

            >
              <span style={{ color: "orange" }} className="svg-icon svg-icon-xl svg-icon-primary">
                {
                  counter
                }
              </span>
              <span className="pulse-ring"></span>
              <span className="pulse-ring" />
            </div>
          )
        else {

          return (
            <div
              className="btn btn-icon btn-clean btn-lg mr-1 "
              id="kt_quick_notifications_toggle"
            >
              <span className="svg-icon svg-icon-xl svg-icon-primary">

              </span>

            </div>

          )
        }


      }


    }

  }
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{ ...message }}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          /* if (
            values.ToUserId === null ||
            values.ToUserId === undefined ||
            values.ToUserId === ""
          ) {*/
          if (curUser !== null && curUser !== undefined) {
            values.ToUserId = curUser.Id;
          }
          saveMessage(values);
          resetForm({ values: "" });

          document.querySelector("#msgarea").value = "";
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form>
              <Row style={{ display: "flex", justifyContent: "space-between" }}>
                <Card style={{ display: "flex", flex: "0.28" }}>
                  <CardBody>
                    <div
                      name="ToUserId"
                      label={intl.formatMessage({
                        id: "MESSAGES.NEW_EDIT.SELECT",
                      })}
                    >
                      {entities !== null &&
                        entities !== undefined &&
                        entities.map(({ Id, FirstName, LastName, Role }) => (
                          <>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                              <div onClick={() =>
                                handleUser(Id, FirstName, LastName, Role)
                              } style={{ color: "orange", fontSize: 20, marginRight: "1rem" }}>
                                {

                                  handleNotReadMessagesCount(Id)

                                }


                              </div>
                              <div
                                style={{ cursor: "pointer", marginRight: "1rem" }}
                                key={Id}
                                value={Id}
                                onClick={() =>
                                  handleUser(Id, FirstName, LastName, Role)
                                }
                              >
                                <strong>
                                  {FirstName} {LastName}
                                </strong>


                              </div>

                              <div>
                                {handleRole(Role)}

                              </div>
                              
                            </div>
                            <hr />
                          </>
                        ))}
                    </div>
                  </CardBody>
                </Card>

                <Card style={{ display: "flex", flex: "0.7" }}>
                  <CardHeader
                    title={
                      curUser !== null &&
                      curUser !== undefined &&
                      curUser.FirstName +
                      "  " +
                      curUser.LastName +
                      " | " +
                      handleRole(curUser.Role)
                    }
                  ></CardHeader>
                  <CardBody>
                    <MessagesTable curUser={curUser} />
                  </CardBody>

                  <>
                    <CardFooter>
                      <div>
                        <label>
                          {intl.formatMessage({
                            id: "MESSAGES.NEW_EDIT.MESSAGE",
                          })}
                        </label>
                        <Field
                          id="msgarea"
                          name="Text"
                          as="textarea"
                          className="form-control mb-2"
                        />
                      </div>
                      <button
                        type="submit"
                        onClick={() => handleSubmit()}
                        className="btn btn-success btn-elevate "
                      >
                        {intl.formatMessage({
                          id: "BUTTON.SEND",
                        })}
                      </button>
                    </CardFooter>
                  </>
                </Card>
              </Row>
            </Form>
          </>
        )}
      </Formik>

      {/*  <MessagesFilter />
            {messagesUIProps.ids.length > 0 && <MessagesGrouping />}
            <MessagesTable /> */}
    </>
  );
}
