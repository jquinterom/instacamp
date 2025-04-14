import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { type User } from '@/types';
import { Link } from '@inertiajs/react';
import { LogOut, Settings } from 'lucide-react';
import { UserInfo } from './user-info';

interface UserMenuContentProps {
    user: User;
}

export function UserMenuContent({ user }: UserMenuContentProps) {
    const cleanup = useMobileNavigation();

    return (
        <>
            <DropdownMenuItem className="p-0 font-normal">
                <Link
                    className="flex items-center gap-2 px-1 py-1.5 text-left text-sm"
                    href={route('profile.user.show', user.id)}
                    as="button"
                    prefetch
                    onClick={cleanup}
                >
                    <UserInfo user={user} showEmail={true} />
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link className="block w-full" href={route('profile.edit')} as="button" prefetch onClick={cleanup}>
                    <Settings className="mr-2" />
                    Settings
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link className="block w-full" method="post" href={route('logout')} as="button" onClick={cleanup}>
                    <LogOut className="mr-2" />
                    Log out
                </Link>
            </DropdownMenuItem>
        </>
    );
}
