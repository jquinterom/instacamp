import AppLayout from '@/layouts/app-layout';
import { PostType } from '@/types/PostType';

interface PostDetailsProps {
    post: PostType;
}

const PostDetails = ({ post }: PostDetailsProps) => {
    console.log('post', post);

    return <AppLayout>PostDetails</AppLayout>;
};

export default PostDetails;
