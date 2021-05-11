import React, { useEffect, useState } from "react";
import { walletServices } from "../../services/walletServices";
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

export default function UnPaidUsers() {
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState({ amount: "" });
  const [wallet_history, setWalletHistory] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [paidUsers, setPaidUsers] = useState([]);
  const [unPaidUsers, setUnPaidUsers] = useState([]);

  const initDataTable = () => {
    $(document).ready(function () {
      $("#example").DataTable({
        dom: "Bfrtip",
        buttons: [
          {
            extend: "pdf",
            title: "Unpaid Users Report",
          },
          {
            extend: "excel",
            title: "Unpaid Users Report",
          },
        ],
      });
    });
  };

  const destroyDataTable = () => {
    let table = $("#example").DataTable();
    table.destroy();
  };
  const getUnPaidUsers = async () => {
    try {
      setLoading(true);
      const response = await reportServices.unPaidUsers();
      if (response.data.success) {
        setUnPaidUsers(response.data.data.unpaid_users);
        initDataTable();
        setLoading(false);
        return;
      }
    } catch (error) {}
  };


  useEffect(() => {
    getUnPaidUsers()
    return function cleanup() {
      destroyDataTable();
    };
  },[]);

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
                <h4 className="card-title">Unpaid Users</h4>
               
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
                      {unPaidUsers.map((item, index) => {
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
