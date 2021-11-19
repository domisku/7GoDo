import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faForward } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Head from "next/dist/shared/lib/head";

function VerifyRequest() {
  return (
    <>
      <Head>
        <title>Success</title>
        <meta
          name="description"
          content="Check your email inbox to finish logging in"
        />
      </Head>
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="relative xl:-top-16 w-full sm:w-9/12 md:w-8/12 lg:w-6/12 xl:w-5/12 2xl:w-4/12 bg-white p-8 sm:p-14 border rounded-lg shadow-lg">
          <Link href="/">
            <h1 className="text-2xl text-red-500 cursor-pointer mb-4 font-medium">
              7GoDo
              <Icon className="ml-1" icon={faForward} />
            </h1>
          </Link>
          <h2 className="text-3xl font-bold mb-2">Success</h2>
          <p className="text-xl mb-8">
            Check your email inbox to finish logging in
          </p>
          <Link href="/">
            <p className="text-red-500 cursor-pointer hover:underline">
              Go Home
            </p>
          </Link>
        </div>
      </div>
    </>
  );
}

export default VerifyRequest;
