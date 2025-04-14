import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface InputButtonProps {
    classNameContainer?: string;
    placeholder?: string;
}

const InputButton = ({ classNameContainer, placeholder, ...props }: InputButtonProps) => {
    return (
        <div
            className={cn(
                'border-input focus-visible:border-ring focus-visible:ring-ring/50 flex w-full items-center justify-between rounded-md border focus-visible:ring-[3px] dark:border-gray-700 dark:bg-gray-800 dark:focus-visible:ring-gray-700',
                classNameContainer,
            )}
        >
            <Input
                className={
                    'h-7 rounded-e-none border-0 bg-white shadow-none focus-visible:border-none focus-visible:ring-0 dark:bg-gray-800 dark:focus-visible:ring-gray-700'
                }
                {...props}
                placeholder={placeholder}
            />
            <Button
                variant={'outline'}
                className="h-8 rounded-s-none border border-blue-500 px-2 text-blue-500 shadow-none hover:bg-blue-500 hover:text-white"
                size={'sm'}
            >
                Post
            </Button>
        </div>
    );
};

export default InputButton;
