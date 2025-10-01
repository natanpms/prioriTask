
import { type User } from '@/types';

export function UserTitle({ user }: { user: User }) {

    return (
        <div className=" text-center leading-tight container mr-7">
            <span className="tracking-wider text-xl text-primary">
                Olá, {user.name}
            </span>
        </div>
    );
}
