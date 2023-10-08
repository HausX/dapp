"use client"

import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from '@livepeer/react';
import * as React from 'react';
import '@app/styles/globals.css'
import type { AppProps } from 'next/app'
import LiveStream from './streams/watch';


const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: process.env.NEXT_PUBLIC_LIVE_PEER || '',
  }),
});

// Pass client to React Context Provider

export default function App({ Component, pageProps }: AppProps) {
  return <LivepeerConfig client={livepeerClient}>
    <LiveStream streamUrl='' />
    <Component {...pageProps} />
  </LivepeerConfig>
}
