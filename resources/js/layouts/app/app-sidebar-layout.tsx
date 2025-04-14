import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { NavItem, type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';

interface AppSidebarLayoutProps {
    breadcrumbs?: BreadcrumbItem[];
    feed?: NavItem;
    newPost?: NavItem;
    profile?: NavItem;
}

export default function AppSidebarLayout({ children, breadcrumbs = [], feed, newPost, profile }: PropsWithChildren<AppSidebarLayoutProps>) {
    return (
        <AppShell variant="header">
            <AppSidebar />
            <AppContent variant="header">
                <AppSidebarHeader breadcrumbs={breadcrumbs} feed={feed} newPost={newPost} profile={profile} />
                {children}
            </AppContent>
        </AppShell>
    );
}
