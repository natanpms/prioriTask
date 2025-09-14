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
                    <h1 className="font-bold text-2xl md:text-3xl tracking-wider text-gray-700">Gerenciar Categorias de Tarefas</h1>
                    <p className="font-semibol tracking-widest text-lg md:text-xl text-gray-500">Adicione, edite ou visualize suas categorias de tarefas</p>
                </div>

                {/* Grids de conteudo */}
                <div className="grid grid-cols-1  gap-4">
                    {/* card de adicionar conteudo */}
                    <div className="bg-primary-foreground p-4 rounded-md shadow-md lg:w-1/2 w-full">
                        <div className="flex flex-col justify-start space-y-1">
                            <h2 className="font-semibold text-lg text-gray-600 mb-2">Nova Categoria</h2>
                            <p className="text-sm font-light text-gray-500">Crie uma nova categoria para organizar suas tarefas</p>

                            <form onSubmit={handleNewCategory} className="flex flex-col justify-center items-start gap-3 mt-4">
                                <div className="lg:w-1/3 w-full">
                                    <Label htmlFor="email">Nome da Categoria <span className="text-red-500">*</span></Label>
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

                                <div className="lg:w-1/3 w-full">
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
                                    className="mt-4  cursor-pointer lg:w-1/3 w-full">
                                    {processing ? (
                                        <LoaderCircle className="h-4 w-4 animate-spin" />

                                    ) : (
                                        <>
                                            <IoAddCircleOutline size={30} />
                                            Adicionar categoria
                                        </>
                                    )
                                    }


                                </Button>
                            </form>

                        </div>
                    </div>
                    <div className="bg-red-300 lg:w-1/2 w-full p-4 rounded-md shadow-md">
                        teste
                    </div>
                </div>

            </div>
        </AppLayout>
    );
}

export default Categories;