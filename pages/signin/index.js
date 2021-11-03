import {
  providers,
  signIn,
  getSession,
  getCsrfToken,
  getProviders,
} from "next-auth/react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faForward } from "@fortawesome/free-solid-svg-icons";

function SignIn({ providers, csrfToken }) {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className='relative -top-20 w-4/12 bg-white p-14 border rounded-lg'>
        <h1 className='text-2xl text-red-500 cursor-pointer mb-4 font-medium'>
            GoDo
            <Icon className='ml-1' icon={faForward} />
        </h1>
        <h2 className='text-3xl font-bold mb-6'>Sign In</h2>
      <div>
        {Object.values(providers).map((provider) => {
          if (provider.name === "Email") return;
          else
            return (
              <div key={provider.name}>
                <button className='flex items-center justify-center w-full h-10 mb-2 px-4 py-2 border-2 font-medium text-md rounded-lg hover:bg-gray-100' onClick={() => signIn(provider.id)}>
                  Continue with {provider.name}
                </button>
              </div>
            );
        })}
      </div>
      <div className='flex justify-center border-b-2 mb-6'>
          <span className='relative top-3 bg-white px-4 text-sm'>OR</span>
      </div>
      <form
        className="flex flex-col"
        method="post"
        action="/api/auth/signin/email"
      >
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <label className='font-medium mb-1'>
          Email
        </label>
        <input className='border-2 bg-gray-100 hover:bg-white focus:bg-white px-3 rounded-lg h-10 mb-4' type="email" id="email" name="email" />
        <button className='flex items-center justify-center mb-6 px-4 py-2 bg-red-500 font-medium text-lg rounded-lg text-white hover:opacity-90' type="submit">Sign in with Email</button>
        <p>
            By continuing with Github or Email, 
            you agree to GoDo's Terms of Service and Privacy Policy.
        </p>
      </form>
      </div>
    </div>
  );
}

export default SignIn;

export async function getServerSideProps(context) {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  return {
    props: { providers, csrfToken },
  };
}
