"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "/home/anthonyyeboah/Dokumente/GitHub/next-js/public/images/logo.svg";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const isUserLoggedIn = true;
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
  }, []);
  return (
    <nav>
      Nav
      <Link href="/" />
      <Image
        src={logo}
        alt="Promotopia Logo ALT"
        width={30}
        height={30}
        className="object-contain"
      />
      <p>PROMOTOPIA</p>
      <div>
        {isUserLoggedIn ? (
          <div>
            <Link href="/create-prompt">Create Post</Link>
            <button type="button" onClick={signOut}>
              Sign Out
            </button>
            <Link href="/profile">
              <Image src={logo} alt="Profile Image" width={30} height={30} />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      {/* MOBILE NAV */}
      <div>
        {isUserLoggedIn ? (
          <div>
            <Image
              src={logo}
              width={37}
              height={37}
              alt="profile"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div>
                <Link href="/profile" onClick={() => setToggleDropdown(false)}>
                  My Profile
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
            <p>MOBILE</p>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  Sign In Mobile
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
