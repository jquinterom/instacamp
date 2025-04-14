import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { NavItem, type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Link } from '@inertiajs/react';
import { Fragment } from 'react';

interface BreadcrumbsProps {
    breadcrumbs: BreadcrumbItemType[];
    feed?: NavItem;
    newPost?: NavItem;
    profile?: NavItem;
}

export function Breadcrumbs({ breadcrumbs, feed, newPost, profile }: BreadcrumbsProps) {
    return (
        <>
            {breadcrumbs.length > 0 && (
                <Breadcrumb>
                    <BreadcrumbList>
                        {breadcrumbs.map((item, index) => {
                            const isLast = index === breadcrumbs.length - 1;
                            return (
                                <Fragment key={index}>
                                    <BreadcrumbItem>
                                        {isLast ? (
                                            <BreadcrumbPage>{item.title}</BreadcrumbPage>
                                        ) : (
                                            <BreadcrumbLink asChild>
                                                <Link href={item.href}>{item.title}</Link>
                                            </BreadcrumbLink>
                                        )}
                                    </BreadcrumbItem>
                                    {!isLast && <BreadcrumbSeparator />}
                                </Fragment>
                            );
                        })}
                    </BreadcrumbList>

                    {feed && (
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={feed.href}>{feed.title}</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    )}
                    {newPost && (
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={newPost.href}>{newPost.title}</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    )}
                    {profile && (
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={profile.href}>{profile.title}</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    )}
                </Breadcrumb>
            )}
        </>
    );
}
