import React from "react";
import Footer from "./Footer";

const withAuthLayout = (Component: any) => (props: any) => {
  return (
    <div className="bg-primary">
      <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
          <main>
            <Component {...props} />
          </main>
        </div>
        <div id="layoutAuthentication_footer">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default withAuthLayout;
