import Link from "next/link";
import { useSession } from "next-auth/react";

function ContentHome() {
  const { data: session } = useSession();

  return (
    <main>
      <section className="flex justify-center items-center h-full my-28">
        <div className="flex flex-col items-center pt-4 mb-36 w-4/5 md:w-3/5 xl:w-1/2 h-4/5">
          <h2 className="text-4xl sm:text-6xl font-bold text-center leading-tight w-full mb-12">
            Get everything done with GoDo
          </h2>
          {!session && (
            <Link href="signin">
              <button className="flex items-center justify-center mb-10 w-40 px-4 py-2 bg-red-500 font-medium text-lg rounded-lg text-white hover:opacity-90">
                Get Started
              </button>
            </Link>
          )}
          {session && (
            <Link href="/app/today">
              <button className="flex items-center justify-center mb-10 w-40 px-4 py-2 bg-red-500 font-medium text-lg rounded-lg text-white hover:opacity-90">
                Open App
              </button>
            </Link>
          )}
          <div className="rounded-xl flex justify-center bg-red-100 p-1 sm:w-5/6 lg:w-4/6 mt-8">
            <img
              className="rounded-xl"
              alt="calendar notebook"
              src="/notebook.jpg"
            ></img>
          </div>
        </div>
      </section>
      <section className="flex items-center justify-center flex-col-reverse lg:flex-row h-full py-24 lg:py-0 lg:h-screen bg-gray-50 space-y-8 space-y-reverse lg:space-x-8">
        <div className="w-5/6 sm:w-4/6 lg:w-2/6">
          <h3 className="text-4xl font-bold mb-4">
            Manage your time efficiently
          </h3>
          <p className="text-xl w-10/12">
            Save precious minutes of your time by organizing your day with GoDo.
            Organize your tasks, lists and reminders without breaking a sweat.
            Being productive has never been so simple!
          </p>
        </div>
        <div className="flex justify-center items-center bg-red-100 rounded-xl w-5/6 sm:w-4/6 md:w-3/6 lg:w-2/6 p-1">
          <img
            className="rounded-xl"
            alt="two hourglasses near a computer"
            src="/hourglass.jpg"
          ></img>
        </div>
      </section>
      <section className="flex items-center justify-center flex-col lg:flex-row h-full py-24 lg:py-0 lg:h-screen space-y-8 lg:space-x-28">
        <div className="flex justify-center items-center bg-red-100 rounded-xl w-5/6 sm:w-4/6 md:w-3/6 lg:w-2/6 p-1">
          <img
            className="rounded-xl"
            alt="a crowd in a colourful background"
            src="/crowd.jpg"
          ></img>
        </div>
        <div className="w-5/6 sm:w-4/6 lg:w-2/6">
          <h3 className="text-4xl font-bold mb-4">
            Join our friendly community
          </h3>
          <p className="text-xl w-10/12">
            GoDo has helped many people organize their daily tasks. Join the
            crowd! We value our customers and listen to your feedback to improve
            your experience with GoDo.
          </p>
        </div>
      </section>
      <section className="flex justify-center items-center h-full py-24 lg:py-0 lg:h-screen overflow-hidden bg-gray-50">
        <div className="flex flex-col items-center w-full h-4/5">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-10 mt-10 leading-tight w-4/5">
            Reach your goals with GoDo
          </h2>
          {!session && (
            <Link href="signin">
              <button className="flex items-center justify-center mb-16 w-40 px-4 py-2 bg-red-500 font-medium text-lg rounded-lg text-white hover:opacity-90">
                Get Started
              </button>
            </Link>
          )}
          {session && (
            <Link href="/app/today">
              <button className="flex items-center justify-center mb-16 w-40 px-4 py-2 bg-red-500 font-medium text-lg rounded-lg text-white hover:opacity-90">
                Open App
              </button>
            </Link>
          )}
          <div className="rounded-xl flex justify-center bg-red-100 p-1 w-5/6 sm:w-4/6 md:w-3/6 lg:w-2/6">
            <img
              className="rounded-xl"
              alt="floating balloons in a green background"
              src="/baloons.jpg"
            ></img>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ContentHome;
