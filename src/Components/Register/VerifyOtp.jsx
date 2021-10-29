import React, { useEffect, useState } from "react";
import { Grid, Card } from "@material-ui/core";
import HOC from "../../Common/HOC.jsx";
import axios from "axios";
import { getBaseUrl } from "../../utils";

//css file
import "./Register.css";

//used image
import login from "../images/login.png";
import { Button, TextField } from "@material-ui/core";

function VerifyOtp(props) {
  console.log("props:::", props);

  //phone number
  let phone = props.location.state.phone;

  //local state
  const [otp, setotp] = useState("");
  const [mobileNumber, setmobileNumber] = useState("");

  const Verify = () => {
    try {
      let url = getBaseUrl() + "api/users/verify-otp";
      let temp = {
        mobileNumber,
        otp,
      };
      axios.post(url, temp).then(
        (res) => {
          console.log("data response:::", res);
          props.history.push("/home");
        },
        (error) => {
          console.log("data response error:::", error);
        }
      );
    } catch (error) {
      console.log("data response error:::", error);
    }
  };
  useEffect(() => {
    setmobileNumber(phone);
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="pages_back_color">
        <div className="content_padding">
          <Grid className="Component_main_grid mt-5 p-4">
            <Grid item md={6} className="p-3">
              <Card className="p-2 mt-2 Card_shadow">
                <div className="page_heading m-3">Verify OTP</div>
                <div className="mt-2 mb-2">
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    value={mobileNumber}
                    disabled={true}
                  />
                </div>
                <div className="mt-4 mb-4">
                  <TextField
                    id="outlined-basic"
                    label="4-digit code*"
                    variant="outlined"
                    value={otp}
                    onChange={(e) => {
                      setotp(e.target.value);
                    }}
                  />
                </div>

                <div className="mt-3 mb-3">
                  <Button
                    className="login_signup_button"
                    onClick={() => Verify}
                  >
                    Continue
                  </Button>
                </div>
              </Card>
            </Grid>
            <Grid item md={6} className="p-3">
              <img src={login} alt="" className="login_image" />
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}

export default HOC(VerifyOtp);
