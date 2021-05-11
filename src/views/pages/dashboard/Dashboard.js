import React, { useEffect, useState } from "react";
import { walletServices } from "../../../services/walletServices";
import { Loader } from "semantic-ui-react";
import CanvasJSReact from "../../../assets/canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const getDashboardData = async () => {
    try {
      setLoading(true);
      const response = await walletServices.dashboardData();
      if (response.data.success) {
        setDashboard(response.data.data);
        setLoading(false);
        return;
      }
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    getDashboardData();
  }, []);

  const options = {
    animationEnabled: true,
    title: {
      text: "Monthly Sales - 2017",
    },
    axisX: {
      valueFormatString: "MMM",
    },
    axisY: {
      title: "Sales (in USD)",
      prefix: "$",
    },
    data: [
      {
        yValueFormatString: "$#,###",
        xValueFormatString: "MMMM",
        type: "spline",
        dataPoints: [
          { x: new Date(2017, 0), y: 25060 },
          { x: new Date(2017, 1), y: 27980 },
          { x: new Date(2017, 2), y: 42800 },
          { x: new Date(2017, 3), y: 32400 },
          { x: new Date(2017, 4), y: 35260 },
          { x: new Date(2017, 5), y: 33900 },
          { x: new Date(2017, 6), y: 40000 },
          { x: new Date(2017, 7), y: 52500 },
          { x: new Date(2017, 8), y: 32300 },
          { x: new Date(2017, 9), y: 42000 },
          { x: new Date(2017, 10), y: 37160 },
          { x: new Date(2017, 11), y: 38400 },
        ],
      },
    ],
  };
  return (
    <div className="content-body">
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-lg-3 col-sm-6">
            <div className="card gradient-1">
              <div className="card-body">
                <h3 className="card-title text-white">Total Users</h3>
                <div className="d-inline-block">
                  <h2 className="text-white">
                    {" "}
                    {loading ? (
                      <Loader size="small" active inline />
                    ) : (
                      dashboard.total_users
                    )}
                  </h2>
                </div>
                <span className="float-right display-5 opacity-5">
                  <i className="fa fa-users" />
                </span>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="card gradient-3">
              <div className="card-body">
                <h3 className="card-title text-white">Paid Users</h3>
                <div className="d-inline-block">
                  <h2 className="text-white">
                    {" "}
                    {loading ? (
                      <Loader size="small" active inline />
                    ) : (
                      dashboard.paid_users
                    )}
                  </h2>
                </div>
                <span className="float-right display-5 opacity-5">
                  <i className="fa fa-users" />
                </span>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="card gradient-2">
              <div className="card-body">
                <h3 className="card-title text-white">Wallet Balance</h3>
                <div className="d-inline-block">
                  <h2 className="text-white">
                    <i className="fa fa-inr" />{" "}
                    {loading ? (
                      <Loader size="small" active inline />
                    ) : (
                      dashboard.wallet
                    )}
                  </h2>
                </div>
                <span className="float-right display-5 opacity-5">
                  <i className="fa fa-inr" />
                </span>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="card gradient-4">
              <div className="card-body">
                <h3 className="card-title text-white">Total Profit</h3>
                <div className="d-inline-block">
                  <h2 className="text-white">
                    <i className="fa fa-inr" />{" "}
                    {loading ? (
                      <Loader size="small" active inline />
                    ) : (
                      dashboard.total_profit
                    )}
                  </h2>
                </div>
                <span className="float-right display-5 opacity-5">
                  <i className="fa fa-inr" />
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="row">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <CanvasJSChart
                      options={options}
                     
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        
      </div>
      {/* #/ container */}
    </div>
  );
}
