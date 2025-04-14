import { User } from '.';

export interface CommentType {
    comment: string;
    user_id: string;
    post_id: string;
}

export interface CommentWithUser extends CommentType {
    user: User;
}
