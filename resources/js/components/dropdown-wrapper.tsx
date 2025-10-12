import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';
import { JSX } from 'react';
import { SubMenuProps } from '@/types';

interface DropdownWrapperProps {
    iconPrincipal: JSX.Element;
    subMenuOptions: SubMenuProps[];
}

const DropdownWrapper :React.FC<DropdownWrapperProps> = ({ iconPrincipal, subMenuOptions }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    {iconPrincipal}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Opções</DropdownMenuLabel>
                {subMenuOptions.map((sub, idx) => (
                    <DropdownMenuItem
                        key={idx}
                        className="flex cursor-pointer items-center justify-between"
                        variant={sub.variant}
                        onClick={sub.handleClick}
                    >
                        {sub.title} {sub.icon}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default DropdownWrapper;
