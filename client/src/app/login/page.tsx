export default function LoginPage() {
    return (
        <>
            <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-cream">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="trophieslogoBLACK.png"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign up to your account
                    </h2>
                </div>


                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" method="POST" className="space-y-6">
                        <button
                            className="flex items-center justify-center w-full rounded-md bg-gray-600 px-6 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            <span className="mr-2 text-white text-sm">Connect to</span>
                            <img
                                src="Worldcoin_LogoWhite.png"
                                alt="Worldcoin Logo"
                                className="h-6"  // Adjust the height to make the logo smaller
                            />
                        </button>
                        <div>
                            <p className="">
                                Please paste your Devpost account URL.
                            </p>
                            <div className="mt-2">

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    placeholder="https://devpost.com/anthony-ung"
                                    className="block w-full rounded-md bg-gray-800 border border-gray-600 py-2 px-3 text-gray-300 placeholder-gray-500 focus:border-gray-400 focus:ring-2 focus:ring-gray-400 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>

                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-rose-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
