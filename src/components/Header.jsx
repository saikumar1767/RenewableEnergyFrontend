import { useContext } from "react";
import { AuthContext } from "../App";
import Pep from "../assets/pep_logo.png";

function Header() {
  const { authState, handleLogout } = useContext(AuthContext);

  return (
    <header className="flex flex-wrap relative md:justify-start md:flex-nowrap z-50 w-full text-sm">
      <nav
        className="m-auto w-full bg-gray-200 px-4 py-4 md:flex md:items-center md:justify-between md:px-10 lg:px-24 xl:mx-auto shadow-md sticky top-0 z-10"
        aria-label="Global"
      >
        <div className="flex items-center justify-between w-[100%]">
          <div className="flex flex-row items-center w-[90%]">
            <a
              className="flex-none text-xl font-semibold text-blue-600"
              href="#"
              aria-label="Brand"
            >
              <img
                src={Pep}
                alt="Pep Logo"
                style={{ width: "100px", height: "50px" }}
              />
            </a>
            <h1 className="pl-8 font-bold italic whitespace-nowrap text-xl overflow-hidden max-w-[100%] md:max-w-[90%] text-ellipsis">
              Renewable Energy Sources Dashboard (Assignment)
            </h1>
          </div>
          {authState && authState.user && (
            <div className="md:hidden flex flex-col items-end w-[10%]">
              <button
                type="button"
                className="hs-collapse-toggle size-8 flex justify-center items-center text-sm font-semibold rounded-full border border-gray-200 text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                data-hs-collapse="#navbar-collapse-with-animation"
                aria-controls="navbar-collapse-with-animation"
                aria-label="Toggle navigation"
              >
                <svg
                  className="hs-collapse-open:hidden flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <line x1="3" x2="21" y1="12" y2="12" />
                  <line x1="3" x2="21" y1="18" y2="18" />
                </svg>
                <svg
                  className="hs-collapse-open:block hidden flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          )}
        </div>
        <div className="flex-grow" />
        {authState && authState.user && (
          <div
            id="navbar-collapse-with-animation"
            className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block"
          >
            <div className="flex flex-col gap-y-4 gap-x-0 mt-5 md:flex-row md:items-center md:justify-end md:gap-y-0 md:gap-x-7 md:mt-0 md:ps-7">
              <a
                className="text-blue-600 hover:text-blue-500 font-bold dark:text-blue-600 dark:hover:text-blue-500 text-lg"
                href=""
              >
                {`Welcome ${authState.user}!`}
              </a>
              <a
                className="w-full sm:w-auto py-2 px-4 inline-flex justify-center items-center gap-x-2 text-md font-bold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href={""}
              >
                <button onClick={() => handleLogout()}>Logout</button>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
