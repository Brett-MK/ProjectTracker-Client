import SideNav from "./SideNav";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const withSideNavLayout = (Component: any, showSideNav: boolean = true) => (
  props: any
) => {
  let styling = {};
  if (!showSideNav) {
    styling = { paddingLeft: "0px" };
  }

  return (
    <div className="sb-nav-fixed">
      <Header {...props} />
      <div id="layoutSidenav">
        {showSideNav ? (
          <div id="layoutSidenav_nav">
            <SideNav {...props} />
          </div>
        ) : (
          ""
        )}
        <div id="layoutSidenav_content" style={styling}>
          <main>
            <Component {...props} />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default withSideNavLayout;
