"use client";
import { useSearchParams, useRouter } from "next/navigation";
import SearchContent from "@/components/search/SearchContent";
import { PostCategory } from "@/types/category";
import { useEffect, useState } from "react";
import axiosService from "@/services/api";
import { Post, PostResponse } from "@/types/post";
import { PostCard } from "@/components/post/PostCard";
import { ThreeDots } from "react-loader-spinner";

export default function Home() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const router = useRouter();
  const [currentSearch, setCurrentSearch] = useState("");
  const [currentCategory, setCurrentCategory] = useState<PostCategory | null>(
    null
  );
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      if (page === "my-blog") {
        if (!token) {
          router.push("/account");
          return;
        }

        const { data } = await axiosService.get<PostResponse>(
          "/posts/my-posts",
          {
            params: {
              search: currentSearch ?? undefined,
              category: currentCategory ?? undefined,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPosts(data.data);
      } else {
        const { data } = await axiosService.get<PostResponse>("/posts", {
          params: {
            search: currentSearch ?? undefined,
            category: currentCategory ?? undefined,
          },
        });
        setPosts(data.data);
      }
    } catch {
      setError("Failed to load posts. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchPosts();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [currentSearch, currentCategory]);

  const homeLinkClass =
    page === "home"
      ? "text-green-500  font-extrabold"
      : "text-gray-100 font-medium";
  const myBlogLinkClass =
    page === "my-blog"
      ? "text-green-500  font-extrabold"
      : "text-gray-100 font-medium";

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr_1fr] h-screen">
      <div className="hidden md:block p-10">
        <div className="block mt-3">
          <button
            className={`flex text-green-500 ${homeLinkClass} mb-4 w-full text-left `}
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
                stroke="#243831"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p>Home</p>
          </button>
          <button
            className={`flex text-green-500 ${myBlogLinkClass} mb-4 w-full text-left`}
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
                stroke="#243831"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p>My Blog</p>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        <SearchContent
          onSearchChange={setCurrentSearch}
          onCategoryChange={setCurrentCategory}
        />
        <div className="mt-5 bg-white rounded-xl">
          {isLoading && (
            <div className="flex justify-center items-center py-10">
              <ThreeDots
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          )}

          {error && <div className="text-center text-red-500">{error}</div>}

          {!isLoading && !error && posts.length === 0 && (
            <div className="text-center text-gray-500 m-5">
              No posts found. Try adjusting your search or category filters.
            </div>
          )}

          {!isLoading &&
            !error &&
            posts.map((post: Post) => (
              <PostCard
                key={post.id}
                post={post}
                searchQuery={currentSearch || ""}
                myPost={page === "my-blog"}
                isLoading={isLoading}
              />
            ))}
        </div>
      </div>

      <div className="hidden md:block"></div>
    </div>
  );
}
