import React, { useState } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Add Blog",
      slug: "/add-post",
      active: authStatus,
      className:
        "font-light mr-2 px-4 py-4 text-[13px] cursor-pointer bg-gray-100 duration-200 rounded-3xl text-blue-600 border border-gray-200",
    },
  ];

  const goTo = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <header className="py-2 border-b border-white/40 bg-white/60 backdrop-blur-xl shadow-sm shadow-black/5 w-full sticky top-0 z-50">
      <Container>
        <nav className="flex items-center">
          <div className="flex items-center gap-4 mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
            <Link
              to="/"
              className="font-semibold text-lg text-gray-800 hover:text-gray-600 duration-200"
            >
              Home
            </Link>
            {authStatus && (
              <Link
                to="/all-posts"
                className="hidden md:inline font-semibold text-lg text-gray-800 hover:text-gray-600 duration-200"
              >
                All Blogs
              </Link>
            )}
          </div>

          <ul className="ml-auto hidden md:flex items-center">
            {!authStatus && (
              <>
                <li>
                  <button
                    onClick={() => navigate("/login")}
                    className="inline-block font-light mr-2 px-6 py-4 text-[13px] cursor-pointer bg-gray-100 duration-200 rounded-3xl text-blue-600 border border-gray-200"
                  >
                    Login
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/signup")}
                    className="inline-block font-light mr-1 px-5 py-4 text-[13px] duration-200 bg-blue-500 hover:bg-blue-300 text-white rounded-3xl"
                  >
                    Signup
                  </button>
                </li>
              </>
            )}
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className={item.className}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null,
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="ml-auto md:hidden p-2 text-gray-800"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <FaTimes className="h-5 w-5" />
            ) : (
              <FaBars className="h-5 w-5" />
            )}
          </button>
        </nav>

        {menuOpen && (
          <div className="md:hidden mt-3 flex flex-col gap-3 border-t border-white/40 pt-3">
            {authStatus && (
              <Link
                to="/all-posts"
                onClick={() => setMenuOpen(false)}
                className="font-semibold text-gray-800"
              >
                All Blogs
              </Link>
            )}
            {!authStatus && (
              <>
                <button
                  onClick={() => goTo("/login")}
                  className="w-full text-left font-light px-4 py-3 text-[13px] bg-gray-100 rounded-2xl text-blue-600 border border-gray-200"
                >
                  Login
                </button>
                <button
                  onClick={() => goTo("/signup")}
                  className="w-full text-left font-light px-4 py-3 text-[13px] bg-blue-500 text-white rounded-2xl"
                >
                  Signup
                </button>
              </>
            )}
            {navItems.map((item) =>
              item.active ? (
                <button
                  key={item.name}
                  onClick={() => goTo(item.slug)}
                  className="w-full text-left font-light px-4 py-3 text-[13px] bg-gray-100 rounded-2xl text-blue-600 border border-gray-200"
                >
                  {item.name}
                </button>
              ) : null,
            )}
            {authStatus && (
              <div className="px-1">
                <LogoutBtn />
              </div>
            )}
          </div>
        )}
      </Container>
    </header>
  );
}

export default Header;
