import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { NavItem, type BreadcrumbItem as BreadcrumbItemType } from '@/types';

interface AppSidebarHeaderProps {
    breadcrumbs?: BreadcrumbItemType[];
    feed?: NavItem;
    newPost?: NavItem;
    profile?: NavItem;
}

export function AppSidebarHeader({ breadcrumbs = [], feed, newPost, profile }: AppSidebarHeaderProps) {
    return (
        <header className="border-sidebar-border/50 flex h-16 shrink-0 items-center gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} feed={feed} newPost={newPost} profile={profile} />
            </div>
        </header>
    );
}
