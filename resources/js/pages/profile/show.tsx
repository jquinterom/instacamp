import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { UserWithPostsLikesAndComments } from '@/types';
import { Link } from '@inertiajs/react';

interface ProfileProps {
    user: UserWithPostsLikesAndComments;
}

const Profile = ({ user }: ProfileProps) => {
    return (
        <AppLayout>
            <div className="mx-auto mt-4 rounded-md text-sm dark:border-gray-700">
                <div className="flex items-center justify-baseline gap-10">
                    <img src={`/storage/${user.profile_image}`} alt="Profile image" className="h-24 w-24 rounded-full object-cover" />
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold"> {user.username} </span>
                            <Link href="/settings/profile" method="get" className="cursor-pointer text-sm text-gray-600">
                                <Button className="text-sm text-gray-600" variant={'outline'}>
                                    Edit Profile
                                </Button>
                            </Link>
                        </div>
                        <div className="flex items-center gap-4">
                            <Label className="text-sm">
                                {user.posts.length} <span className="font-normal">posts</span>{' '}
                            </Label>
                            <Label className="text-sm"> {user.likes.length} likes </Label>
                            <Label className="text-sm"> {user.comments.length} comments </Label>
                        </div>
                        <h1 className="text-2xl font-bold">{user.name}</h1>
                        <p className="font-normal">{user.bio}</p>
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-1 items-center justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {user.posts.map((post) => (
                        <Link key={post.id} href={`/posts/${post.id}`} method="get" as="button" className="cursor-pointer">
                            <img src={`/storage/${post.image_path}`} alt={post.caption} className="h-72 w-72 rounded-md object-cover" />
                        </Link>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
};

export default Profile;
