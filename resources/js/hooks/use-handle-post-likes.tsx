import { PostType } from '@/types/PostType';
import { useState } from 'react';

interface HandleProps {
    post: PostType;
    handleSaveLike: (postId: number) => void;
    handleDeleteLike: (postId: number) => void;
    userId: number | string;
}

export const useHandlePostLikes = ({ post, handleSaveLike, handleDeleteLike, userId }: HandleProps) => {
    const [someLikeByUser, setSomeLikeByUser] = useState<boolean | undefined>(post.likes?.some((like) => like.user_id === userId));
    const [likesCount, setLikesCount] = useState<number>(post.likes?.length ?? 0);

    const handleClickLike = () => {
        if (someLikeByUser) {
            handleDeleteLike(post.id!);
            setSomeLikeByUser(false);
            setLikesCount(likesCount - 1);
            return;
        }

        handleSaveLike(post.id!);
        setSomeLikeByUser(true);
        setLikesCount(likesCount + 1);
        return;
    };

    return {
        handleClickLike,
        someLikeByUser,
        likesCount,
    };
};
