import { ReactNode } from "react";
import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import SafeInfo from "../components/safe-info/SafeInfo";

import Button from "@mui/material/Button";

import ConnectedWalletLabel from "./connected-wallet-label/ConnectedWalletLabel";
import { useAccountAbstraction } from "../store/accountAbstractionContext";
import ChainSelector from "../components/chain-selector/ChainSelector";

import Footer from "./Footer";
import { buttonVariants } from "./ui/button";
import { ModeToggle } from "./DarkModeToggle";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./ui/navigation-menu";

const navigation = [
  { name: "Create Event", href: "/streams/create" },
  { name: "Event Market", href: "/streams/market" },
  { name: "Event Room", href: "/event-room" },
];
interface Props {
  children?: ReactNode;
}

export default function Layout({ children }: Props) {
  const { loginWeb3Auth, isAuthenticated, safeSelected, chainId } =
    useAccountAbstraction();

  const router = useRouter();

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
                      <Link
                        href="/"
                        className="flex-shrink-0 flex items-center gap-x-3"
                      >
                        <Image
                          className="h-14 w-auto"
                          height={512}
                          width={512}
                          src="/android-chrome-512x512.png"
                          alt="Fabbrica0x"
                        />
                        <div className="font-black text-white text-3xl tracking-wide">
                          Haus
                          <div className="font-medium text-zinc-400 text-xs">
                            By frens
                          </div>
                        </div>
                      </Link>
                      <div className="hidden lg:ml-10 lg:block">
                        <div className="flex space-x-4">
                          <NavigationMenu>
                            <NavigationMenuList>
                              {navigation.map((item) => (
                                <NavigationMenuItem key={item.name}>
                                  <Link
                                    href={item.href}
                                    legacyBehavior
                                    passHref
                                  >
                                    <NavigationMenuLink className={cn(
                                      buttonVariants({ variant: "ghost" }),
                                      item.href === router.pathname
                                        ? "bg-muted hover:bg-muted"
                                        : "hover:bg-transparent hover:underline",
                                      "justify-start"
                                    )}>
                                      {item.name}
                                    </NavigationMenuLink>
                                  </Link>
                                </NavigationMenuItem>
                              ))}
                            </NavigationMenuList>
                          </NavigationMenu>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      {/* The Connect Button starts here */}
                      {isAuthenticated ? (
                        <div className="flex row justify-between">
                          <div className="mx-2">
                            <ChainSelector />
                          </div>

                          <div className="mx-2">
                            {/* Safe Account */}
                            {safeSelected && (
                              <SafeInfo
                                safeAddress={safeSelected}
                                chainId={chainId}
                              />
                            )}
                          </div>

                          <div className="mx-2">
                            {/* Owner details */}
                            <ConnectedWalletLabel />
                          </div>
                        </div>
                      ) : (
                        <div className="flex row justify-between">
                          <Button variant="contained" onClick={loginWeb3Auth}>
                            Connect with Safe Auth
                          </Button>
                        </div>
                      )}

                      {/* The Connect Button ends here */}
                      <ModeToggle />
                    </div>
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
