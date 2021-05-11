import React from "react";
import { NavLink ,Link } from 'react-router-dom';
export default function CreateSideBar({ item }) {
  return (
    <>
      {item._chlidrens.length ? (
        <li>
          <a
            className="has-arrow"
            href="javascript:void()"
            aria-expanded="false"
          >
            {item.icon}
            <span className="nav-text">{item.name}</span>
          </a>
          <ul aria-expanded="false">
              {
                  item._chlidrens.map( (link,index)=> {
                      return (
                        <NavLink to={link.to}> {link.name}</NavLink>
                      )
                  })
              }
          </ul>
        </li>
      ) : (
        <li>
          <NavLink to={item.to} aria-expanded="false">
            {item.icon}
            <span className="nav-text">{item.name}</span>
          </NavLink>
        </li>
      )}
    </>
  );
}
