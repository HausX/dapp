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
import {
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { sepolia, polygonMumbai } from "wagmi/chains";
import "@rainbow-me/rainbowkit/styles.css";
import "@safe-global/safe-react-components/dist/fonts.css";

import Header from "../components/header/Header";
import Providers from "../components/providers/Providers";
import SafeCoreInfo from "../components/safe-core-info/SafeCoreInfo";
import { useAccountAbstraction } from "../store/accountAbstractionContext";
import isMoneriumRedirect from "../utils/isMoneriumRedirect";
import { ThemeProvider } from "@/components/ThemeProvider";

const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: process.env.NEXT_PUBLIC_LIVE_PEER || "",
  }),
});

// Pass client to React Context Provider

export default function App({ Component, pageProps }: AppProps) {
  const [ready, setReady] = useState(false);

  const { setChainId } = useAccountAbstraction();
  useEffect(() => {
    if (isMoneriumRedirect()) {
    }
  }, [setChainId]);

  // const { publicClient, chains, webSocketPublicClient } = configureChains(
  //   [polygonMumbai],
  //   [publicProvider()]
  // );

  // const wagmiConfig = createConfig({
  //   autoConnect: true,
  //   connectors,
  //   publicClient,
  // });

  useEffect(() => {
    setReady(true);
  }, []);
  return (
    <>
      {ready ? (
        <LivepeerConfig client={livepeerClient}>
          {/* <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider
              chains={chains}
              theme={lightTheme({
                accentColor: "#383838",
                accentColorForeground: "white",
                borderRadius: "medium",
                fontStack: "system",
                overlayBlur: "small",
              })}
            >  
            
            </RainbowKitProvider>
          </WagmiConfig> */}
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
