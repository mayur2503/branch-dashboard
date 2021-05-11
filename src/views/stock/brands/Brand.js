import React, { useEffect, useState } from "react";
import Pagination from "../../../containers/Pagination";
import { Modal } from 'react-responsive-modal';
const pagination = [
  { name: "Dashboard", to: "/dashboard" },
  { name: "Stock", to: "/stock" },
  { name: "Brands", to: "/stock/brands" },
];
export default function Brand() {
    const [modal, toggleModal] = useState(false);

  useEffect(() => {
    console.log("Brand Render");
  }, []);
  return (
    <div className="content-body">
      <Pagination pagination={pagination} />
      {/* row */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <div className="card-title">
                    <div className=" d-flex justify-content-between">
                    <h4>Brands</h4>
                    <button className="btn btn-primary" onClick={ ()=> toggleModal(!modal)} >Add Brand</button>
                    </div>
                  
                </div>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>1</th>
                        <td>Kolor Tea Shirt For Man</td>
                        <td>
                          <span className="badge badge-primary px-2">Sale</span>
                        </td>
                        <td>January 22</td>
                        <td className="color-primary">$21.56</td>
                      </tr>
                      <tr>
                        <th>2</th>
                        <td>Kolor Tea Shirt For Women</td>
                        <td>
                          <span className="badge badge-danger px-2">Tax</span>
                        </td>
                        <td>January 30</td>
                        <td className="color-success">$55.32</td>
                      </tr>
                      <tr>
                        <th>3</th>
                        <td>Blue Backpack For Baby</td>
                        <td>
                          <span className="badge badge-success px-2">
                            Extended
                          </span>
                        </td>
                        <td>January 25</td>
                        <td className="color-danger">$14.85</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* /# column */}
        </div>
      </div>
      {/* #/ container */}
      <Modal open={modal} onClose={() => toggleModal(!modal)} >
        <h2>Simple centered modal</h2>
      </Modal>
    </div>
  );
}
