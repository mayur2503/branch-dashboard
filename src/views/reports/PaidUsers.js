import React, { useEffect, useState } from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import { reportServices } from "../../services/reportServices";
import $ from "jquery";
import jsZip from "jszip";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import "datatables.net-buttons-bs4"; //datatables.net-buttons
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.html5.js"; //datatables.net-buttons
import "datatables.net-buttons/js/buttons.print.js"; //datatables.net-buttons
pdfMake.vfs = pdfFonts.pdfMake.vfs;
window.JSZip = jsZip;

export default function PaidUsers() {
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState({ amount: "" });
  const [wallet_history, setWalletHistory] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [paidUsers, setPaidUsers] = useState([]);

  const initDataTable = () => {
    $(document).ready(function () {
      $("#example").DataTable({
        dom: "Bfrtip",
        buttons: [
          {
            extend: "pdf",
            title: "Paid Users Report",
          },
          {
            extend: "excel",
            title: "Paid Users Report",
            exportOptions: {
              modifier: {
                page: "current",
              },
            },
          },
        ],
      });
    });
  };

  const destroyDataTable = () => {
    let table = $("#example").DataTable();
    table.destroy();
  };
  const getPaidUsers = async (from,to) => {
    try {
      const response = await reportServices.paidUsers(from,to);
      if (response.data.success) {
        setPaidUsers(response.data.data.paid_users);
        initDataTable();
        setLoading(false);
        return;
      }
    } catch (error) {}
  };

  const clearData = () => {
    setFrom("");
    setTo("");
    setPaidUsers([]);
    destroyDataTable()
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    destroyDataTable()
    getPaidUsers(from,to)
  }

  useEffect(() => {
    return function cleanup() {
      destroyDataTable();
    };
  });
  return (
    <div className="content-body">
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Paid Users</h4>
                <div>
                  <form onSubmit={ (e) => handleSubmit(e)}>
                    <div className="form-row">
                      <div className="form-group col-md-2">
                        <label htmlFor="inputPassword4">From</label>
                        <input
                          required
                          type="date"
                          className="form-control"
                          value={from}
                          onChange={ (e) => setFrom(e.target.value)}
                        />
                      </div>
                      <div className="form-group col-md-2">
                        <label htmlFor="inputPassword4">To</label>
                        <input
                          required
                          type="date"
                          className="form-control"
                          value={to}
                          onChange={ (e) => setTo(e.target.value)}
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
                          onClick={ () => clearData()}
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
                  <table className="table" id="example">
                    <thead>
                      <tr>
                        <th>Profile ID</th>
                        <th>User Name</th>
                        <th>Mobile</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paidUsers.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{item.text_id}</td>
                            <td>{item.user_name}</td>
                            <td>{item.user_mobile}</td>
                            <td>{item.user_email}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* #/ container */}
    </div>
  );
}
