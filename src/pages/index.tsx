import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Arzon</title>
      </Head>
      <div className="z-10 mx-auto flex h-screen w-3/5 flex-col items-center justify-center text-center">
        <nav className="fixed left-[20%] right-[20%] top-0 z-10 mx-auto flex h-16 w-3/5 items-center justify-between">
          <h4 className="font-sans text-2xl font-light">arzon</h4>
          <div className="flex items-center gap-6 text-xl">
            <Link href="/signup">
              <a>Sign up</a>
            </Link>
            <Link href="/SigninPage">
              <a>Sign in</a>
            </Link>
          </div>
        </nav>
        <h1 className="text-7xl font-extrabold tracking-tight">
          Get best deals on the electronics you need.
        </h1>
        <Link href="/catalog">
          <a className="mt-8 rounded-md bg-indigo-600 px-8 py-4 text-xl text-white">
            View catalog
          </a>
        </Link>
        <div className="-z-10">
          <Image
            src="/images/hero.jpg"
            alt="electronics"
            layout="fill"
            className="object-cover"
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
