import { signIn, getProviders, useSession } from "next-auth/react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faForward } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import DialogBox from "../../components/UI/DialogBox";
import Head from "next/dist/shared/lib/head";
import { useRouter } from "next/router";

function SignIn({ providers }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") router.push("/app/today");
  }, [status]);

  function formSubmitHandler(event) {
    event.preventDefault();

    if (emailIsValid())
      signIn("email", { email, callbackUrl: process.env.NEXTAUTH_URL });
  }

  function inputChangeHandler(event) {
    setEmail(event.target.value);
  }

  function emailIsValid() {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (emailRegex.test(email)) {
      return true;
    } else {
      setError(true);
      return false;
    }
  }

  return (
    <>
      <Head>
        <title>Sign In</title>
        <link rel="icon" href="/favicon.png" />
        <meta
          name="description"
          content="Sign in to 7GoDo and start planning your day!"
        />
      </Head>
      <div className="flex justify-center items-center h-screen bg-gray-50 landscape:py-72">
        <div className="relative xl:-top-16 w-full sm:w-9/12 md:w-8/12 lg:w-6/12 xl:w-5/12 2xl:w-4/12 bg-white p-8 sm:p-14 border rounded-lg shadow-lg">
          <Link href="/">
            <h1 className="text-2xl text-red-500 cursor-pointer mb-4 font-medium">
              7GoDo
              <Icon className="ml-1" icon={faForward} />
            </h1>
          </Link>
          <h2 className="text-3xl font-bold mb-6">Sign In</h2>
          <div>
            {Object.values(providers).map((provider) => {
              if (provider.name === "Email") return;
              else
                return (
                  <div key={provider.name}>
                    <button
                      className="flex items-center justify-center w-full h-10 mb-2 px-4 py-2 border-2 font-medium text-md rounded-lg hover:bg-gray-100"
                      onClick={() =>
                        signIn(provider.id, {
                          callbackUrl: process.env.NEXTAUTH_URL,
                        })
                      }
                    >
                      <Icon className="text-xl mr-2" icon={faGithub} />
                      Continue with {provider.name}
                    </button>
                  </div>
                );
            })}
          </div>
          <div className="flex justify-center border-b-2 mb-6">
            <span className="relative top-3 bg-white px-4 text-sm">OR</span>
          </div>
          <form
            onSubmit={formSubmitHandler}
            className="flex flex-col"
            noValidate
          >
            <label className="font-medium mb-1">Email</label>
            <div className="relative w-full">
              <input
                className={`border-2 bg-gray-100 hover:bg-white focus:bg-white px-3 rounded-lg h-10 w-full ${
                  error ? "border-red-500 bg-red-50 outline-none" : ""
                }`}
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={inputChangeHandler}
              />
              {error && (
                <>
                  <div className="hidden lg:inline animate-slide absolute top-0 -right-60">
                    <DialogBox message="Please enter a valid email" />
                  </div>
                  <span className="block lg:hidden text-red-500 font-medium mt-1">
                    Please enter a valid email
                  </span>
                </>
              )}
            </div>
            <button
              className="flex items-center justify-center mb-6 px-4 py-2 mt-4 bg-red-500 font-medium text-lg rounded-lg text-white hover:opacity-90"
              type="submit"
            >
              Sign in with Email
            </button>
            <p className="mb-2">
              Logging in with email or Github doesn't require you to create a
              password, keeping your private information safe!
            </p>
          </form>
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

export default SignIn;

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
