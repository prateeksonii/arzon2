import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Arzon</title>
      </Head>
      <div className="mx-auto flex h-screen w-3/5 flex-col items-center justify-center text-center">
        <h1 className="text-7xl font-extrabold tracking-tight">
          Get best deals on the electronics you need.
        </h1>
        <Link href="/catalog">
          <a className="mt-8 rounded-md bg-indigo-600 px-8 py-4 text-2xl font-bold text-white">
            View catalog
          </a>
        </Link>
      </div>
    </>
  );
};

export default HomePage;
