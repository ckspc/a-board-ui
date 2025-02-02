import { PostCategory } from "./category";

export interface Author {
    id: number;
    username: string;
    name: string;
    signInStatus: boolean;
    imageUrl: string | null;
}

export interface Comment {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    authorId: number;
    postId: number;
    author: Author;
}

export interface Post {
    id: number;
    title: string;
    content: string;
    category: PostCategory;
    createdAt: string;
    updatedAt: string;
    authorId: number;
    author: Author;
    comments: Comment[];
    _count: {
        comments: number;
    };
}

export interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface PostResponse {
    data: Post[];
    meta: PaginationMeta;
}