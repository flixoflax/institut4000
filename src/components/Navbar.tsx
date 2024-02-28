import React from "react";
import { hexToRgbA } from "../util/color";

interface NavbarProps {
  backgroundColor?: string;
  textColor?: string;
  addSlash?: boolean;
}

const Navbar = ({
  backgroundColor = "#000",
  textColor = "#fff",
  addSlash = false,
}: NavbarProps) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [scrollShow, setScrollShow] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const toggleMenu = () => setOpen(!open);

  const controlNavbar = React.useCallback(() => {
    const threshold = 30; // Scrolling threshold, whatever feels right here.
    if (typeof window !== "undefined") {
      if (Math.abs(window.scrollY - lastScrollY) > threshold) {
        if (window.scrollY > lastScrollY) {
          // if scroll down hide the navbar
          setScrollShow(false);
        } else {
          setScrollShow(true);
        }
        // remember current page location to use in the next move
        setLastScrollY(window.scrollY);
      }
    }
  }, [lastScrollY]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [controlNavbar]);

  return (
    <nav
      className={`${open ? "h-screen" : null} fixed z-50 w-full transform transition-transform duration-300 lg:h-20 ${scrollShow ? "translate-y-0" : "-translate-y-full"} backdrop-blur-md`}
      style={{ backgroundColor: hexToRgbA(backgroundColor), color: textColor }}
    >
      <div
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        data-aos="slide-down"
      >
        <div className="relative flex h-20 items-center justify-between">
          <span className="flex-1 select-none whitespace-nowrap text-left text-xl font-semibold md:text-2xl">
            <a href="/">Institut 4000</a>
          </span>

          <div className="flex flex-1 items-center justify-end space-x-2 lg:hidden">
            <button
              aria-label="Toggle main menu"
              className="flex items-center justify-center space-x-2"
              onClick={toggleMenu}
            >
              {!open ? (
                <>
                  <span className="sr-only">Open main menu</span>
                  <span>Menu</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill={textColor}
                    viewBox="0 0 256 256"
                  >
                    <path d="M224,160a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,160ZM40,104H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16Z"></path>
                  </svg>
                </>
              ) : (
                <>
                  <span className="sr-only">Close main menu</span>
                  <span>Close</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill={textColor}
                    viewBox="0 0 256 256"
                  >
                    <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
                  </svg>
                </>
              )}
            </button>
          </div>

          <div className="hidden flex-1 justify-center space-x-10 whitespace-nowrap lg:flex">
            <a
              href={`${addSlash ? "/" : ""}#services`}
              className="relative select-none text-center after:absolute after:inset-x-0 after:-bottom-2 after:mx-auto after:h-[2px] after:w-0 after:bg-current after:transition-all hover:after:w-full"
            >
              Services
            </a>

            <a
              href={`${addSlash ? "/" : ""}#case-studies`}
              className="relative select-none text-center after:absolute after:inset-x-0 after:-bottom-2 after:mx-auto after:h-[2px] after:w-0 after:bg-current after:transition-all hover:after:w-full"
            >
              Case Studies
            </a>

            <a
              href="#contact"
              className="relative select-none text-center after:absolute after:inset-x-0 after:-bottom-2 after:mx-auto after:h-[2px] after:w-0 after:bg-current after:transition-all hover:after:w-full"
            >
              Contact
            </a>
          </div>

          <div className="hidden flex-1 justify-end space-x-5 lg:flex">
            <a
              href="https://linkedin.com/in/niels-legolas-clormann"
              target={"_blank"}
            >
              <span className="sr-only">LinkedIn</span>
              <svg
                role="img"
                viewBox="0 0 24 24"
                className="h-6 w-6 sm:h-5 sm:w-5"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>LinkedIn</title>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
              </svg>
            </a>
            <a href="https://github.com/flixoflax" target={"_blank"}>
              <span className="sr-only">Github</span>
              <svg
                role="img"
                viewBox="0 0 24 24"
                className="h-6 w-6 sm:h-5 sm:w-5"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>GitHub</title>
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* Mobile Menu */}
        {open ? (
          <div className="lg:hidden" style={{ color: textColor }}>
            <div className="pt-10">
              <div className="flex flex-col items-start space-y-8">
                <a
                  className="relative select-none text-4xl after:absolute after:inset-x-0 after:-bottom-2 after:mx-auto after:h-[2px] after:w-0 after:bg-current after:transition-all"
                  data-aos="fade-right"
                  data-aos-duration="400"
                  href={`${addSlash ? "/" : ""}#services`}
                  onClick={toggleMenu}
                >
                  Services
                </a>
                <a
                  className="relative select-none text-4xl after:absolute after:inset-x-0 after:-bottom-2 after:mx-auto after:h-[2px] after:w-0 after:bg-current after:transition-all"
                  data-aos="fade-right"
                  data-aos-delay="200"
                  data-aos-duration="400"
                  href={`${addSlash ? "/" : ""}#case-studies`}
                  onClick={toggleMenu}
                >
                  Case Studies
                </a>
                <a
                  className="relative select-none text-4xl after:absolute after:inset-x-0 after:-bottom-2 after:mx-auto after:h-[2px] after:w-0 after:bg-current after:transition-all"
                  data-aos="fade-right"
                  data-aos-delay="400"
                  data-aos-duration="400"
                  href="#contact"
                  onClick={toggleMenu}
                >
                  Contact
                </a>
              </div>
              <div
                className="mt-20 flex flex-1 justify-start space-x-5"
                data-aos="fade-right"
                data-aos-delay="400"
                data-aos-duration="600"
              >
                <a
                  href="https://linkedin.com/in/niels-legolas-clormann"
                  target={"_blank"}
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    className="h-8 w-8"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>LinkedIn</title>
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                  </svg>
                </a>
                <a href="https://github.com/flixoflax" target={"_blank"}>
                  <span className="sr-only">Github</span>
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    className="h-8 w-8"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>GitHub</title>
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
