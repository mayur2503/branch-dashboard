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
import { Loader } from "semantic-ui-react";

pdfMake.vfs = pdfFonts.pdfMake.vfs;
window.JSZip = jsZip;

//datatables.net-buttons
export default function Wallet() {
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState({ amount: "" });
  const [wallet_history, setWalletHistory] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const getWallet = async () => {
    try {
      setLoading(true);
      const response = await walletServices.wallet();
      if (response.data.success) {
        setWallet(response.data.data.wallet);
        setLoading(false);
        return;
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const initDataTable = () => {
    $(document).ready(function () {
      var printCounter = 0;
      $("#example").DataTable({
        dom: "Bfrtip",
        buttons: ["excel", "pdf", "print"],
      });
    });
  };

  const getWalletHistory = async () => {
    try {
      const response = await walletServices.walletHistory(from, to);
      if (response.data.success) {
        setWalletHistory(response.data.data.wallet_history);
        initDataTable();
        return;
      }
    } catch (error) {}
  };
  useEffect(() => {
    getWallet();
    getWalletHistory();
  }, []);
  return (
    <div className="content-body">
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-lg-3 col-sm-6">
            <div className="card gradient-2">
              <div className="card-body">
                <h3 className="card-title text-white">Wallet Balance</h3>
                <div className="d-inline-block">
                  <h2 className="text-white">
                    <i className="fa fa-inr" aria-hidden="true"></i>
                    {"  "}
                    {loading ? (
                      <Loader size="small" active inline />
                    ) : (
                      wallet.amount
                    )}
                  </h2>
                </div>
                <span className="float-right display-5 opacity-5">
                  <i className="fa fa-suitcase" />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Wallet Transaction History</h4>
                <div className="table-responsive">
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
