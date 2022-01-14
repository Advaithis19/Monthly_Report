import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Header = () => {
  let access_token = localStorage.getItem("access_token")
    ? localStorage.getItem("access_token")
    : null;

  return (
    <div>
      <header className="headerWarp" role="banner" style={{ width: "100%" }}>
        <div className="brandInner" style={{ width: "100%" }}>
          <div className="logo">
            <a href="/" title="Home" rel="home" className="site-logo">
              {/* <img
                style={{ height: "7rem", width: "7rem" }}
                src="https://scontent.fblr4-3.fna.fbcdn.net/v/t1.6435-9/87503689_111002383835295_3256861726187978752_n.png?_nc_cat=108&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=joJoEuK2r7UAX-K5KK3&_nc_ht=scontent.fblr4-3.fna&oh=acac6bab4aed6333fb3268f1823145e0&oe=61D6BA2C"
                alt="Home"
              /> */}
            </a>
          </div>
          <div className="brandName">
            <div className="l-region l-region--branding">
              <div
                id="block-block-28"
                className="block block--block block--block-28"
              >
                <div className="block__content">
                  <h3 className="rtecenter">
                    <span style={{ fontSize: "16px" }}>
                      Rashtreeya Sikshana Samithi Trust
                    </span>
                  </h3>
                  <h1 className="rtecenter">
                    <span style={{ fontSize: "26px" }}>
                      <a href="/" title="Home">
                        R V College of Engineering{" "}
                      </a>
                    </span>
                  </h1>
                  <h6 className="rtecenter">
                    <span style={{ fontSize: "12px" }}>
                      Autonomous Institution affiliated to Visvesvaraya
                      Technological University, Belagavi
                    </span>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <p>
        {access_token ? (
          <Link to="/logout">Logout</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </p>
      <hr />
    </div>
  );
};

export default Header;
