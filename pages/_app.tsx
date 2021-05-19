import React, { ReactElement } from "react";
import { AppProps } from "next/app";
import "../styles/globals.css";

interface Props {}

function UCApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
}

export default UCApp;
