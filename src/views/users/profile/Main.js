import React, { useState, useEffect } from "react";
import BASE_URL from "../../../utils/baseurl";
import GeneralDetails from "./GeneralDetails";
import { useParams } from "react-router-dom";
import { userServices } from "../../../services/userServices";
import { Modal } from "react-responsive-modal";
import { toastr } from "react-redux-toastr";
import ProfileImage from "./ProfileImage";
import ContactDetails from "./ContactDetails";
import PersonalDetails from "./PersonalDetails";

export default function Main(props) {
  const [modal, toggleModal] = useState(false);
  const [plans, setPlans] = useState([]);
  const [activePlan, setActivePlan] = useState(null);
  const { id } = useParams();
  const {user,loadUser} = props

  const getPlans = async () => {
    try {
      const response = await userServices.getPlans();
      if (response.data.success) {
        setPlans(response.data.data.plans);
        return;
      }
    } catch (error) {}
  };
  const getActivePlan = async (id) => {
    try {
      const response = await userServices.getActivePlan(id);
      if (response.data.success) {
        setActivePlan(response.data.data.activeplan);
        return;
      }
      getPlans();
    } catch (error) {}
  };

  const activatePlan = async (user_id,plan_id) => {
    try {
      const response = await userServices.activatePlan(user_id,plan_id);
      if (response.data.success) {
        toastr.success(response.data.message);
        toggleModal(!modal);
        loadUser()
        return;
      }
      toastr.error(response.data.message);
    } catch (error) {
      toastr.error(error.response.data.message);
    }
  }

  const activatePlanHandler = async (plan_id) => {
    activatePlan(id,plan_id);
  }

  useEffect(() => {
    getActivePlan(id);
  }, []);

  return (
    <div className="row">
      <div className="col-lg-4 col-xl-3">
        <div className="card">
          <div className="card-body">
            <div className=" d-flex justify-content-end align-items-end mb-4">
              <ProfileImage url={BASE_URL + user.profile_image_url} {...props} />
              <div className="media-body">
                <h3 className="mb-0">{user.user_name}</h3>
                <p className="text-muted mb-0">Wallet Balance : <i className="fa fa-inr" aria-hidden="true"></i> {user.wallet.wallet - user.wallet.wallet_withdraw}</p>
              </div>
            </div>
            {activePlan != null ? (
              <div className="row ">
                <div className="col-md-12">
                  <div className="card mt-4">
                    <div className=" card-profile  mb-2">
                      <h3>Plan Details</h3>
                    </div>
                    <ul className="card-profile__info">
                      <li className="mb-1">
                        <strong className="text-dark mr-4">Total Views</strong>{" "}
                        <span>{activePlan.total_views}</span>
                      </li>
                      <li className="mb-1">
                        <strong className="text-dark mr-4">
                          Available View
                        </strong>{" "}
                        <span>{activePlan.available_views}</span>
                      </li>
                      <li>
                        <strong className="text-dark mr-4">Used Views</strong>{" "}
                        <span>{activePlan.used_views}</span>
                      </li>
                      <li>
                        <strong className="text-dark mr-4">
                          Activated Date
                        </strong>{" "}
                        <span>{activePlan.activated_at}</span>
                      </li>
                      <li>
                        <strong className="text-dark mr-4">
                          Expiring Date
                        </strong>{" "}
                        <span>{activePlan.expiring_at}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : null}
            <div className="row mb-5">
              {activePlan === null ? (
                <div className="col-12 text-center">
                  <button
                    className="btn btn-danger px-5"
                    onClick={() => toggleModal(!modal)}
                  >
                    Activate Plan
                  </button>
                </div>
              ) : null}
            </div>
            <ul className="card-profile__info">
              <li className="mb-1">
                <strong className="text-dark mr-4">Profile ID</strong>{" "}
                <span>{user.text_id}</span>
              </li>
              <li className="mb-1">
                <strong className="text-dark mr-4">Mobile</strong>{" "}
                <span>{user.user_mobile}</span>
              </li>
              <li>
                <strong className="text-dark mr-4">Email</strong>{" "}
                <span>{user.user_email}</span>
              </li>
              <li>
                <strong className="text-dark mr-4">Last login</strong>{" "}
                <span>{user.last_login}</span>
              </li>
              <li>
                <strong className="text-dark mr-4">Profile Created</strong>{" "}
                <span>{user.created_at}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-lg-8 col-xl-9">
        <GeneralDetails data={user.general_details} />
        <ContactDetails  data={user.contact_details} />
        <PersonalDetails data={user.persoanl_details} />
        <div className="card">
          <div className="card-body">
            <div className="media media-reply">
              <img
                className="mr-3 circle-rounded"
                src="images/avatar/2.jpg"
                width={50}
                height={50}
                alt="Generic placeholder image"
              />
              <div className="media-body">
                <div className="d-sm-flex justify-content-between mb-2">
                  <h5 className="mb-sm-0">
                    Milan Gbah{" "}
                    <small className="text-muted ml-3">about 3 days ago</small>
                  </h5>
                  <div className="media-reply__link">
                    <button className="btn btn-transparent p-0 mr-3">
                      <i className="fa fa-thumbs-up" />
                    </button>
                    <button className="btn btn-transparent p-0 mr-3">
                      <i className="fa fa-thumbs-down" />
                    </button>
                    <button className="btn btn-transparent text-dark font-weight-bold p-0 ml-2">
                      Reply
                    </button>
                  </div>
                </div>
                <p>
                  Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                  scelerisque ante sollicitudin. Cras purus odio, vestibulum in
                  vulputate at, tempus viverra turpis. Fusce condimentum nunc ac
                  nisi vulputate fringilla. Donec lacinia congue felis in
                  faucibus.
                </p>
                <ul>
                  <li className="d-inline-block">
                    <img
                      className="rounded"
                      width={60}
                      height={60}
                      src="images/blog/2.jpg"
                      alt
                    />
                  </li>
                  <li className="d-inline-block">
                    <img
                      className="rounded"
                      width={60}
                      height={60}
                      src="images/blog/3.jpg"
                      alt
                    />
                  </li>
                  <li className="d-inline-block">
                    <img
                      className="rounded"
                      width={60}
                      height={60}
                      src="images/blog/4.jpg"
                      alt
                    />
                  </li>
                  <li className="d-inline-block">
                    <img
                      className="rounded"
                      width={60}
                      height={60}
                      src="images/blog/1.jpg"
                      alt
                    />
                  </li>
                </ul>
                <div className="media mt-3">
                  <img
                    className="mr-3 circle-rounded circle-rounded"
                    src="images/avatar/4.jpg"
                    width={50}
                    height={50}
                    alt="Generic placeholder image"
                  />
                  <div className="media-body">
                    <div className="d-sm-flex justify-content-between mb-2">
                      <h5 className="mb-sm-0">
                        Milan Gbah{" "}
                        <small className="text-muted ml-3">
                          about 3 days ago
                        </small>
                      </h5>
                      <div className="media-reply__link">
                        <button className="btn btn-transparent p-0 mr-3">
                          <i className="fa fa-thumbs-up" />
                        </button>
                        <button className="btn btn-transparent p-0 mr-3">
                          <i className="fa fa-thumbs-down" />
                        </button>
                        <button className="btn btn-transparent p-0 ml-3 font-weight-bold">
                          Reply
                        </button>
                      </div>
                    </div>
                    <p>
                      Cras sit amet nibh libero, in gravida nulla. Nulla vel
                      metus scelerisque ante sollicitudin. Cras purus odio,
                      vestibulum in vulputate at, tempus viverra turpis. Fusce
                      condimentum nunc ac nisi vulputate fringilla. Donec
                      lacinia congue felis in faucibus.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="media media-reply">
              <img
                className="mr-3 circle-rounded"
                src="images/avatar/2.jpg"
                width={50}
                height={50}
                alt="Generic placeholder image"
              />
              <div className="media-body">
                <div className="d-sm-flex justify-content-between mb-2">
                  <h5 className="mb-sm-0">
                    Milan Gbah{" "}
                    <small className="text-muted ml-3">about 3 days ago</small>
                  </h5>
                  <div className="media-reply__link">
                    <button className="btn btn-transparent p-0 mr-3">
                      <i className="fa fa-thumbs-up" />
                    </button>
                    <button className="btn btn-transparent p-0 mr-3">
                      <i className="fa fa-thumbs-down" />
                    </button>
                    <button className="btn btn-transparent p-0 ml-3 font-weight-bold">
                      Reply
                    </button>
                  </div>
                </div>
                <p>
                  Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                  scelerisque ante sollicitudin. Cras purus odio, vestibulum in
                  vulputate at, tempus viverra turpis. Fusce condimentum nunc ac
                  nisi vulputate fringilla. Donec lacinia congue felis in
                  faucibus.
                </p>
              </div>
            </div>
            <div className="media media-reply">
              <img
                className="mr-3 circle-rounded"
                src="images/avatar/2.jpg"
                width={50}
                height={50}
                alt="Generic placeholder image"
              />
              <div className="media-body">
                <div className="d-sm-flex justify-content-between mb-2">
                  <h5 className="mb-sm-0">
                    Milan Gbah{" "}
                    <small className="text-muted ml-3">about 3 days ago</small>
                  </h5>
                  <div className="media-reply__link">
                    <button className="btn btn-transparent p-0 mr-3">
                      <i className="fa fa-thumbs-up" />
                    </button>
                    <button className="btn btn-transparent p-0 mr-3">
                      <i className="fa fa-thumbs-down" />
                    </button>
                    <button className="btn btn-transparent p-0 ml-3 font-weight-bold">
                      Reply
                    </button>
                  </div>
                </div>
                <p>
                  Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                  scelerisque ante sollicitudin. Cras purus odio, vestibulum in
                  vulputate at, tempus viverra turpis. Fusce condimentum nunc ac
                  nisi vulputate fringilla. Donec lacinia congue felis in
                  faucibus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={modal}
        onClose={() => toggleModal(!modal)}
        classNames={{
          modal: "profile_modal_container",
        }}
      >
        <div className="row">
          <div className="col-md-12 mb-3">
            <h1>Activate Plan</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              <table className="table table-bordered zero-configuration">
                <thead>
                  <tr>
                    <th>#</th>
                    {/* <th>Course Name</th> */}
                    <th>Title</th>
                    <th>Views</th>
                    <th>Rate</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map((item, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        {/* <td>{item.course}</td> */}
                        <td>{item.plan_title}</td>
                        <td>{item.view}</td>
                        <td><i className="fa fa-inr" aria-hidden="true"></i> {item.rate}</td>
                        <td>
                          <button
                            title="View"
                            type="button"
                            className="btn m-1 btn-sm btn-primary"
                            disabled={(item.type==='WALLET')?true:false}
                            onClick={ ()=> activatePlanHandler(item.id)}
                          >
                            Activate
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
      </Modal>
    </div>
  );
}
