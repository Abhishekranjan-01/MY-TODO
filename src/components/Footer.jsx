import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
const Footer = () => {
  return (
    <footer className="absolute bottom-0 mx-auto flex flex-col justify-center w-full">
      <h1 className="sm:text-lg text-xs font-poppins font-semibold text-center">
        For Any Query/Information
      </h1>

      <div className="mx-auto text-center flex justify-center gap-2 py-1">
        <a
          href="https://www.linkedin.com/in/abhishek-ranjan-791b6b22a/"
          target="_blank"
        >
          <FaLinkedin className="text-lg sm:text-2xl cursor-pointer" />
        </a>

        <a href="https://github.com/Abhishekranjan-01" target="_blank">
          <FaGithub className="text-lg sm:text-2xl cursor-pointer" />
        </a>
      </div>
    </footer>
  );
};
export default Footer;
