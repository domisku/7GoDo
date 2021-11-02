function ContentHome() {
    return (
        <main>
            <section className='flex justify-center items-center h-screen mt-14 overflow-hidden'>
                <div className='flex flex-col items-center w-1/2 h-4/5'>
                    <h2 className='text-6xl font-bold text-center mb-10 leading-tight w-4/5'>Get everything done with GoDo</h2>
                    <button className='flex items-center justify-center mb-16 w-1/5 px-4 py-2 bg-red-500 font-medium text-lg rounded-lg text-white hover:opacity-90'>Get Started</button>
                    <div className='rounded-xl flex justify-center bg-red-100 px-6 py-6'>
                        <img className='rounded-xl' alt='calendar notebook' src='https://images.unsplash.com/photo-1529651737248-dad5e287768e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1965&q=80'></img>
                    </div>
                </div>
            </section>
            <section className='flex items-center justify-center h-screen bg-gray-50 space-x-8'>
                <div className='w-2/6'>
                    <h3 className='text-4xl font-bold mb-4'>Manage your time efficiently</h3>
                    <p className='text-xl w-10/12'>
                        Save precious minutes of your time by organizing your day with GoDo.
                        Organize your tasks, lists and reminders without breaking a sweat. Being productive has never been so simple!
                    </p>
                </div>
                <div className='flex justify-center items-center bg-red-100 rounded-xl w-2/6 px-6 py-6'>
                    <img className='rounded-xl' alt='two hourglasses near a computer' src='https://images.unsplash.com/photo-1620912189866-474843ba5c14?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1169&q=80'></img>
                </div>
            </section>
            <section className='flex items-center justify-center h-screen space-x-28'>
                <div className='flex justify-center items-center bg-red-100 rounded-xl w-2/6 px-6 py-6'>
                    <img className='rounded-xl' alt='a crowd in a colourful background' src='https://images.unsplash.com/photo-1603228254119-e6a4d095dc59?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2071&q=80'></img>
                </div>
                <div className='w-2/6'>
                    <h3 className='text-4xl font-bold mb-4'>Used by millions of people</h3>
                    <p className='text-xl w-10/12'>
                        GoDo has helped millions of people organize their daily tasks. Join the crowd!
                        We value our customers and listen to your feedback to improve your experience with GoDo.
                    </p>
                </div>
            </section>
            <section className='flex justify-center items-center h-screen overflow-hidden bg-gray-50'>
                <div className='relative top-16 flex flex-col items-center w-1/2 h-4/5'>
                    <h2 className='text-5xl font-bold text-center mb-10 mt-10 leading-tight w-4/5'>Reach your goals with GoDo</h2>
                    <button className='flex items-center justify-center mb-16 w-1/5 px-4 py-2 bg-red-500 font-medium text-lg rounded-lg text-white hover:opacity-90'>Get Started</button>
                    <div className='rounded-xl flex justify-center bg-red-100 px-6 py-6 w-3/5'>
                        <img className='rounded-xl' alt='calendar notebook' src='https://images.unsplash.com/photo-1525351159099-81893194469e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2065&q=80'></img>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ContentHome;