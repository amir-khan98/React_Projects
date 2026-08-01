import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
      // same look as the "Login" button
      className:
        "font-light mr-2 px-4 py-4 text-[13px] cursor-pointer bg-gray-100 duration-200 rounded-3xl text-blue-600 border border-gray-200",
    },
  ];

  return (
    <header className="py-2 border-b border-gray-200 bg-white w-full sticky top-0 z-50">
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
                className="font-semibold text-lg text-gray-800 hover:text-gray-600 duration-200"
              >
                All Posts
              </Link>
            )}
          </div>
          <ul className="flex items-center ml-auto">
            {!authStatus && (
              <>
                <li>
                  <button
                    onClick={() => navigate("/login")}
                    className=" inline-block font-light mr-2 px-6 py-4 text-[13px] cursor-pointer bg-gray-100 duration-200 rounded-3xl text-blue-600 border border-gray-200"
                  >
                    Login
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/signup")}
                    className="inline-block font-light mr-1 px-5 py-4 text-[13px]  duration-200 bg-blue-500 hover:bg-blue-300 text-white rounded-3xl"
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
        </nav>
      </Container>
    </header>
  );
}

export default Header;
