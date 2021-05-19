import React, { ReactElement, ReactNode } from "react";
import Topnav from "./topnav";
import Footer from "./footer";

interface Props {
  window?: () => Window;
  children: React.ReactElement;
  chrildren: ReactNode;
}

export default function Layout({ children }, props: Props): ReactElement {
  return (
    <React.Fragment>
      <Topnav {...props} />
      {children}
      <Footer />
    </React.Fragment>
  );
}
