/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink, useHistory } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";
import { useIntl } from "react-intl";
import { shallowEqual, useSelector } from "react-redux";
import axios from "axios";

import { Beforeunload } from "react-beforeunload";
export function AsideMenuList({ layoutProps }) {
  const { isAuthorized, currentUser } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null,
      currentUser: auth.user,
    }),
    shallowEqual
  );

  const location = useLocation();
  const intl = useIntl();

  const getMenuItemActive = (url) => {
    return checkIsActive(location, url)
      ? " menu-item-active menu-item-open "
      : "";
  };

  const history = useHistory();
  const logoutClick = () => {
    axios.get("/activity-logs/exit").then((res) => {
      const toggle = document.getElementById("kt_quick_user_toggle");
      if (toggle) {
        toggle.click();
      }

      history.push("/logout");
    });
  };

  if (currentUser.Role === 1) {
    return (
      <>
        <Beforeunload onBeforeunload={() => "You'll lose your data!"} />
        {/* begin::Menu Nav */}
        <ul className={`menu-nav ${layoutProps.ulClasses}`}>
          {/*begin::1 Level*/}
          <li
            className={`menu-item ${getMenuItemActive("/builder")}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/lms/admin-dashboard">
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl("/media/svg/icons/Home/Home.svg")} />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.MAIN" })}
              </span>
            </NavLink>
          </li>
          {/*end::1 Level*/}

          {/*begin::1 Level*/}
            <li
            className={`menu-item ${getMenuItemActive("/builder")}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/lms/companies">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Home/Building.svg")}
                />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.COMPANIES" })}
              </span>
            </NavLink>
          </li>     
          {/*end::1 Level*/}

          {/*begin::1 Level*/}
          <li
            className={`menu-item ${getMenuItemActive("/builder")}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/lms/users/company/0">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl(
                    "/media/svg/icons/Communication/Group.svg"
                  )}
                />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.USERS" })}
              </span>
            </NavLink>
          </li>
          {/*end::1 Level*/}

          {/*begin::1 Level*/}
          <li
            className={`menu-item ${getMenuItemActive("/builder")}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/lms/courses">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Home/Book-open.svg")}
                />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.TRAININGS" })}
              </span>
            </NavLink>
          </li>
          {/*end::1 Level*/}

          {/*begin::1 Level*/}
          <li
            className={`menu-item ${getMenuItemActive("/lms/exams")}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/lms/exams">
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl("/media/svg/icons/Home/Timer.svg")} />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.EXAMS" })}
              </span>
            </NavLink>
          </li>
          {/*end::1 Level*/}

          {/*begin::1 Level*/}
          <li
            className={`menu-item ${getMenuItemActive("/lms/visual-exams")}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/lms/visual-exams">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/General/Visible.svg")}
                />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.VISUALEXAMS" })}
              </span>
            </NavLink>
          </li>    
          {/*end::1 Level*/}

          {/*begin::1 Level*/}
          <li
            className={`menu-item ${getMenuItemActive("/builder")}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/lms/courses/question-banks">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl(
                    "/media/svg/icons/Code/Question-circle.svg"
                  )}
                />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.QUESTIONBANKS" })}
              </span>
            </NavLink>
          </li>
          {/*end::1 Level*/}

          {/*begin::1 Level*/}
        <li
            className={`menu-item ${getMenuItemActive("/builder")}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/lms/courses/libraries">
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Image.svg")} />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.IMAGELIBRARY" })}
              </span>
            </NavLink>
          </li>   
          {/*end::1 Level*/}

          {/*begin::1 Level*/}
          <li
            className={`menu-item ${getMenuItemActive("/builder")}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/lms/quality-documents">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl(
                    "/media/svg/icons/Files/Selected-file.svg"
                  )}
                />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.DOCUMENTS" })}
              </span>
            </NavLink>
          </li>
          {/*end::1 Level*/}

          {/*begin::1 Level*/}
          <li
            className={`menu-item ${getMenuItemActive("/builder")}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/lms/meetings">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Devices/Display3.svg")}
                />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.MEETINGS" })}
              </span>
            </NavLink>
          </li>
          {/*end::1 Level*/}

          {/*begin::1 Level*/}
          <li
            className={`menu-item ${getMenuItemActive("/builder")}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/lms/meeting-calender">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Home/Alarm-clock.svg")}
                />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.CALENDER" })}
              </span>
            </NavLink>
          </li>
          {/*end::1 Level*/}

          {/*begin::1 Level*/}
          <li
            className={`menu-item ${getMenuItemActive("/builder")}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/lms/certificates">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Files/File-done.svg")}
                />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.CERTIFICATES" })}
              </span>
            </NavLink>
          </li>
          {/*end::1 Level*/}

          {/*begin::1 Level*/}
          <li
            className={`menu-item ${getMenuItemActive("/builder")}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/lms/polls">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl(
                    "/media/svg/icons/Communication/Clipboard-list.svg"
                  )}
                />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.SURVEYS" })}
              </span>
            </NavLink>
          </li>
          {/*end::1 Level*/}

          {/*begin::1 Level*/}
          <li
            className={`menu-item ${getMenuItemActive("/builder")}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/lms/messages">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl(
                    "/media/svg/icons/Communication/Chat1.svg"
                  )}
                />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.MESSAGES" })}
              </span>
            </NavLink>
          </li>
          {/*end::1 Level*/}

          {/*begin::1 Level*/}
          <li
            className={`menu-item ${getMenuItemActive("/builder")}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/lms/helps">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl(
                    "/media/svg/icons/Communication/Outgoing-mail.svg"
                  )}
                />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.HELP" })}
              </span>
            </NavLink>
          </li>
          {/*end::1 Level*/}

          {/*begin::1 Level*/}
          <li
            className={`menu-item menu-item-submenu ${getMenuItemActive(
              "/error"
            )}`}
            aria-haspopup="true"
            data-menu-toggle="hover"
          >
            <NavLink className="menu-link menu-toggle" to="/">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl(
                    "/media/svg/icons/Shopping/Chart-bar1.svg"
                  )}
                />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.REPORTS" })}
              </span>
              <i className="menu-arrow" />
            </NavLink>
            <div className="menu-submenu ">
              <i className="menu-arrow" />
              <ul className="menu-subnav">
                <li
                  className="menu-item  menu-item-parent"
                  aria-haspopup="true"
                >
                  <span className="menu-link">
                    <span className="menu-text">Error Pages</span>
                  </span>
                </li>

                {/*begin::2 Level*/}
                <li
                  className={`menu-item ${getMenuItemActive(
                    "/error/error-v1"
                  )}`}
                  aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/lms/system-reports">
                    <i className="menu-bullet menu-bullet-dot">
                      <span />
                    </i>
                    <span className="menu-text">Sistem Bazlı Raporlar</span>
                  </NavLink>
                </li>
                {/*end::2 Level*/}

                {/*begin::2 Level*/}
                <li
                  className={`menu-item ${getMenuItemActive(
                    "/error/error-v2"
                  )}`}
                  aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/lms/user-reports">
                    <i className="menu-bullet menu-bullet-dot">
                      <span />
                    </i>
                    <span className="menu-text">Kişi Bazlı Raporlar</span>
                  </NavLink>
                </li>
                {/*end::2 Level*/}

                {/*begin::2 Level*/}
                {/*  <li
                  className={`menu-item ${getMenuItemActive(
                    "/error/error-v2"
                  )}`}
                  aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/lms/user-messages">
                    <i className="menu-bullet menu-bullet-dot">
                      <span />
                    </i>
                    <span className="menu-text">Kullanıcı Mesaj Dökümü</span>
                  </NavLink>
                </li> */}
                {/*end::2 Level*/}
              </ul>
            </div>
          </li>
          {/*end::1 Level*/}

          {/* Custom */}

          {/* Error Pages */}
          {/*begin::1 Level*/}
          <li
            className={`menu-item menu-item-submenu ${getMenuItemActive(
              "/error"
            )}`}
            aria-haspopup="true"
            data-menu-toggle="hover"
          >
            <NavLink className="menu-link menu-toggle" to="/">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/General/Settings-2.svg")}
                />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.SETTINGS" })}
              </span>
              <i className="menu-arrow" />
            </NavLink>
            <div className="menu-submenu ">
              <i className="menu-arrow" />
              <ul className="menu-subnav">
                <li
                  className="menu-item  menu-item-parent"
                  aria-haspopup="true"
                >
                  <span className="menu-link">
                    <span className="menu-text">Error Pages</span>
                  </span>
                </li>

                {/*begin::2 Level*/}
                <li
                  className={`menu-item ${getMenuItemActive(
                    "/error/error-v1"
                  )}`}
                  aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/lms/system-logs">
                    <i className="menu-bullet menu-bullet-dot">
                      <span />
                    </i>
                    <span className="menu-text">
                      {intl.formatMessage({ id: "MENU.COMPANYTYPES" })}
                    </span>
                  </NavLink>
                </li>
                {/*end::2 Level*/}

                {/*begin::2 Level*/}
                <li
                  className={`menu-item ${getMenuItemActive(
                    "/error/error-v2"
                  )}`}
                  aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/lms/ip-adresses">
                    <i className="menu-bullet menu-bullet-dot">
                      <span />
                    </i>
                    <span className="menu-text">
                      {intl.formatMessage({ id: "MENU.IPCONFIG" })}
                    </span>
                  </NavLink>
                </li>
                {/*end::2 Level*/}

                {/*begin::2 Level*/}
                {/* <li
                  className={`menu-item ${getMenuItemActive(
                    "/error/error-v3"
                  )}`}
                  aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/">
                    <i className="menu-bullet menu-bullet-dot">
                      <span />
                    </i>
                    <span className="menu-text">
                      {intl.formatMessage({ id: "MENU.LOGS" })}
                    </span>
                  </NavLink>
                </li> */}
                {/*end::2 Level*/}
              </ul>
            </div>
          </li>
          {/*end::1 Level*/}

          {/*begin::1 Level*/}
          <li
            className={`menu-item ${getMenuItemActive("/builder")}`}
            aria-haspopup="true"
            onClick={logoutClick}
          >
            <NavLink className="menu-link" to="/auth/login">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Electric/Shutdown.svg")}
                />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.EXIT" })}
              </span>
            </NavLink>
          </li>

          {/*end::1 Level*/}
        </ul>

        {/* end::Menu Nav */}
      </>
    );
  } else if (currentUser.Role === 4) {
    return (
      <>
        {/* begin::Menu Nav */}
        <ul className={`menu-nav ${layoutProps.ulClasses}`}>
          <li
            className={`menu-item ${getMenuItemActive("/dashboard")}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/dashboard">
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl("/media/svg/icons/Home/Home.svg")} />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.MAIN" })}
              </span>
            </NavLink>
          </li>

          {/*begin::1 Level*/}
          <li
            className={`menu-item ${getMenuItemActive("/builder")}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/lms/my-profile">
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl("/media/svg/icons/General/User.svg")} />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.MYPROFILE" })}
              </span>
            </NavLink>
          </li>
          {/*end::1 Level*/}

          {/*begin::1 Level*/}
          <li
            className={`menu-item ${getMenuItemActive("/builder")}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/lms/my-educations">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Home/Book-open.svg")}
                />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.MYEDUCATIONS" })}
              </span>
            </NavLink>
          </li>
          {/*end::1 Level*/}

          {/*begin::1 Level*/}
          <li
            className={`menu-item ${getMenuItemActive("/builder")}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/lms/my-exams">
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl("/media/svg/icons/Home/Timer.svg")} />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.MYEXAMS" })}
              </span>
            </NavLink>
          </li>
          {/*end::1 Level*/}

          {/*begin::1 Level*/}
          <li
            className={`menu-item ${getMenuItemActive("/builder")}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/lms/my-certificates">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Files/File-done.svg")}
                />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.MYCERTIFICATES" })}
              </span>
            </NavLink>
          </li>
          {/*end::1 Level*/}

          {/*begin::1 Level*/}
          <li
            className={`menu-item ${getMenuItemActive("/builder")}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/lms/my-meetings">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Devices/Display3.svg")}
                />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.MYMEETINGS" })}
              </span>
            </NavLink>
          </li>
          {/*end::1 Level*/}

          <li
            className={`menu-item ${getMenuItemActive("/builder")}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/lms/messages">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl(
                    "/media/svg/icons/Communication/Chat1.svg"
                  )}
                />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.MESSAGES" })}
              </span>
            </NavLink>
          </li>
          <li
            className={`menu-item ${getMenuItemActive("/builder")}`}
            aria-haspopup="true"
            onClick={logoutClick}
          >
            <NavLink className="menu-link" to="/auth/login">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Electric/Shutdown.svg")}
                />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.EXIT" })}
              </span>
            </NavLink>
          </li>
        </ul>

        {/* end::Menu Nav */}
      </>
    );
  } else if (currentUser.Role === 2) {
    return (
      <>
        <ul className={`menu-nav ${layoutProps.ulClasses}`}>
          {/*begin::1 Level*/}
          <li
            className={`menu-item ${getMenuItemActive("/builder")}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/lms/company-dashboard">
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl("/media/svg/icons/Home/Home.svg")} />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.MAIN" })}
              </span>
            </NavLink>
          </li>
         
             <li
            className={`menu-item ${getMenuItemActive("/builder")}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/lms/companies">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Home/Building.svg")}
                />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.COMPANIES" })}
              </span>
            </NavLink>
          </li>    

          <li
            className={`menu-item ${getMenuItemActive("/builder")}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/lms/users/company/0">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl(
                    "/media/svg/icons/Communication/Group.svg"
                  )}
                />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.USERS" })}
              </span>
            </NavLink>
          </li>
          {/*end::1 Level*/}

          {/*begin::1 Level*/}
          <li
            className={`menu-item ${getMenuItemActive("/builder")}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/lms/course-package-companies">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Home/Book-open.svg")}
                />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.TRAININGS" })}
              </span>
            </NavLink>
          </li>
          {/*end::1 Level*/}

          {/*begin::1 Level*/}
          {/*  <li
            className={`menu-item ${getMenuItemActive("/lms/exams")}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/lms/exams">
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl("/media/svg/icons/Home/Timer.svg")} />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.EXAMS" })}
              </span>
            </NavLink>
          </li> */}
          {/*end::1 Level*/}

          {/*begin::1 Level*/}
            <li
            className={`menu-item ${getMenuItemActive("/lms/visual-exams")}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/lms/visual-exams">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/General/Visible.svg")}
                />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.VISUALEXAMS" })}
              </span>
            </NavLink>
          </li> 
          {/*end::1 Level*/}

          {/*begin::1 Level*/}
           <li
            className={`menu-item ${getMenuItemActive("/builder")}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/lms/courses/libraries">
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Image.svg")} />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.IMAGELIBRARY" })}
              </span>
            </NavLink>
          </li>   
          {/*end::1 Level*/}
          {/*begin::1 Level*/}
          <li
            className={`menu-item ${getMenuItemActive("/builder")}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/lms/quality-documents">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/General/Clipboard.svg")}
                />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.DOCUMENTS" })}
              </span>
            </NavLink>
          </li>
          {/*end::1 Level*/}

          {/*begin::1 Level*/}
          <li
            className={`menu-item ${getMenuItemActive("/builder")}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/lms/meeting-calender">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Home/Alarm-clock.svg")}
                />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.CALENDER" })}
              </span>
            </NavLink>
          </li>
          {/*end::1 Level*/}

          <li
            className={`menu-item ${getMenuItemActive("/builder")}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/lms/certificates">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Files/File-done.svg")}
                />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.CERTIFICATES" })}
              </span>
            </NavLink>
          </li>

          {/*begin::1 Level*/}
          <li
            className={`menu-item ${getMenuItemActive("/builder")}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/lms/messages">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl(
                    "/media/svg/icons/Communication/Chat1.svg"
                  )}
                />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.MESSAGES" })}
              </span>
            </NavLink>
          </li>
          {/*end::1 Level*/}

          <li
            className={`menu-item ${getMenuItemActive("/builder")}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/lms/helps">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl(
                    "/media/svg/icons/Communication/Outgoing-mail.svg"
                  )}
                />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.HELP" })}
              </span>
            </NavLink>
          </li>

          {/* Custom */}

          {/* Error Pages */}
          {/*begin::1 Level*/}
          {/*  <li
            className={`menu-item menu-item-submenu ${getMenuItemActive(
              "/error"
            )}`}
            aria-haspopup="true"
            data-menu-toggle="hover"
          >
            <NavLink className="menu-link menu-toggle" to="/">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/General/Settings-2.svg")}
                />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.SETTINGS" })}
              </span>
              <i className="menu-arrow" />
            </NavLink>
            <div className="menu-submenu ">
              <i className="menu-arrow" />
              <ul className="menu-subnav">
                <li
                  className="menu-item  menu-item-parent"
                  aria-haspopup="true"
                >
                  <span className="menu-link">
                    <span className="menu-text">Error Pages</span>
                  </span>
                </li> */}

          {/*begin::2 Level*/}
          {/*   <li
                  className={`menu-item ${getMenuItemActive(
                    "/error/error-v3"
                  )}`}
                  aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/">
                    <i className="menu-bullet menu-bullet-dot">
                      <span />
                    </i>
                    <span className="menu-text">
                      {intl.formatMessage({ id: "MENU.LOGS" })}
                    </span>
                  </NavLink>
                </li> */}
          {/*end::2 Level*/}
          {/*   </ul>
            </div>
          </li> */}
          {/*end::1 Level*/}

          {/*begin::1 Level*/}
          <li
            className={`menu-item menu-item-submenu ${getMenuItemActive(
              "/error"
            )}`}
            aria-haspopup="true"
            data-menu-toggle="hover"
          >
            <NavLink className="menu-link menu-toggle" to="/">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl(
                    "/media/svg/icons/Shopping/Chart-bar1.svg"
                  )}
                />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.REPORTS" })}
              </span>
              <i className="menu-arrow" />
            </NavLink>
            <div className="menu-submenu ">
              <i className="menu-arrow" />
              <ul className="menu-subnav">
                <li
                  className="menu-item  menu-item-parent"
                  aria-haspopup="true"
                >
                  <span className="menu-link">
                    <span className="menu-text">Error Pages</span>
                  </span>
                </li>

                {/*begin::2 Level*/}
                <li
                  className={`menu-item ${getMenuItemActive(
                    "/error/error-v1"
                  )}`}
                  aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/lms/system-reports">
                    <i className="menu-bullet menu-bullet-dot">
                      <span />
                    </i>
                    <span className="menu-text">Sistem Bazlı Raporlar</span>
                  </NavLink>
                </li>
                {/*end::2 Level*/}

                {/*begin::2 Level*/}
                <li
                  className={`menu-item ${getMenuItemActive(
                    "/error/error-v2"
                  )}`}
                  aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/lms/user-reports">
                    <i className="menu-bullet menu-bullet-dot">
                      <span />
                    </i>
                    <span className="menu-text">Kişi Bazlı Raporlar</span>
                  </NavLink>
                </li>
                {/*end::2 Level*/}

                {/*begin::2 Level*/}
                {/*   <li
                  className={`menu-item ${getMenuItemActive(
                    "/error/error-v2"
                  )}`}
                  aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/lms/user-messages">
                    <i className="menu-bullet menu-bullet-dot">
                      <span />
                    </i>
                    <span className="menu-text">Kullanıcı Mesaj Dökümü</span>
                  </NavLink>
                </li> */}
                {/*end::2 Level*/}
              </ul>
            </div>
          </li>
          {/*end::1 Level*/}

          {/*begin::1 Level*/}
          <li
            className={`menu-item ${getMenuItemActive("/builder")}`}
            aria-haspopup="true"
            onClick={logoutClick}
          >
            <NavLink className="menu-link" to="/auth/login">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Electric/Shutdown.svg")}
                />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.EXIT" })}
              </span>
            </NavLink>
          </li>

          {/*end::1 Level*/}
        </ul>

        {/* end::Menu Nav */}
      </>
    );
  } else if (currentUser.Role === 3) {
    // instructor

    return (
      <>
        <ul className={`menu-nav ${layoutProps.ulClasses}`}>
          {/*begin::1 Level*/}
          <li
            className={`menu-item ${getMenuItemActive("/builder")}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/lms/instructor-dashboard">
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl("/media/svg/icons/Home/Home.svg")} />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.MAIN" })}
              </span>
            </NavLink>
          </li>
          {/*end::1 Level*/}

          <li
            className={`menu-item ${getMenuItemActive("/builder")}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/lms/users/company/0">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl(
                    "/media/svg/icons/Communication/Group.svg"
                  )}
                />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.USERS" })}
              </span>
            </NavLink>
          </li>

          <li
            className={`menu-item ${getMenuItemActive("/builder")}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/lms/courses">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Home/Book-open.svg")}
                />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.TRAININGS" })}
              </span>
            </NavLink>
          </li>

          {/*begin::1 Level*/}
          <li
            className={`menu-item ${getMenuItemActive("/lms/exams")}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/lms/exams">
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl("/media/svg/icons/Home/Timer.svg")} />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.EXAMS" })}
              </span>
            </NavLink>
          </li>
          {/*end::1 Level*/}

          {/*begin::1 Level*/}
            <li className={`menu-item ${getMenuItemActive("/lms/visual-exams")}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/lms/visual-exams">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/General/Visible.svg")}
                />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.VISUALEXAMS" })}
              </span>
            </NavLink>
          </li>   
          {/*end::1 Level*/}

          <li
            className={`menu-item ${getMenuItemActive("/builder")}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/lms/courses/question-banks">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl(
                    "/media/svg/icons/Code/Question-circle.svg"
                  )}
                />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.QUESTIONBANKS" })}
              </span>
            </NavLink>
          </li> 

          {/*begin::1 Level*/}
         <li
            className={`menu-item ${getMenuItemActive("/builder")}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/lms/courses/libraries">
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Image.svg")} />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.IMAGELIBRARY" })}
              </span>
            </NavLink>
          </li>  
          {/*end::1 Level*/}
          {/*begin::1 Level*/}
          <li
            className={`menu-item ${getMenuItemActive("/builder")}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/lms/meetings">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Devices/Display3.svg")}
                />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.MEETINGS" })}
              </span>
            </NavLink>
          </li>
          {/*end::1 Level*/}

          {/*begin::1 Level*/}
          <li
            className={`menu-item ${getMenuItemActive("/builder")}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/lms/meeting-calender">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Home/Alarm-clock.svg")}
                />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.CALENDER" })}
              </span>
            </NavLink>
          </li>
          {/*end::1 Level*/}

          <li
            className={`menu-item ${getMenuItemActive("/builder")}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/lms/certificates">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Files/File-done.svg")}
                />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.CERTIFICATES" })}
              </span>
            </NavLink>
          </li>

          {/*begin::1 Level*/}
          <li
            className={`menu-item ${getMenuItemActive("/builder")}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/lms/messages">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl(
                    "/media/svg/icons/Communication/Chat1.svg"
                  )}
                />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.MESSAGES" })}
              </span>
            </NavLink>
          </li>

          {/*end::1 Level*/}

          <li
            className={`menu-item ${getMenuItemActive("/builder")}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/lms/helps">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl(
                    "/media/svg/icons/Communication/Outgoing-mail.svg"
                  )}
                />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.HELP" })}
              </span>
            </NavLink>
          </li>

          {/* Custom */}

          {/* Error Pages */}
          {/*begin::1 Level*/}
          {/*  <li
            className={`menu-item menu-item-submenu ${getMenuItemActive(
              "/error"
            )}`}
            aria-haspopup="true"
            data-menu-toggle="hover"
          >
            <NavLink className="menu-link menu-toggle" to="/">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/General/Settings-2.svg")}
                />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.SETTINGS" })}
              </span>
              <i className="menu-arrow" />
            </NavLink>
            <div className="menu-submenu ">
              <i className="menu-arrow" />
              <ul className="menu-subnav">
                <li
                  className="menu-item  menu-item-parent"
                  aria-haspopup="true"
                >
                  <span className="menu-link">
                    <span className="menu-text">Error Pages</span>
                  </span>
                </li> */}

          {/*begin::2 Level*/}
          {/*  <li
                  className={`menu-item ${getMenuItemActive(
                    "/error/error-v3"
                  )}`}
                  aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/">
                    <i className="menu-bullet menu-bullet-dot">
                      <span />
                    </i>
                    <span className="menu-text">
                      {intl.formatMessage({ id: "MENU.LOGS" })}
                    </span>
                  </NavLink>
                </li> */}
          {/*end::2 Level*/}
          {/*   </ul>
            </div>
          </li> */}
          {/*end::1 Level*/}

          {/*begin::1 Level*/}
          {/*begin::1 Level*/}

          {/*begin::1 Level*/}
          <li
            className={`menu-item menu-item-submenu ${getMenuItemActive(
              "/error"
            )}`}
            aria-haspopup="true"
            data-menu-toggle="hover"
          >
            <NavLink className="menu-link menu-toggle" to="/">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl(
                    "/media/svg/icons/Shopping/Chart-bar1.svg"
                  )}
                />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.REPORTS" })}
              </span>
              <i className="menu-arrow" />
            </NavLink>
            <div className="menu-submenu ">
              <i className="menu-arrow" />
              <ul className="menu-subnav">
                <li
                  className="menu-item  menu-item-parent"
                  aria-haspopup="true"
                >
                  <span className="menu-link">
                    <span className="menu-text">Error Pages</span>
                  </span>
                </li>

                {/*begin::2 Level*/}
                <li
                  className={`menu-item ${getMenuItemActive(
                    "/error/error-v1"
                  )}`}
                  aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/lms/system-reports">
                    <i className="menu-bullet menu-bullet-dot">
                      <span />
                    </i>
                    <span className="menu-text">Sistem Bazlı Raporlar</span>
                  </NavLink>
                </li>
                {/*end::2 Level*/}

                {/*begin::2 Level*/}
                <li
                  className={`menu-item ${getMenuItemActive(
                    "/error/error-v2"
                  )}`}
                  aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/lms/user-reports">
                    <i className="menu-bullet menu-bullet-dot">
                      <span />
                    </i>
                    <span className="menu-text">Kişi Bazlı Raporlar</span>
                  </NavLink>
                </li>
                {/*end::2 Level*/}

                {/*begin::2 Level*/}
                {/*          <li
                  className={`menu-item ${getMenuItemActive(
                    "/error/error-v2"
                  )}`}
                  aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/lms/user-messages">
                    <i className="menu-bullet menu-bullet-dot">
                      <span />
                    </i>
                    <span className="menu-text">Kullanıcı Mesaj Dökümü</span>
                  </NavLink>
                </li> */}
                {/*end::2 Level*/}
              </ul>
            </div>
          </li>
          {/*end::1 Level*/}

          {/*end::1 Level*/}
          <li
            className={`menu-item ${getMenuItemActive("/builder")}`}
            aria-haspopup="true"
            onClick={logoutClick}
          >
            <NavLink className="menu-link" to="/auth/login">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Electric/Shutdown.svg")}
                />
              </span>
              <span className="menu-text">
                {intl.formatMessage({ id: "MENU.EXIT" })}
              </span>
            </NavLink>
          </li>

          {/*end::1 Level*/}
        </ul>

        {/* end::Menu Nav */}
      </>
    );
  }
}
