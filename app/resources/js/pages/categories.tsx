import { DataTable } from "@/components/data-table";
import { Category, columns } from "@/components/columns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, useForm, usePage } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { toast } from "sonner";

type ResponseFlash = {
    success?: string;
}

const Categories: React.FC = () => {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Categorias',
            href: '/categories',
        },
    ];
    const { props } = usePage();
    const response = props.flash as ResponseFlash;
    const { data, reset, recentlySuccessful, setData, processing, errors, post } = useForm({
        'nome-categoria': '',
        'color': ''
    });

    const handleNewCategory = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        post(route("categories.store"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                toast.success(response.success || 'Categoria criada com sucesso!');
            },
            onError: () => {
                Object.values(errors).forEach((err) => {
                    toast.error(err);
                })
            }
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">

                <div className="flex flex-col justify-center items-start space-y-2">
                    <h1 className="font-bold text-2xl md:text-3xl tracking-wider text-primary">Gerenciar Categorias de Tarefas</h1>
                    <p className="font-semibol tracking-widest text-lg md:text-xl text-gray-500">Adicione, edite ou visualize suas categorias de tarefas</p>
                </div>

                {/* Grids de conteudo */}
                <div className="grid grid-cols-1 md:grid-cols-2 w-[100%]  gap-4">
                    {/* grid */}
                    <div className=" w-full p-4 rounded-md shadow-md">
                        <div className="flex items-center justify-between py-2">
                            <h2 className="font-semibold text-lg text-primary/60 mb-2">Acompanhar Categoria</h2>
                            <div className="w-1/2">
                                <Input
                                    id="nome-categoria"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="nome-categoria"
                                    // onChange={(e) => setData('nome-categoria', e.target.value)}
                                    placeholder="Filtrar categorias..."
                                />
                            </div>
                        </div>

                        <div className="w-full">
                            <DataTable columns={columns} data={props?.categories as Category[]} />
                        </div>
                    </div>
                    {/* card de adicionar conteudo */}
                    <div className="bg-primary-foreground p-4 rounded-md shadow-md w-1/2">
                        <div className="flex flex-col justify-start space-y-1">
                            <h2 className="font-semibold text-lg text-primary/60 mb-2">Nova Categoria</h2>
                            <p className="text-sm font-light text-gray-500">Crie uma nova categoria para organizar suas tarefas</p>

                            <form onSubmit={handleNewCategory} className="flex flex-col justify-center items-center gap-3 mt-4">
                                <div className="w-full">
                                    <Label htmlFor="email">Nome <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="nome-categoria"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="nome-categoria"
                                        onChange={(e) => setData('nome-categoria', e.target.value)}
                                        placeholder="Exemplo: Trabalho, Pessoal, Estudos..."
                                    />
                                </div>

                                <div className="w-full">
                                    <Label htmlFor="color">Cor <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="color"
                                        type="color"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="color"
                                        onChange={(e) => setData('color', e.target.value)}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    variant="default"
                                    className="mt-4  cursor-pointer w-1/2">
                                    {processing ? (
                                        <LoaderCircle className="h-4 w-4 animate-spin" />

                                    ) : (
                                        <>
                                            <IoAddCircleOutline size={30} />
                                            Adicionar
                                        </>
                                    )
                                    }

                                </Button>
                            </form>

                        </div>
                    </div>

                </div>

            </div>
        </AppLayout>
    );
}

export default Categories;