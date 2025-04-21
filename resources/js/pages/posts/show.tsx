import InputButton from '@/components/input-button';
import PostDropDownOptionsComponent from '@/components/post-dropdown-options';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { postHasLikesClass, useHandlePostLikes } from '@/hooks/use-handle-post-likes';
import AppLayout from '@/layouts/app-layout';
import { formatDate } from '@/lib/utils';
import { SharedData } from '@/types';
import { CommentWithUser } from '@/types/CommentType';
import { PostType } from '@/types/PostType';
import { useForm, usePage } from '@inertiajs/react';
import { Heart, X } from 'lucide-react';

interface PostDetailsProps {
    post: PostType;
}

interface CommentForm {
    comment: string;
}

const PostDetails = ({ post }: PostDetailsProps) => {
    const postDate = new Date(post.created_at || Date.now());
    const page = usePage<SharedData>();
    const { auth } = page.props;

    const { handleClickLike, someLikeByUser, likesCount } = useHandlePostLikes({ post, userId: auth.user.id });

    const {
        setData,
        post: handlePost,
        processing,
        reset,
        delete: handleDelete,
    } = useForm<Required<CommentForm>>({
        comment: '',
    });

    const handleSetComment = (comment: string) => {
        setData('comment', comment);
    };

    const handlePostComment = () => {
        handlePost(route('comments.store', { post: post }), {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => reset(),
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
            },
        });
    };

    const handleDeleteComment = (comment: CommentWithUser) => {
        handleDelete(route('comments.destroy', { comment }), {
            preserveState: true,
            preserveScroll: true,
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
            },
        });
    };

    return (
        <AppLayout>
            <div className="mx-auto flex w-full items-center justify-center py-4 text-sm">
                <img
                    src={`/storage/${post.image_path}`}
                    alt={post.caption}
                    className="h-96 w-2/3 max-w-xl bg-gray-100 object-contain dark:bg-gray-900"
                />
                <div className="flex w-full flex-col gap-4 p-4 lg:w-lg">
                    <div className="flex w-full items-center justify-between">
                        <div className="flex items-center gap-2">
                            <img src={`/storage/${post.user.profile_image}`} alt="Profile image" className="h-6 w-6 rounded-full object-cover" />
                            <span className="text-sm font-semibold">{post.user.username}</span>
                        </div>

                        {auth.user.id === post.user.id && <PostDropDownOptionsComponent post={post} />}
                    </div>
                    <div className="flex gap-2">
                        <span className="text-sm font-semibold">{post.user.name}</span>
                        <span className="text-sm">{post.caption}</span>
                    </div>

                    <div className="h-px bg-gray-300 dark:bg-gray-700" />

                    <div>
                        <Heart className={postHasLikesClass(someLikeByUser)} onClick={handleClickLike} />
                        <div></div>
                        <Label>{likesCount || 0} likes</Label>
                    </div>

                    <span className="text-gray-500">{formatDate(new Date(postDate))}</span>

                    <div className="w-full">
                        {!!post.comments.length && <div className="h-px bg-gray-300 dark:bg-gray-700" />}
                        {post.comments?.map((comment) => (
                            <div key={comment.comment} className="flex justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold">{comment.user.username}</span>
                                    <span className="line-clamp-1">{comment.comment}</span>
                                </div>

                                <Button
                                    variant={'ghost'}
                                    size={'sm'}
                                    className="focus-visible:ring-none hover:bg-white focus-visible:border-none hover:dark:bg-gray-950"
                                    onClick={() => handleDeleteComment(comment)}
                                >
                                    <X className="h-4 w-4 text-red-700" />
                                </Button>
                            </div>
                        ))}
                    </div>

                    <div className="h-px bg-gray-300 dark:bg-gray-700" />

                    <div className="w-full">
                        <InputButton
                            classNameContainer="w-full"
                            placeholder="Write a comment"
                            onClick={handlePostComment}
                            isLoading={processing}
                            handleSetComment={handleSetComment}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default PostDetails;
