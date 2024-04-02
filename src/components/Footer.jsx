import Pep from "../assets/pep_logo.png";
import Quin from "../assets/quin_logo.png";

function Footer() {
  return (
    <footer className="flex flex-col flex-wrap md:justify-start md:flex-nowrap z-50 w-full text-sm bg-gray-300 text-black pt-16 pb-6 shadow-lg md:pt-16 md:px-40">
      <div className="flex flex-col md:flex-row my-auto justify-center md:justify-around w-full">
        <div className="flex flex-col w-full md:w-[30%] py-6 md:py-0">
          <p className="px-6 py-2">
            <img
              src={Pep}
              alt="Pep Logo"
              style={{ width: "100px", height: "50px" }}
            />
          </p>
          <a className="font-semibold text-[1rem]">
            <div className="px-6 py-2">
              Private Energy Partners is involved in projects across Europe, US
              and Australia
            </div>
          </a>
          <div className="flex flex-row px-6 py-2">
            <i
              className="fa fa-linkedin-square"
              style={{ fontSize: "24px", paddingRight: "16px" }}
            ></i>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-[30%] py-6 md:py-0">
          <p className="font-semibold pb-4 px-6">
            Private Energy Partners is an affiliate of Quinbrook Infrastructure
            Partners
          </p>
          <p className="font-semibold pb-4 px-6">
            <img
              src={Quin}
              alt="Pep Logo"
              style={{ width: "120px", height: "40px" }}
            />
          </p>
        </div>
        <div className="flex flex-col w-full items-start md:items-center md:w-[30%] py-6 md:py-0 md:pr-10">
          <ul>
            <a className="font-normal transition-all text-[0.9rem] hover:text-[1rem]">
              <p className="font-semibold pb-1 px-6">United Kingdom</p>
            </a>
            <a className="font-normal transition-all text-[0.9rem]">
              <div className="pb-4 px-6">
                3rd Floor, 24 Savile Row, London, W1S 2ES
              </div>
            </a>
            <a className="font-semibold transition-all text-[1rem] hover:text-[1.125rem]">
              <div className="pb-1"></div>
            </a>
            <a className="font-semibold transition-all text-[1rem] hover:text-[1.125rem]">
              <div className="pb-4 px-6">Tel: +44 207 818 8600</div>
            </a>
            <a className="font-semibold transition-all text-[1rem] hover:text-[1.125rem]">
              <div className="font-normal text-xs px-6">
                © 2024 Private Energy Partners Pty Ltd{" "}
              </div>
            </a>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
