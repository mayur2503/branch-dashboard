import React, { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import Pagination from "../../containers/Pagination";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";
const pagination = [
  { name: "Dashboard", to: "/dashboard" },
  { name: "Leads", to: "/leads" },
];

const leadsData = [
  {
    lead_id: 1,
    name: "Mayur Vijay Kumbhar",
    phone: 914518667,
    email: "mayur1998k@gmail.com",
    service: "Cockroach",
    reference: "Mayur",
    comment: "kg gh",
    status: "PENDING",
    date: "",
    time: "",
    call_count: 5,
  },
  {
    lead_id: 1,
    name: "Mayur Vijay Kumbhar",
    phone: 914518667,
    email: "mayur1998k@gmail.com",
    service: "Cockroach",
    reference: "Mayur",
    comment: "kg gh",
    status: "PENDING",
    date: "",
    time: "",
    call_count: 5,
  },
];
export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [modal, toggleModal] = useState(false);
  const loadScript = (src, id) => {
    const script = document.createElement("script");
    script.async = true;
    script.type = "text/javascript";
    script.src = src;
    script.id = id;
    document.body.appendChild(script);
  };

  const unmountScript = (id) => {
    const scriptList = document.querySelectorAll(
      "script[type='text/javascript']"
    );
    const convertedNodeList = Array.from(scriptList);
    const testScript = convertedNodeList.find((script) => script.id === id);
    testScript.parentNode.removeChild(testScript);
  };

  useEffect(() => {
    loadScript("plugins/tables/js/jquery.dataTables.min.js", "id1");
    loadScript(
      "plugins/tables/js/datatable/dataTables.bootstrap4.min.js",
      "id2"
    );
    loadScript(
      "plugins/tables/js/datatable-init/datatable-basic.min.js",
      "id3"
    );
    // Specify how to clean up after this effect:
    return function cleanup() {
      unmountScript("id1");
      unmountScript("id2");
      unmountScript("id3");
    };
  });
  useEffect(() => {
    setLeads(leadsData);
  }, []);
  return (
    <div className="content-body">
      <Pagination pagination={pagination} />
      {/* row */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              
                <Dimmer active inverted>
                  <Loader />
                </Dimmer>
              <div className="card-body">
                <div className="card-title">
                  <div className=" d-flex justify-content-between">
                    <h4>Leads</h4>
                    <button
                      className="btn btn-primary"
                      onClick={() => toggleModal(!modal)}
                    >
                      New Lead
                    </button>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-bordered zero-configuration">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>NAME</th>
                        <th>CONTACT</th>
                        <th>SERVICE</th>
                        <th>REFERENCE</th>
                        <th>COMMENT</th>
                        <th>STATUS</th>
                        <th>CONTACT DATE/TIME</th>
                        <th>CALL COUNT</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.map((lead, index) => {
                        return (
                          <tr>
                            <td>{index + 1}</td>
                            <td>{lead.name}</td>
                            <td>{lead.phone}</td>
                            <td>{lead.service}</td>
                            <td>{lead.reference}</td>
                            <td>{lead.comment}</td>
                            <td>{lead.status}</td>
                            <td>{lead.date}</td>
                            <td>{lead.call_count}</td>
                            <td>
                              <button
                                title="Convert To Client"
                                type="button"
                                className="btn m-1 btn-sm btn-success"
                              >
                                <i
                                  className="fa fa-check"
                                  aria-hidden="true"
                                ></i>
                              </button>
                              <button
                                title="Edit"
                                type="button"
                                className="btn m-1 btn-sm btn-primary"
                              >
                                <i
                                  className="fa fa-pencil"
                                  aria-hidden="true"
                                ></i>
                              </button>
                              <button
                                title="History"
                                type="button"
                                className="btn m-1 btn-sm btn-info"
                              >
                                <i
                                  className="fa fa-history"
                                  aria-hidden="true"
                                ></i>
                              </button>
                              <button
                                title="Delete"
                                type="button"
                                className="btn m-1 btn-sm btn-danger"
                              >
                                <i
                                  className="fa fa-trash-o"
                                  aria-hidden="true"
                                ></i>
                              </button>
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
      <Modal open={modal} onClose={() => toggleModal(!modal)}>
        <h2>Simple centered modal</h2>
      </Modal>
    </div>
  );
}
