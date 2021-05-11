import $ from "jquery";
import jsZip from "jszip";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
//import "datatables.net-bs4"; //datatables.net-buttons-dt
import "datatables.net-buttons-bs4"; //datatables.net-buttons
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.html5.js"; //datatables.net-buttons
import "datatables.net-buttons/js/buttons.print.js"; //datatables.net-buttons
import React, { useEffect, useState } from "react";
import { walletServices } from "../../services/walletServices";
import { Dimmer, Loader } from "semantic-ui-react";

pdfMake.vfs = pdfFonts.pdfMake.vfs;
window.JSZip = jsZip;

//datatables.net-buttons
export default function WalletHistory() {
  const [loading, setLoading] = useState(false);
  const [wallet_history, setWalletHistory] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const destroyDataTable = () => {
    let table = $("#example").DataTable();
    table.destroy();
  };

  const clearData = () => {
    setFrom("");
    setTo("");
    setWalletHistory([]);
    destroyDataTable();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    destroyDataTable();
    getWalletHistory(from, to);
  };

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
          },
        ],
      });
    });
  };

  const getWalletHistory = async (from, to) => {
    try {
      setLoading(true);
      const response = await walletServices.walletHistory(from, to);
      if (response.data.success) {
        setWalletHistory(response.data.data.wallet_history);
        initDataTable();
        setLoading(false);
        return;
      }
    } catch (error) {}
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
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Wallet Transaction History</h4>
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
                  <table className="table " id="example">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Debit</th>
                        <th>Credit</th>
                        <th>Current Balance</th>
                        <th>Remark</th>
                      </tr>
                    </thead>
                    <tbody>
                      {wallet_history.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.date}</td>
                            <td>
                              {item.transaction_type === "DEBIT" ? (
                                <>
                                  <i
                                    className="fa fa-minus text-danger"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  {item.amount}
                                </>
                              ) : (
                                "---"
                              )}
                            </td>
                            <td>
                              {item.transaction_type === "CREDIT" ? (
                                <>
                                  <i
                                    className="fa fa-plus text-success"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  {item.amount}
                                </>
                              ) : (
                                "---"
                              )}
                            </td>
                            <td>{item.current_amount}</td>
                            <td>{item.remark}</td>
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
