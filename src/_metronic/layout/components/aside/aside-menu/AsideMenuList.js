/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import SVG from "react-inlinesvg";

import { NavLink } from "react-router-dom";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";
import { getUserInfo } from "../../../../../utils/user.util";
export function AsideMenuList({ layoutProps }) {
  const location = useLocation();
  let userInfo = getUserInfo();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${
          !hasSubmenu && "menu-item-active"
        } menu-item-open menu-item-not-hightlighted`
      : "";
  };

  return (
    <>
      {userInfo?.role === "62ac604fa4b4efb675d579a5" && (
        <ul className={`menu-nav ${layoutProps.ulClasses}`}>
          <li
            className={`menu-item ${getMenuItemActive("/dashboard", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/dashboard">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}
                />
              </span>
              <span className="menu-text">Dashboard</span>
            </NavLink>
          </li>

          <li
            className={`menu-item ${getMenuItemActive("/category", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/category">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}
                />
              </span>
              <span className="menu-text">Category</span>
            </NavLink>
          </li>

          <li
            className={`menu-item ${getMenuItemActive("/newsletter", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/newsletter">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}
                />
              </span>
              <span className="menu-text">New Page</span>
            </NavLink>
          </li>
        </ul>
      )}
    </>
  );
}
