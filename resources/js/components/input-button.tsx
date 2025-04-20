import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface InputButtonProps {
    classNameContainer?: string;
    placeholder?: string;
    handleSetComment?: (comment: string) => void;
    onClick?: () => void;
    isLoading?: boolean;
}

const InputButton = ({ classNameContainer, placeholder, handleSetComment, onClick, isLoading, ...props }: InputButtonProps) => {
    const [comment, setComment] = useState<string>('');

    const handleClick = () => {
        if (onClick) {
            onClick();
            setComment('');
        }
    };

    const handleOnValueChange = (comment: string) => {
        setComment(comment);
        if (handleSetComment) {
            handleSetComment(comment);
        }
    };

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
                value={comment}
                onChange={(e) => handleOnValueChange(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleClick();
                    }
                }}
            />
            <Button
                variant={'outline'}
                className="h-8 rounded-s-none border border-blue-500 px-2 text-blue-500 shadow-none hover:bg-blue-500 hover:text-white"
                size={'sm'}
                onClick={handleClick}
                disabled={isLoading}
            >
                Post
            </Button>
        </div>
    );
};

export default InputButton;
