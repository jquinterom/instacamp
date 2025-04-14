import { Link, usePage } from '@inertiajs/react';
import { SquarePlus } from 'lucide-react';
import { NavUser } from './nav-user';

const NavBar = () => {
    const { url } = usePage();

    return (
        <div className="flex h-12 w-full justify-between bg-white px-2 shadow-sm dark:bg-gray-950">
            <div className="flex items-center gap-2">
                <Link href="/" prefetch>
                    <h1 className="text-xl font-bold">InstaCamp</h1>
                </Link>

                {(url.startsWith('/') || url.startsWith('/posts')) && <span>Feed</span>}
            </div>

            <div className="flex h-10 items-center justify-center gap-4">
                <Link href="/posts/create" prefetch className="flex items-center gap-0.5">
                    <SquarePlus />
                    <span>New post</span>
                </Link>
                <NavUser />
            </div>
        </div>
    );
};

export default NavBar;
