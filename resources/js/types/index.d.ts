import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';
import { CommentType } from './CommentType';
import { LikesType } from './Likes';
import { PostType } from './PostType';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    username: string | null;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    profile_image: string | null;
    bio: string | null;
    [key: string]: unknown; // This allows for additional properties...
}

export interface UserWithPostsLikesAndComments extends User {
    posts: PostType[];
    likes: LikesType[];
    comments: CommentType[];
}
