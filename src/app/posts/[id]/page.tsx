"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axiosService from "@/services/api";
import { Post } from "@/types/post";
import Image from "next/image";
import { ThreeDots } from "react-loader-spinner";
import { formatRelativeTime } from "@/utils/formatRelativeTime";
import CommentCard from "@/components/comments/CommentCard";
import CloseButton from "@/components/button/CloseButton";
import SuccessButton from "@/components/button/SuccessButton";
import CreateCommentModal from "@/components/modal/CreateCommentModal";

export default function PostPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id;

  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [commentText, setCommentText] = useState("");

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const openComment = () => {
    setIsCommentOpen(true);
  };

  const onClose = () => {
    setIsCommentOpen(false);
  };

  const handleCommentSubmit = async () => {
    if (commentText.trim()) {
      try {
        const token = localStorage.getItem("token");

        await axiosService.post(
          "/comments",
          {
            content: commentText,
            postId: Number(postId),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        window.location.reload();

        setCommentText("");
        setIsCommentOpen(false);
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const { data } = await axiosService.get<Post>(`/posts/${postId}`);
        setPost(data);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Failed to load post. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          radius="9"
          ariaLabel="three-dots-loading"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] h-screen">
      <div className="hidden md:block p-10">
        <div className="block mt-3">
          <button
            className={`flex text-green-500  mb-4 w-full text-left `}
            onClick={() => router.push("/?page=home")}
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
            className={`flex text-green-500 mb-4 w-full text-left`}
            onClick={() => router.push("/?page=my-blog")}
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

      <div className="flex-1 overflow-y-auto pt-10 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <button
            type="button"
            className="bg-green-100 p-3 rounded-full cursor-pointer hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mb-4"
            onClick={() => router.push("/")}
            aria-label="Go to home page"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.3398 8.40674H1.33984M1.33984 8.40674L8.33984 15.4067M1.33984 8.40674L8.33984 1.40674"
                stroke="#243831"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {post && (
            <div className="mt-5">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 relative w-10 h-10">
                  {post.author.imageUrl ? (
                    <div className="relative w-10 h-10">
                      <Image
                        src="https://fd.lnwfile.com/_/fd/_raw/mf/7z/sr.jpg"
                        alt={post.author.name}
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-gray-300 rounded-full" />
                  )}
                  {post.author.signInStatus && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-600 border-2 border-white rounded-full" />
                  )}
                </div>
                <p className="text-[14px] font-medium text-gray-900 mx-3">
                  {post.author.name}
                </p>
                <p className="text-[12px] font-normal text-[#939494]">
                  {formatRelativeTime(post.createdAt)}
                </p>
              </div>
              <span className="text-[12px] bg-[#F3F3F3] text-[#4A4A4A] p-2 rounded-full mb-4">
                {post.category}
              </span>

              <h1 className="text-[24px] font-bold mb-4 text-gray-900">
                {post.title}
              </h1>

              <div className="text-[12px] prose max-w-none text-[#191919]">
                {post.content}
              </div>

              <div className="mt-6 flex items-center text-sm text-gray-500">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2"
                >
                  <path
                    d="M13.2612 6.83301C13.2612 10.1467 10.5749 12.833 7.26123 12.833C6.46313 12.833 5.70143 12.6772 5.00489 12.3943C4.87158 12.3402 4.80493 12.3131 4.75104 12.301C4.69834 12.2892 4.65933 12.2849 4.60532 12.2849C4.5501 12.2849 4.48995 12.2949 4.36966 12.3149L1.99774 12.7103C1.74935 12.7517 1.62516 12.7724 1.53535 12.7338C1.45675 12.7001 1.39412 12.6375 1.3604 12.5589C1.32189 12.4691 1.34258 12.3449 1.38398 12.0965L1.7793 9.72458C1.79935 9.60428 1.80938 9.54414 1.80937 9.48892C1.80936 9.43491 1.80504 9.3959 1.79323 9.3432C1.78115 9.28931 1.75408 9.22266 1.69994 9.08935C1.41705 8.39281 1.26123 7.6311 1.26123 6.83301C1.26123 3.5193 3.94752 0.833008 7.26123 0.833008C10.5749 0.833008 13.2612 3.5193 13.2612 6.83301Z"
                    stroke="#939494"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {post._count.comments} Comments
              </div>
              <div className="mt-6">
                <div className="mb-3">
                  <CloseButton
                    className="font-semibold w-[152px] h-[40px]"
                    onClick={openComment}
                  >
                    Add&nbsp;Comments
                  </CloseButton>
                </div>
                {isMobile && (
                  <CreateCommentModal
                    isOpen={isCommentOpen}
                    onClose={() => setIsCommentOpen(false)}
                    postId={Number(postId)}
                  />
                )}

                {!isMobile && isCommentOpen && (
                  <div className="mt-4">
                    <textarea
                      className="w-full h-20 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
                      placeholder="What's on your mind..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                    <div className="flex justify-end mt-2">
                      <CloseButton
                        className="font-semibold w-24 h-[40px] mx-2 mb-5"
                        onClick={onClose}
                      >
                        Cancel
                      </CloseButton>
                      <SuccessButton
                        onClick={handleCommentSubmit}
                        className="font-semibold w-24 h-[40px]"
                        isLoading={isLoading}
                        disabled={!commentText}
                      >
                        Post
                      </SuccessButton>
                    </div>
                  </div>
                )}

                {post?.comments?.map((comment) => (
                  <CommentCard key={comment.id} comment={comment} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
