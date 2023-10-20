"use client";

import * as React from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import "@safe-global/safe-react-components/dist/fonts.css";

import Providers from "../components/providers/Providers";
import { useAccountAbstraction } from "../store/accountAbstractionContext";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function App({ Component, pageProps }: AppProps) {
  const [ready, setReady] = useState(false);

  const { setChainId } = useAccountAbstraction();
  useEffect(() => {}, [setChainId]);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <>
      {ready ? (
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Component {...pageProps} />
          </ThemeProvider>
        </Providers>
      ) : null}
    </>
  );
}
