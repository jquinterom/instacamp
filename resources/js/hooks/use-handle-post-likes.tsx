import { cn } from '@/lib/utils';
import { PostType } from '@/types/PostType';
import { router } from '@inertiajs/react';
import { useState } from 'react';

interface HandleProps {
    post: PostType;
    userId: number | string;
}

export const useHandlePostLikes = ({ post, userId }: HandleProps) => {
    const handleDeleteLike = (postId: number) => {
        router.delete(route('likes.destroy', { post: postId }), {
            preserveScroll: true,
        });
    };

    const handleSaveLike = async (postId: number) => {
        try {
            // const responseToken = await fetch('/csrf-token', {
            //     credentials: 'include',
            // });
            // const data = await responseToken.json();

            const response = await fetch(route('likes.store', { post: postId }), {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                credentials: 'include',
                body: new URLSearchParams({}),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al registrar like');
            }

            return await response.json();
        } catch (error) {
            console.error('Error en handleSaveLike:', error);
            throw error;
        }
    };

    const [someLikeByUser, setSomeLikeByUser] = useState<boolean | undefined>(post.likes?.some((like) => like.user_id === userId));
    const [likesCount, setLikesCount] = useState<number>(post.likes?.length ?? 0);

    const handleClickLike = async () => {
        if (someLikeByUser) {
            handleDeleteLike(post.id!);
            setSomeLikeByUser(false);
            setLikesCount(likesCount - 1);
            return;
        }

        await handleSaveLike(post.id!);
        setSomeLikeByUser(true);
        setLikesCount(likesCount + 1);
        return;
    };

    return {
        handleClickLike,
        someLikeByUser,
        likesCount,
        handleDeleteLike,
    };
};

export const postHasLikesClass = (someLikeByUser: boolean | undefined) => {
    return cn(`h-5 w-5`, `${someLikeByUser ? 'fill-red-500 text-red-500 hover:text-red-600' : 'text-blue-700 hover:text-blue-600'}`);
};
