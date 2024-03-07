import { useEffect, useState } from "react";

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail("");
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500"
                        onClick={onClose}
                      >
                        <svg
                          className="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Forgot Password
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Enter your email address and we'll send you a link to
                        reset your password.
                      </p>
                    </div>
                    <form
                      className="mt-5 sm:flex sm:items-center"
                      onSubmit={handleSubmit}
                    >
                      <div className="w-full">
                        <label htmlFor="email" className="sr-only">
                          Email address
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          placeholder="Email address"
                          value="Sorry not working at the moment"
                          // value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled
                        />
                      </div>
                      <div className="mt-3 sm:mt-0 sm:ml-3">
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Send Reset Link
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPasswordModal;
