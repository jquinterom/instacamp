import NavBar from '@/components/nav-bar';
import { NavItem, type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    feed?: NavItem;
    newPost?: NavItem;
    profile?: NavItem;
}

export default ({ children }: AppLayoutProps) => (
    <div className="wf-full min-h-screen">
        <NavBar />
        <div className="container mx-auto">{children}</div>
    </div>
);
