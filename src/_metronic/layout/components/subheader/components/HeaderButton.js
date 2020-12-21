/* eslint-disable no-restricted-imports */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { withRouter } from "react-router";
import { Button } from "@material-ui/core";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

function HeaderButton({ match, history, location }) {
  const { isAuthorized, currentUser } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null,
      currentUser: auth.user,
    }),
    shallowEqual
  );

  function goUrl(url) {
    history.push(url);
  }

  if (location.pathname.includes("/lms/companies")) {
    return (
      <>
        <Button
          className="btn btn-warning"
          onClick={() => goUrl("/lms/course-packages/company-assign")}
        >
          Firma/Paket Tanımla
        </Button>
      </>
    );
  } else if (location.pathname == "/lms/courses/libraries") {
    return (
      <>
        <Button
          className="btn btn-warning"
          onClick={() => goUrl("/lms/library-categories")}
        >
          Kategoriler
        </Button>
      </>
    );
  } else if (location.pathname.includes("/lms/users/company/")) {
    return <></>;
  } else if (location.pathname == "/lms/courses") {
    return (
      <>
        {currentUser.Role === 1 ? (
          <Button
            className="btn btn-warning"
            onClick={() => goUrl("/lms/course-packages")}
          >
            Paketler
          </Button>
        ) : (
          ""
        )}
      </>
    );
  } else {
    return <></>;
  }
}

export const HeaderButtonWithHistory = withRouter(HeaderButton);
