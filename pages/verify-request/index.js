import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faForward } from "@fortawesome/free-solid-svg-icons";

function VerifyRequest() {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <div className='relative -top-20 w-4/12 bg-white p-14 border rounded-lg'>
            <h1 className='text-2xl text-red-500 cursor-pointer mb-4 font-medium'>
            GoDo
            <Icon className='ml-1' icon={faForward} />
            </h1>
            <h2 className='text-3xl font-bold mb-2'>Success</h2>
                <p className='text-xl mb-8'>Check your email inbox to finish logging in</p>
                <p className='text-red-500 cursor-pointer hover:underline'>Go Home</p>
            </div>
        </div>
    );
}

export default VerifyRequest;