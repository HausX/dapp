"use client";

import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";
import * as React from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import "@safe-global/safe-react-components/dist/fonts.css";

import Providers from "../components/providers/Providers";
import { useAccountAbstraction } from "../store/accountAbstractionContext";
import isMoneriumRedirect from "../utils/isMoneriumRedirect";
import { ThemeProvider } from "@/components/ThemeProvider";

const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: process.env.NEXT_PUBLIC_LIVE_PEER || "",
  }),
});

export default function App({ Component, pageProps }: AppProps) {
  const [ready, setReady] = useState(false);

  const { setChainId } = useAccountAbstraction();
  useEffect(() => {
    if (isMoneriumRedirect()) {
    }
  }, [setChainId]);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <>
      {ready ? (
        <LivepeerConfig client={livepeerClient}>
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
        </LivepeerConfig>
      ) : null}
    </>
  );
}
