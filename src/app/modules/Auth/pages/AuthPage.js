/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Switch, Redirect } from "react-router-dom";
import { ContentRoute } from "../../../../_metronic/layout";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import "../../../../_metronic/_assets/sass/pages/login/classic/login-1.scss";
import Changepassword from "../pages/changepassowrd";
// import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import "swiper/swiper.scss";

// import Image1 from "../../../../_metronic/layout/components/arts/image1.png";
// import Image2 from "../../../../_metronic/layout/components/arts/image2.png";
// import Image3 from "../../../../_metronic/layout/components/arts/image3.png";
// import Image4 from "../../../../_metronic/layout/components/arts/image4.png";
// import { Pagination } from "swiper";
import Gif from "../../../../_metronic/layout/components/Logos/auth.gif";

export function AuthPage() {
  // const images = [
  //   { src: Image1 },
  //   { src: Image2 },
  //   { src: Image3 },
  //   { src: Image4 },
  // ];
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <div
          className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-row-fluid bg-white"
          id="kt_login"
        >
          <div className="login-aside d-flex flex-row-auto   justify-content-center bgi-size- bgi-no-repeat p-10 p-lg-10">
            <div className="w-100 d-flex align-items-center justify-content-center">
              <div className="hello-gif">
                <img alt="" width="500px" src={Gif} />
              </div>

              <>
                {/* <Swiper
                  onTimeUpdate={2000}
                  pagination={true}
                  modules={[Pagination]}
                  style={{
                    width: "600px",
                  }}
                  spaceBetween={50}
                  slidesPerView={1}
                >
                  {images.map((itm) => {
                    return (
                      <>
                        <SwiperSlide
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <img alt="" src={itm.src} height="400px"></img>
                        </SwiperSlide>
                      </>
                    );
                  })}
                </Swiper> */}
              </>
            </div>
          </div>

          <div className="flex-row-fluid d-flex flex-column position-relative p-7 overflow-hidden">
            <div className="d-flex flex-column-fluid flex-center mt-30 mt-lg-0">
              <Switch>
                <ContentRoute path="/auth/login" component={Login} />
                <ContentRoute
                  path="/auth/forgot-password"
                  component={ForgotPassword}
                />
                <ContentRoute
                  path="/changepassword"
                  component={Changepassword}
                />

                <Redirect from="/auth" exact={true} to="/auth/login" />
                <Redirect to="/auth/login" />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
