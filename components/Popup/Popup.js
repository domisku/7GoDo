import { Transition } from "@headlessui/react";

function Popup(props) {
  function cookiesAcceptedHandler() {
    localStorage.setItem("cookies-pref", "true");
    props.setCookiesAccepted(true);
  }

  return (
    <div className="overflow-hidden fixed bottom-0 w-full z-40">
      <Transition
        show={!props.cookiesAccepted}
        enter="transition-translate duration-700"
        enterFrom="translate-y-full"
        enterTo="translate-y-0"
        leave="transition-opacity duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="flex justify-center items-center h-20 bg-red-50 w-full border-t border-black px-4 py-12 sm:p-0">
          <p className="mr-4 text-lg">
            We use cookies to optimize the use of our website.
          </p>
          <button
            onClick={cookiesAcceptedHandler}
            className="flex items-center justify-center px-4 py-2 bg-black font-medium text-lg rounded-lg text-white hover:opacity-90"
          >
            Okay!
          </button>
        </div>
      </Transition>
    </div>
  );
}

export default Popup;
