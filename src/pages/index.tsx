import type { NextPage } from "next";
import Link from "next/link";

const HomePage: NextPage = () => {
  return (
    <div className="mx-auto flex h-screen w-3/5 flex-col items-center justify-center text-center">
      <h1 className="text-7xl font-extrabold tracking-tight text-zinc-900">
        Get best deals on the electronics you need.
      </h1>
      <Link href="/catalog">
        <a className="mt-8 rounded-md bg-indigo-600 px-8 py-4 text-2xl font-bold text-white">
          View catalog
        </a>
      </Link>
    </div>
  );
};

export default HomePage;