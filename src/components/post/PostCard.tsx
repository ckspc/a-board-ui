import { Post } from "@/types/post";
import Image from "next/image";
import Link from "next/link";
import { ThreeDots } from "react-loader-spinner";
import UpdatePostModal from "../modal/UpdatePostModal";
import { useState } from "react";
import DeletePostModal from "../modal/DeletePostModal";

interface PostCardProps {
  post: Post;
  isLoading: boolean;
  searchQuery?: string;
  myPost?: boolean;
}

export const PostCard = ({
  post,
  isLoading,
  searchQuery = "",
  myPost,
}: PostCardProps) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const highlightText = (text: string, query: string) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={index} className="bg-[#C5A365]">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  if (isLoading) {
    return (
      <div className="w-full p-4 flex justify-center items-center">
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
    );
  }

  return (
    <div className="w-full p-4 border-b border-gray-200 last:border-b-0">
      <div className="flex gap-3 max-w-full justify-between">
        <div className="flex">
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
          <div className="mb-1 truncate flex items-center">
            <p className="text-[#939494] font-medium">{post.author.name}</p>
          </div>
        </div>
        {myPost && (
          <div className="flex items-center">
            <div className="mx-2">
              <button
                onClick={() => {
                  setIsUpdateModalOpen(true);
                }}
                className="hover:bg-gray-100 rounded-full p-2 transition-colors"
              >
                <svg
                  width="15"
                  height="14"
                  viewBox="0 0 15 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5576 13.0002H13.5576M1.55762 13.0002H2.67398C3.0001 13.0002 3.16316 13.0002 3.31661 12.9633C3.45266 12.9306 3.58272 12.8768 3.70201 12.8037C3.83657 12.7212 3.95187 12.6059 4.18247 12.3753L12.5576 4.00015C13.1099 3.44787 13.1099 2.55244 12.5576 2.00015C12.0053 1.44787 11.1099 1.44787 10.5576 2.00015L2.18246 10.3753C1.95185 10.6059 1.83655 10.7212 1.7541 10.8558C1.68099 10.9751 1.62712 11.1051 1.59446 11.2412C1.55762 11.3946 1.55762 11.5577 1.55762 11.8838V13.0002Z"
                    stroke="#2B5F44"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  setIsDeleteModalOpen(true);
                }}
                className="hover:bg-gray-100 rounded-full p-2 transition-colors"
              >
                <svg
                  width="15"
                  height="16"
                  viewBox="0 0 15 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.2243 3.66716V3.13382C10.2243 2.38709 10.2243 2.01372 10.079 1.7285C9.95113 1.47762 9.74715 1.27364 9.49627 1.14581C9.21106 1.00049 8.83769 1.00049 8.09095 1.00049H7.02428C6.27755 1.00049 5.90418 1.00049 5.61896 1.14581C5.36808 1.27364 5.16411 1.47762 5.03628 1.7285C4.89095 2.01372 4.89095 2.38709 4.89095 3.13382V3.66716M6.22428 7.33382V10.6672M8.89095 7.33382V10.6672M1.55762 3.66716H13.5576M12.2243 3.66716V11.1338C12.2243 12.2539 12.2243 12.814 12.0063 13.2418C11.8146 13.6181 11.5086 13.9241 11.1323 14.1158C10.7044 14.3338 10.1444 14.3338 9.02428 14.3338H6.09095C4.97085 14.3338 4.41079 14.3338 3.98297 14.1158C3.60665 13.9241 3.30068 13.6181 3.10894 13.2418C2.89095 12.814 2.89095 12.2539 2.89095 11.1338V3.66716"
                    stroke="#2B5F44"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="my-2">
          <span className="text-[12px] bg-[#F3F3F3] text-[#4A4A4A] p-2 rounded-full">
            {post.category}
          </span>
        </div>
        <Link href={`/posts/${post.id}`} className="block">
          <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-green-600 line-clamp-2 break-words">
            {highlightText(post.title, searchQuery)}
          </h2>
        </Link>
        <p className="text-gray-600 mb-3 line-clamp-2 break-words">
          {post.content}
        </p>
        <div className="flex items-center text-sm text-gray-500">
          <button className=" flex items-center gap-1">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.2612 6.83301C13.2612 10.1467 10.5749 12.833 7.26123 12.833C6.46313 12.833 5.70143 12.6772 5.00489 12.3943C4.87158 12.3402 4.80493 12.3131 4.75104 12.301C4.69834 12.2892 4.65933 12.2849 4.60532 12.2849C4.5501 12.2849 4.48995 12.2949 4.36966 12.3149L1.99774 12.7103C1.74935 12.7517 1.62516 12.7724 1.53535 12.7338C1.45675 12.7001 1.39412 12.6375 1.3604 12.5589C1.32189 12.4691 1.34258 12.3449 1.38398 12.0965L1.7793 9.72458C1.79935 9.60428 1.80938 9.54414 1.80937 9.48892C1.80936 9.43491 1.80504 9.3959 1.79323 9.3432C1.78115 9.28931 1.75408 9.22266 1.69994 9.08935C1.41705 8.39281 1.26123 7.6311 1.26123 6.83301C1.26123 3.5193 3.94752 0.833008 7.26123 0.833008C10.5749 0.833008 13.2612 3.5193 13.2612 6.83301Z"
                stroke="#939494"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {post._count.comments} Comments
          </button>
        </div>
      </div>

      {post && (
        <UpdatePostModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          postData={post}
        />
      )}
      {post && (
        <DeletePostModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          postId={Number(post.id)}
        />
      )}
    </div>
  );
};
