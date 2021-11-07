import Header from "./Header";
import Sidebar from "./Sidebar";

function Main(props) {
    return (
        <>
            <Header />
            <Sidebar />
            <main className='z-10 w-5/6 absolute right-0 p-6 h-screen mt-10'>{props.children}</main>
        </>
    );
}

export default Main;