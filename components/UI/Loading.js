import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faForward } from "@fortawesome/free-solid-svg-icons";

function Loading() {
    return (
            <div className='flex items-center justify-center h-screen w-screen absolute bg-white top-0 left-0 z-50'>
              <div className="flex justify-center items-center">
                <div
                  className="animate-spin rounded-full h-36 w-36 border-b-4 border-red-500"
                ></div>
              </div>
              <div className='absolute bottom-28'>
                <h1 className="text-4xl text-red-500 cursor-pointer mb-10 font-medium pt-6 pl-6">
                    GoDo
                <Icon className="ml-1" icon={faForward} />
                </h1>
              </div>
            </div>
            );
}

export default Loading;