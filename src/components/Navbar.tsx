"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import axiosService from "@/services/api";
import useUserStore from "@/stores/useUserStore";

const Navbar = () => {
  const { profile, setProfile } = useUserStore();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && !profile) {
      axiosService
        .get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setProfile(response.data);
        });
    }
  }, [profile, setProfile]);

  const handleSignInClick = () => {
    router.push("/account");
  };

  if (pathname === "/account") {
    return null;
  }
  const page = searchParams.get("page");

  const homeLinkClass = page === "home" ? "text-white  font-extrabold" : "text-gray-100 font-medium";
  const myBlogLinkClass = page === "my-blog" ? "text-white  font-extrabold" : "text-gray-100 font-medium";
  const homeStrokeColor = page === "home" ? "#FFFFFF" : "#D8E9E4";
  const myBlogStrokeColor = page === "my-blog" ? "#FFFFFF" : "#D8E9E4";

  return (
    <div className="flex justify-between items-center p-4 bg-green-500 md:h-[60px] h-[72px] relative">

      <div className="text-white font-castoro text-[20px] font-normal md:text-[20px] italic">
        a Board
      </div>

      <button
        className="md:hidden flex items-center justify-center text-white"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <div className="hidden md:flex items-center space-x-4">
        {!profile ? (
          <button
            className="bg-btn-success text-white py-2 px-4 rounded-lg"
            onClick={handleSignInClick}
          >
            Sign In
          </button>
        ) : (
          <div className="flex items-center space-x-2">
            <span className="text-white">{profile.name}</span>{" "}
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
              {profile.imageUrl ? (
                <img
                  src={profile.imageUrl}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-white text-xl">{profile.name[0]}</span>
              )}
            </div>
          </div>
        )}
      </div>

      <div
        className={`z-[999] fixed top-0 right-0 h-full bg-green-500 shadow-lg transform transition-all duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:w-5/6 w-4/6`}
      >
        <div className="flex justify-start p-[32px] pb-0">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-white text-xl"
          >
            <svg
              width="19"
              height="15"
              viewBox="0 0 19 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.10645 7.48804L17.1064 7.48804M17.1064 7.48804L11.1064 1.48804M17.1064 7.48804L11.1064 13.488"
                stroke="#D8E9E4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="p-[32px]">
          <div className="block mt-3">
            <button
              className={`flex ${homeLinkClass} mb-4 w-full text-left `}
              onClick={() => (window.location.href = "/?page=home")}
            >
              <svg
                width="21"
                height="22"
                viewBox="0 0 21 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-3 text-red"
              >
                <path
                  d="M6.10645 16.488H14.1064M9.12414 2.25204L2.34184 7.52716C1.88847 7.87978 1.66178 8.05609 1.49847 8.27689C1.35381 8.47248 1.24605 8.69282 1.18047 8.92709C1.10645 9.19156 1.10645 9.47873 1.10645 10.0531V17.288C1.10645 18.4081 1.10645 18.9682 1.32443 19.396C1.51618 19.7723 1.82214 20.0783 2.19846 20.27C2.62629 20.488 3.18634 20.488 4.30645 20.488H15.9064C17.0266 20.488 17.5866 20.488 18.0144 20.27C18.3908 20.0783 18.6967 19.7723 18.8885 19.396C19.1064 18.9682 19.1064 18.4081 19.1064 17.288V10.0531C19.1064 9.47873 19.1064 9.19156 19.0324 8.92709C18.9668 8.69282 18.8591 8.47248 18.7144 8.27689C18.5511 8.05609 18.3244 7.87978 17.8711 7.52716L11.0888 2.25204C10.7374 1.97878 10.5618 1.84216 10.3678 1.78964C10.1966 1.7433 10.0162 1.7433 9.8451 1.78964C9.65113 1.84216 9.47547 1.97878 9.12414 2.25204Z"
                  stroke={homeStrokeColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p>Home</p>
            </button>
            <button
              className={`flex ${myBlogLinkClass} mb-4 w-full text-left`}
              onClick={() => (window.location.href = "/?page=my-blog")}
            >
              <svg
                width="22"
                height="23"
                viewBox="0 0 22 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-3"
              >
                <path
                  d="M10.1064 3.48802H5.90645C4.22629 3.48802 3.38621 3.48802 2.74447 3.815C2.17999 4.10262 1.72105 4.56156 1.43343 5.12605C1.10645 5.76778 1.10645 6.60786 1.10645 8.28802V16.688C1.10645 18.3682 1.10645 19.2083 1.43343 19.85C1.72105 20.4145 2.17999 20.8734 2.74447 21.161C3.38621 21.488 4.22629 21.488 5.90645 21.488H14.3064C15.9866 21.488 16.8267 21.488 17.4684 21.161C18.0329 20.8734 18.4918 20.4145 18.7795 19.85C19.1064 19.2083 19.1064 18.3682 19.1064 16.688V12.488M7.10642 15.488H8.78096C9.27014 15.488 9.51473 15.488 9.74491 15.4328C9.94898 15.3838 10.1441 15.303 10.323 15.1933C10.5248 15.0696 10.6978 14.8967 11.0437 14.5508L20.6064 4.98802C21.4349 4.15959 21.4349 2.81645 20.6064 1.98802C19.778 1.15959 18.4349 1.15959 17.6064 1.98802L8.04368 11.5508C7.69778 11.8967 7.52482 12.0696 7.40114 12.2715C7.29148 12.4504 7.21067 12.6455 7.16168 12.8496C7.10642 13.0797 7.10642 13.3243 7.10642 13.8135V15.488Z"
                  stroke={myBlogStrokeColor}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p>My Blog</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
