import PostCard from '@/components/post-card';
import AppLayout from '@/layouts/app-layout';
import { PostType } from '@/types/PostType';
import { Head } from '@inertiajs/react';

interface DashboardProps {
    posts: PostType[];
}

export default function Dashboard({ posts }: DashboardProps) {
    return (
        <AppLayout>
            <Head title="posts" />
            <div className="mx-auto max-w-xl space-y-4 py-4">{posts?.map((post) => <PostCard key={post.id} post={post} />)}</div>
        </AppLayout>
    );
}
