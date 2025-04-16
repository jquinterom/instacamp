import PostCard from '@/components/post-card';
import AppLayout from '@/layouts/app-layout';
import { PostType } from '@/types/PostType';
import { Head, router } from '@inertiajs/react';

interface DashboardProps {
    posts: PostType[];
}

export default function Dashboard({ posts }: DashboardProps) {
    const handleSaveLike = async (postId: number) => {
        try {
            const response = await fetch(route('likes.store', { post: postId }), {
                method: 'POST',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement).content,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) throw new Error('Error al registrar like');
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteLike = (postId: number) => {
        router.delete(route('likes.destroy', { post: postId }), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout>
            <Head title="posts" />
            <div className="mx-auto max-w-xl space-y-4 py-4">
                {posts?.map((post) => <PostCard key={post.id} post={post} handleSaveLike={handleSaveLike} handleDeleteLike={handleDeleteLike} />)}
            </div>
        </AppLayout>
    );
}
