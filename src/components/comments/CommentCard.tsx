import React from "react";
import Image from "next/image";
import { formatRelativeTime } from "@/utils/formatRelativeTime";
import { Comment } from "@/types/post";

interface CommentCardProps {
  comment: Comment;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  return (
    <div className="flex items-start space-x-3 mb-4">
      <div className="flex-shrink-0 relative w-10 h-10">
        {comment.author.imageUrl ? (
          <div className="relative w-10 h-10">
            <Image
              src="https://fd.lnwfile.com/_/fd/_raw/mf/7z/sr.jpg"
              alt={comment.author.name}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
          </div>
        ) : (
          <div className="w-10 h-10 bg-gray-300 rounded-full" />
        )}
        {comment.author.signInStatus && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-600 border-2 border-white rounded-full" />
        )}
      </div>

      <div className="flex-1">
        <div className="flex items-center">
          <h4 className="text-[14px] font-medium text-[#191919]">
            {comment.author.name}
          </h4>

          <p className="ml-3 text-sm text-gray-500">
            {formatRelativeTime(comment.createdAt)}
          </p>
        </div>
        <p className="text-[12px] text-gray-700 break-all">{comment.content}</p>
      </div>
    </div>
  );
};

export default CommentCard;
