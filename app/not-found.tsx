import Link from "next/link";
import { getMetadata } from "./layout";

export const metadata = getMetadata("Not Found");

const NotFound = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="mt-4 text-xl text-gray-400">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>

      <Link href="/" className="mt-6">
        <button className="rounded-lg bg-green-500 px-6 py-2 text-lg font-medium text-white transition-colors hover:bg-green-600">
          Go Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
