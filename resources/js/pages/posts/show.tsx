import InputButton from '@/components/input-button';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { formatDate } from '@/lib/utils';
import { PostType } from '@/types/PostType';
import { EllipsisVertical, HeartIcon, X } from 'lucide-react';

interface PostDetailsProps {
    post: PostType;
}

const PostDetails = ({ post }: PostDetailsProps) => {
    const postDate = new Date(post.created_at || Date.now());

    return (
        <AppLayout>
            <div className="mx-auto flex w-full py-4 text-sm">
                <img src={`/storage/${post.image_path}`} alt={post.caption} className="h-96 w-2/3 object-cover" />
                <div className="flex w-full flex-col gap-4 p-4">
                    <div className="flex w-full items-center justify-between">
                        <div className="flex items-center gap-2">
                            <img src={`/storage/${post.user.profile_image}`} alt="Profile image" className="h-6 w-6 rounded-full object-cover" />
                            <span className="text-sm font-semibold">{post.user.username}</span>
                        </div>
                        <EllipsisVertical className="h-5 w-5 dark:text-gray-400" />
                    </div>
                    <div className="flex gap-2">
                        <span className="text-sm font-semibold">{post.user.name}</span>
                        <span className="text-sm">{post.caption}</span>
                    </div>

                    <div className="h-px bg-gray-300 dark:bg-gray-700" />

                    <div>
                        <HeartIcon className="h-5 w-5 text-blue-700" />
                        <div></div>
                        <Label>{post.likes?.length || 0} likes</Label>
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
                                >
                                    <X className="h-4 w-4 text-red-700" />
                                </Button>
                            </div>
                        ))}
                    </div>

                    <div className="h-px bg-gray-300 dark:bg-gray-700" />

                    <div className="w-full">
                        <InputButton classNameContainer="w-full" placeholder="Write a comment" />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default PostDetails;
