import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PostType } from '@/types/PostType';
import { Link, router } from '@inertiajs/react';
import { EllipsisVertical } from 'lucide-react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

interface DeletePostDialogProps {
    post: PostType;
}

const PostDropDownOptionsComponent = ({ post }: DeletePostDialogProps) => {
    const handleDeletePost = () => {
        router.delete(route('post.destroy', { post }), {
            preserveScroll: true,
        });
    };

    return (
        <Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <EllipsisVertical className="h-5 w-5 cursor-pointer dark:text-gray-400" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <Link href={route('post.edit', { post })}>
                        <DropdownMenuItem>
                            <span>Edit</span>
                        </DropdownMenuItem>
                    </Link>
                    <DialogTrigger asChild>
                        <DropdownMenuItem>
                            <span>Delete</span>
                        </DropdownMenuItem>
                    </DialogTrigger>
                </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>This action cannot be undone. Are you sure you want to permanently delete this post?</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant={'destructive'} onClick={handleDeletePost}>
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
export default PostDropDownOptionsComponent;
