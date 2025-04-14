import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Textarea } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

interface PostForm {
    caption: string;
    image: File | null;
}

const PostComponent = () => {
    const { data, setData, post, processing, errors, reset } = useForm<Required<PostForm>>({
        caption: '',
        image: null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('posts.store'), {
            onFinish: () => reset('caption'),
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            return;
        }

        setData('image', null);
    };

    return (
        <div className="container mx-auto mt-4 max-w-xl rounded-md border border-gray-300 text-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="bg-accent rounded-t-md px-2 py-1.5">
                <Label>Create New Post</Label>
            </div>
            <form className="flex flex-col gap-6 p-4" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="caption">Caption</Label>
                        <Textarea
                            id="caption"
                            className="mt-1 block w-full rounded-md border-1 border-gray-300 p-2 text-sm"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="caption"
                            value={data.caption}
                            onChange={(e) => setData('caption', e.target.value)}
                            placeholder="Caption"
                        />

                        <Label htmlFor="image">Image</Label>
                        <Input type="file" id="image" accept="image/*" onChange={handleImageChange} />
                        <input type="submit" className="hidden" />
                    </div>

                    <div className="flex items-start gap-4">
                        <Button type="submit" className="rounded-md bg-blue-700 dark:bg-blue-400" tabIndex={2} disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Create
                        </Button>
                    </div>
                </div>

                {errors.image && (
                    <div className="mt-2 text-sm font-medium text-red-600">
                        <p>{errors.image}</p>
                    </div>
                )}
            </form>
        </div>
    );
};

const PostCreate = () => {
    return (
        <AppLayout>
            <Head title="Create new post" />
            <PostComponent />
        </AppLayout>
    );
};

export default PostCreate;
