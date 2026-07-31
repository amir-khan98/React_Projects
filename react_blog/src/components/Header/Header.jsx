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
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-2 border-b border-gray-200 bg-white w-full">
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
          </div>
          <ul className="flex items-center ml-auto">
            {!authStatus && (
              <>
                <li>
                  <button
                    onClick={() => navigate("/login")}
                    className="font-light mr-3 px-4 py-2 bg-blue-50 text-lg cursor-pointer duration-200 rounded-2xl text-blue-600"
                  >
                    Login
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/signup")}
                    className="font-light px-4 py-2 bg-blue-600 hover:bg-blue-500 text-lg cursor-pointer duration-200 rounded-2xl text-white"
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
                    className="font-semibold mr-2 px-3 py-4 text-lg cursor-pointer duration-200 text-gray-800 hover:text-gray-600"
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
