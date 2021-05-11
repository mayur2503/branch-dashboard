import React, { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import Pagination from "../../containers/Pagination";
import { Dimmer, Loader } from "semantic-ui-react";
import { masterServices } from "../../services/masterServices";
import { toastr } from "react-redux-toastr";
import { useHistory } from "react-router-dom";
import { userServices } from "../../services/userServices";
import $ from "jquery";
import jsZip from "jszip";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
//import "datatables.net-bs4"; //datatables.net-buttons-dt
import "datatables.net-buttons-bs4"; //datatables.net-buttons
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.html5.js"; //datatables.net-buttons
import "datatables.net-buttons/js/buttons.print.js"; //datatables.net-buttons
pdfMake.vfs = pdfFonts.pdfMake.vfs;
window.JSZip = jsZip;
const pagination = [
  { name: "Dashboard", to: "/dashboard" },
  { name: "All Users", to: "/users/allusers" },
];

export default function AllUsers() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const getUsers = async (from, to) => {
    try {
      setLoading(true);
      const response = await userServices.allUsers(from, to);
      if (response.data.success) {
        setUsers(response.data.data.users);
        initDataTable();
        setLoading(false);
        return;
      }
      toastr.error(response.data.message);
    } catch (error) {
      toastr.error(error.response.data.message);
    }
  };

  const destroyDataTable = () => {
    let table = $("#example").DataTable();
    table.destroy();
  };

  const clearData = () => {
    setFrom("");
    setTo("");
    setUsers([]);
    destroyDataTable();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    destroyDataTable();
    getUsers(from, to);
  };

  const initDataTable = () => {
    $(document).ready(function () {
      $("#example").DataTable();
    });
  };

  useEffect(() => {
    return function cleanup() {
      destroyDataTable();
    };
  }, []);
  useEffect(() => {
    return function cleanup() {
      destroyDataTable();
    };
  });

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
                    <h4>All Users</h4>
                    <button
                      className="btn btn-primary"
                      onClick={() => history.push("/users/add-user")}
                    >
                      Add User
                    </button>
                  </div>
                </div>
                <div>
                  <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-row">
                      <div className="form-group col-md-2">
                        <label htmlFor="inputPassword4">From</label>
                        <input
                          required
                          type="date"
                          className="form-control"
                          value={from}
                          onChange={(e) => setFrom(e.target.value)}
                        />
                      </div>
                      <div className="form-group col-md-2">
                        <label htmlFor="inputPassword4">To</label>
                        <input
                          required
                          type="date"
                          className="form-control"
                          value={to}
                          onChange={(e) => setTo(e.target.value)}
                        />
                      </div>
                      <div className="form-group col-md-1">
                        <label htmlFor="inputPassword4">&nbsp;</label>
                        <button
                          type="submit"
                          className="btn form-control  btn-primary"
                        >
                          Show
                        </button>
                      </div>
                      <div className="form-group col-md-1">
                        <label htmlFor="inputPassword4">&nbsp;</label>
                        <button
                          type="button"
                          className="btn form-control  btn-primary"
                          onClick={() => clearData()}
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="table-responsive">
                  <Dimmer active={loading} inverted>
                    <Loader />
                  </Dimmer>
                  <table className="table table-bordered " id="example">
                    <thead>
                      <tr>
                        <th>#</th>
                        {/* <th>Course Name</th> */}
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((item, index) => {
                        return (
                          <tr>
                            <td>{item.text_id}</td>
                            {/* <td>{item.course}</td> */}
                            <td>{item.user_name}</td>
                            <td>{item.user_mobile}</td>
                            <td>
                              <button
                                title="View"
                                type="button"
                                className="btn m-1 btn-sm btn-primary"
                                onClick={() =>
                                  history.push(`/users/profile/${item.id}`)
                                }
                              >
                                <i className="fa fa-eye" aria-hidden="true"></i>{" "}
                                View Profile
                              </button>
                              {/* <button
                                title="Delete"
                                type="button"
                                className="btn m-1 btn-sm btn-danger"
                                
                              >
                                <i
                                  className="fa fa-trash-o"
                                  aria-hidden="true"
                                ></i>
                              </button> */}
                            </td>
                          </tr>
                        );
                      })}
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
    </div>
  );
}
