import { getMinutesSecondsHoursOrDaysAgo } from '@/lib/utils';
import { PostType } from '@/types/PostType';
import { Link } from '@inertiajs/react';
import { Avatar } from '@radix-ui/react-avatar';
import { Heart, MessageCircle } from 'lucide-react';

interface PostCardProps {
    post: PostType;
}

const PostCard = ({ post }: PostCardProps) => {
    const minutesAgo = getMinutesSecondsHoursOrDaysAgo(new Date(post.created_at ?? Date.now()));

    return (
        <div className="w-full rounded-sm border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="bg-accent flex w-full items-center space-x-2 px-2 py-1">
                {post.user.profile_image?.length ? (
                    <img src={`/storage/${post.user.profile_image}`} alt="User profile image" className="h-6 w-6 rounded-full" />
                ) : (
                    <Avatar className="h-6 w-6 rounded-full bg-gray-400" />
                )}

                <span className="font-semibold">{post.user.username}</span>
            </div>
            <img src={`/storage/${post.image_path}`} alt="Post image" className="max-h-96 min-h-96 w-full object-cover" />
            <div className="flex w-full flex-col gap-4 p-4 text-sm">
                <div className="flex flex-col space-y-2">
                    <div className="flex w-full items-center space-x-2">
                        <Heart className="h-5 w-5 text-blue-700 hover:text-blue-600 dark:border-blue-400 dark:text-blue-400 dark:hover:text-blue-500" />
                        <MessageCircle className="h-5 w-5 text-blue-700 hover:text-blue-600 dark:border-blue-400 dark:text-blue-400 dark:hover:text-blue-500" />
                    </div>

                    <span className="font-semibold">{`${post.likes?.length ?? 0} likes`}</span>
                </div>

                <div className="flex w-full items-center space-x-2">
                    <span className="font-semibold">{post.user.username}</span>
                    <p>{post.caption}</p>
                </div>

                <div className="flex max-w-max flex-col space-x-2">
                    <Link href={route('post.show', post.id)} className="text-gray-500 underline decoration-current">
                        <span>{`View all ${post.comments.length} comments`}</span>
                    </Link>

                    <span>{minutesAgo} </span>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
