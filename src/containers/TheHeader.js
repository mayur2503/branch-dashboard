import React from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../actions/authActions";
import userimg from '../assets/images/1.png'
export default function TheHeader() {
  const dispatch = useDispatch();
  const logout = (e) => {
    e.preventDefault()
    dispatch(authActions.logout());
  };
  return (
    <div className="header">
      <div className="header-content clearfix">
        <div className="nav-control">
          <div className="hamburger">
            <span className="toggle-icon">
              <i className="icon-menu" />
            </span>
          </div>
        </div>
        
        <div className="header-right">
          <ul className="clearfix">
            <li className="icons dropdown">
              <div
                className="user-img c-pointer position-relative"
                data-toggle="dropdown"
              >
                <span className="activity active" />
                <img src={userimg} height={40} width={40} alt />
              </div>
              <div className="drop-down dropdown-profile animated fadeIn dropdown-menu">
                <div className="dropdown-content-body">
                  <ul>
                    {/* <li>
                      <a href="app-profile.html">
                        <i className="icon-user" /> <span>Profile</span>
                      </a>
                    </li>
                     */}
                    <li>
                      <a href="#" onClick={ (event)=> logout(event)}>
                        <i className="icon-key" /> <span>Logout</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
