import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import axios from "axios";
import {API_BASE_URL ,APP_BASE_URL} from "../../config";
import {LOGIN} from "../../api";
import Header from "../../common/Header";
function LoginForm({setIsLoggedIn}:{
  setIsLoggedIn: any
}) {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    event.target.disabled = true;
    try {
      const response = await axios.post(`${API_BASE_URL}${LOGIN}`, {
        username: mobile,
        password: password,
        role: "customer",
      });
      setMobileError("");
      setPasswordError("");
      const token = response?.data?.token;
      if (token) {
        localStorage.setItem("token", token);
        setIsLoggedIn(true)
      }
      const Error = response?.data?.message;
      if (Error && Error == "Incorrect password") {
        setPasswordError("Incorrect Password");
      }
      if (Error && Error == "User not found") {
        setMobileError("User Not Found");
      }
      event.target.disabled = false;
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  const popover = (
    <Popover id="popover-password">
      <Popover.Body>Contact Agent to Know the password</Popover.Body>
    </Popover>
  );
  return (
    <MDBContainer fluid className="p-3 my-5 mx-5">
      <MDBRow className=" d-flex justify-content-center  align-items-center">
        <MDBCol col="10" md="6" className="mb-2 d-flex justify-content-center flex-column align-items-center">
          <Header version="v1" />
          <img
            src={`${APP_BASE_URL}/login-form.svg`}
            className="img-fluid"
            alt="Phone image"
          />
        </MDBCol>

        <MDBCol col="4" md="6">
          <MDBInput
            wrapperClass="mb-4"
            label="Mobile Number"
            id="mobileinput"
            type="text"
            size="lg"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />

          <MDBInput
            wrapperClass="mb-2"
            label="Password"
            id="passwordinput"
            type="password"
            size="lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {mobileError && <div className="text-danger">{mobileError}</div>}
          {passwordError && <div className="text-danger">{passwordError}</div>}
          <div className="d-flex justify-content-between mb-4">
            <OverlayTrigger
              trigger={["click", "hover"]}
              placement="auto"
              overlay={popover}
            >
              <span style={{ cursor: "pointer" }}>
                Don't Know the password <FontAwesomeIcon icon={faInfoCircle} />
              </span>
            </OverlayTrigger>
          </div>

          <MDBBtn
            type="submit"
            className="mb-4 w-100"
            size="lg"
            onClick={handleSubmit}
          >
            Sign in
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default LoginForm;
