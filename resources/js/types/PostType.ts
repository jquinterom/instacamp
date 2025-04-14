import { User } from '.';
import { CommentWithUser } from './CommentType';
import { LikesType } from './Likes';

export interface PostType {
    caption: string;
    image_path: string;
    image_url: string;
    user_id: string;
    id?: number;
    user: User;
    comments: CommentWithUser[];
    created_at: string | null;
    likes: LikesType[] | null;
}
