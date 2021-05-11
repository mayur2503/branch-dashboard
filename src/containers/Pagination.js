import React from "react";
import { Link } from "react-router-dom";
export default function Pagination({ pagination }) {
  return (
    <div className="row page-titles mx-0">
      <div className="col p-md-0">
        <ol className="breadcrumb">
          {pagination.map((item, index) => {
            return (
              <li key={index} className="breadcrumb-item">
                <Link to={item.to}>{item.name}</Link>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
