import React, {useState}from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../../actions/authActions";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(authActions.login(email, password));
  };
  return (
    <div className="" style={{paddingTop:"10%"}} >
      <div className="login-form-bg h-100">
        <div className="container h-100">
          <div className="row justify-content-center h-100">
            <div className="col-xl-6">
              <div className="form-input-content">
                <div className="card login-form mb-0">
                  <div className="card-body pt-5">
                    <a className="text-center" href="index.html">
                      {" "}
                      <h4>Branch Login</h4>
                    </a>
                    <form  onSubmit={handleSubmit} className="mt-5 mb-5 login-input">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Username"
                          value={email}
                          onChange={ (e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          value={password}
                          onChange={ (e) => setPassword(e.target.value)}
                        />
                      </div>
                      <button className="btn login-form__btn submit w-100">
                        Sign In
                      </button>
                    </form>
                    {/* <p className="mt-5 login-form__footer">
                      Dont have account?{" "}
                      <a href="page-register.html" className="text-primary">
                        Sign Up
                      </a>{" "}
                      now
                    </p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
