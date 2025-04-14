import { User } from '.';
import { CommentType } from './CommentType';
import { LikesType } from './Likes';

export interface PostType {
    caption: string;
    image_path: string;
    image_url: string;
    user_id: string;
    id?: number;
    user: User;
    comments: CommentType[];
    created_at: string | null;
    likes: LikesType[] | null;
}
