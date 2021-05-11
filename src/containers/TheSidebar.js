import React from "react";
import CreateSideBar from "./CreateSideBar";
import navigation from './_nav'
export default function TheSidebar() {
  return (
    <div className="nk-sidebar">
      <div className="nk-nav-scroll">
        <ul className="metismenu" id="menu">
          <li className="nav-label">Dashboard</li>
          {navigation.map( (item,index)=> {
            return <CreateSideBar item={item} />
          })}
          
          </ul>
      </div>
    </div>
  );
}
