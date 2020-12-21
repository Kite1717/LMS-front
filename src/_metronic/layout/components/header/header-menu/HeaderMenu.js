/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { checkIsActive } from "../../../../_helpers";

export function HeaderMenu({ layoutProps }) {
  const location = useLocation();
  const getMenuItemActive = (url) => {
    return checkIsActive(location, url) ? "menu-item-active" : "";
  };

  return (
    <>
      <div
        id="kt_header_menu"
        className={`header-menu header-menu-mobile ${layoutProps.ktMenuClasses}`}
        {...layoutProps.headerMenuAttributes}
      >
        {/*begin::Header Nav*/}
        <ul className={`menu-nav ${layoutProps.ulClasses}`}>
          {/*begin::1 Level*/}
          <li
            className={`menu-item menu-item-rel ${getMenuItemActive(
              "/dashboard"
            )}`}
          >
            {/* <NavLink className="menu-link" to="/home"> */}
      {/*       <div>
              Arıza Bildirimleri için: +90 312 512 7444
              <br />
              <a href="mailto:ariza@nesslearning.com">ariza@nesslearning.com</a>
            </div> */}

            {layoutProps.rootArrowEnabled && <i className="menu-arrow" />}
            {/*       </NavLink> */}
          </li>
          {/*end::1 Level*/}
        </ul>
      </div>
    </>
  );
}