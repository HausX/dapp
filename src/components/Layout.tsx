import { ReactNode, useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Footer from "./Footer";
import { ModeToggle } from "./DarkModeToggle";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Create Event", href: "/streams/create" },
  { name: "Event Market", href: "/market" },
  { name: "Event Room", href: "/event-room" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  children?: ReactNode;
}

export default function Layout({ children }: Props) {
  const router = useRouter();
  const { address, isConnected } = useAccount();

  useEffect(() => {
    // if (address) {
    //   router.push("/home");
    // }
  }, [address]);

  return (
    <>
      <div className="min-h-full">
        <div className="fixed w-full top-0 z-10">
          <Disclosure
            as="nav"
            className="bg-transparent"
            style={{
              backdropFilter: "saturate(180%) blur(10px)",
              WebkitBackdropFilter: "saturate(180%) blur(10px)",
            }}
          >
            {() => (
              <>
                <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                  <div className="relative flex h-24 items-center justify-between">
                    <div className="flex items-center px-2 lg:px-0">
                      <div className="flex-shrink-0 flex items-center gap-x-3">
                        <Image
                          className="h-14 w-auto"
                          height={512}
                          width={512}
                          src="/android-chrome-512x512.png"
                          alt="Fabbrica0x"
                        />
                        <div className="font-black text-white text-3xl tracking-wide">
                          RealityHaus
                          <div className="font-medium text-zinc-400 text-xs">
                            By frens
                          </div>
                        </div>
                      </div>
                      <div className="hidden lg:ml-10 lg:block">
                        <div className="flex space-x-4">
                          {navigation.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className={classNames(
                                item.href === router.pathname
                                  ? "bg-white text-zinc-900"
                                  : "text-zinc-200 hover:text-zinc-900 hover:bg-zinc-100",
                                "rounded-md py-2 px-3 text-lg font-medium transition-all duration-200 ease-in-out"
                              )}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <ConnectButton />
                    </div>
                    <ModeToggle />
                  </div>
                </div>
              </>
            )}
          </Disclosure>
        </div>
        <main>{children}</main>

        <Footer />
      </div>
    </>
  );
}
