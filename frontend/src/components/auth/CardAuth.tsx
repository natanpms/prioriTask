'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface CardAuthProps {
    isLogin: Boolean;
}

const CardAuth: React.FC<CardAuthProps> = ({ isLogin }) => {

    const [isVisible, setIsVisible] = useState<Boolean>(false);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="rounded-md shadow-md space-y-4 p-6 h-auto text-center max-w-4/5 lg:max-w-1/3">
                <Image
                    src="/loginIcon.svg"
                    alt="icon"
                    width={40}
                    height={40}
                    className="mx-auto"
                />
                <h1 className="text-2xl font-bold">{isLogin ? 'Entre' : 'Cadastre-se'} com seu melhor email</h1>
                <p className="text-sm font-extralight text-gray-700">Use o email mais adequado para seu workspace</p>

                <Button className="cursor-pointer w-full" variant="outline" size="sm">
                    <FaGoogle /> Entrar com o Google
                </Button>
                <hr />

                <div className="flex flex-col justify-center gap-3 items-start">
                    {!isLogin && (
                        <>
                            <Label htmlFor="nome">Nome</Label>
                            <Input type="text" id="nome" placeholder="Digite seu nome" />
                        </>
                    )}
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" placeholder="Email" />
                    <Label htmlFor="email">Senha</Label>
                    <div className="relative w-full">
                        <span className="text-primary text-sm hover:underline  cursor-pointer absolute right-2 -top-8">Esqueceu a senha ?</span>
                        <Input type={isVisible ? 'text' : 'password'} id="password" placeholder="********" />
                        <span className="cursor-pointer" onClick={() => setIsVisible(!isVisible)}>
                            {isVisible ? <Eye className="absolute right-2 top-2" width={18} /> : <EyeOff className="absolute right-2 top-2" width={18} />}
                        </span>
                    </div>
                    <Button className="cursor-pointer w-full" variant="default" size="default">
                        {isLogin ? 'Entrar' : 'Cadastre-se'}
                    </Button>
                    <div className="relative w-full py-2">
                        <Link className="text-primary text-sm hover:underline cursor-pointer absolute right-0" href={isLogin ? '/register' : '/login'}>
                            {isLogin ? 'Não possui conta ? Cadastre-se' : 'Já possui conta ? Entre agora'}
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default CardAuth;
