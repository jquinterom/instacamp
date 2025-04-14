import AppLayout from '@/layouts/app-layout';
import { NavItem, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { PostType } from '../types/PostType';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const feed: NavItem = {
    title: 'Feed',
    href: '/dashboard/feed',
};

const newPost: NavItem = {
    title: 'New Post',
    href: '/dashboard/new-post',
};

const profile: NavItem = {
    title: 'Profile',
    href: '/dashboard/profile',
};

interface DashboardProps {
    posts: PostType[];
}

export default function Dashboard({ posts }: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs} feed={feed} newPost={newPost} profile={profile}>
            <Head title="Dashboard" />
            {posts?.map((post) => <div key={post.user_id}>{post.caption}</div>)}
        </AppLayout>
    );
}
