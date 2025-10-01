import { DataTable } from "@/components/data-table";
import {  columnsComponent } from "@/components/columns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, Category, ResponseFlash } from "@/types";
import { Head, useForm, usePage } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { toast } from "sonner";
import { useDialog } from "@/hooks/use-dialog";
import { DialogWrapper } from "@/components/ui/dialog-wrapper";
import { DialogDescription } from "@/components/ui/dialog";


const Categories: React.FC = () => {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Categorias',
            href: '/categories',
        },
    ];
    const { props } = usePage();
    const response = props.flash as ResponseFlash;
    const { data: createData, setData: setCreateData, reset: resetCreate, processing: processingCreate, errors: errorsCreate, post: postCreate } = useForm({
        'nome-categoria': '',
        'color': ''
    });
    const { delete: deleteCategory, processing: processingDelete } = useForm({});

    const { data: updateData, setData: setUpdateData, patch, processing: processingUpdate } = useForm({
        'nome-categoria': '',
        'color': '',
    });

    const { onOpen, onClose, isOpen } = useDialog();

    const [typeModal, setTypeModal] = useState<'edit' | 'delete' | null>(null);
    const [category, setCategory] = useState<Category>({ id: '', name: '', color: '' });

    // Atualizar categoria
    const handleEditCategory = (category: Category) => {

        patch(route('categories.update', category.id), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(response.success || "Categoria atualizada!");
                setFilteredCategory(prev => prev.map(c => c.id === category.id ? { ...c, name: updateData['nome-categoria'], color: updateData.color } : c));
                onClose();
            },
            onError: (error) => {
                toast.error("Erro ao atualizar categoria: " + error['nome-categoria']);
            }
        });
    };

    // Excluir categoria
    const handleDeleteCategory = (category: Category) => {
        deleteCategory(route('categories.destroy', category.id), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(response.success || "Categoria excluída!");

                onClose();

                setFilteredCategory(prev => prev.filter(c => c.id !== category.id));

            },
            onError: (error) => {
                toast.error("Erro ao excluir categoria:" + error);
            }
        });

    };

    const handleOpenModal = (type: 'edit' | 'delete', category: Category) => {
        setTypeModal(type);
        setCategory(category);
        onOpen();

        if (type === 'edit') {
            setUpdateData({
                'nome-categoria': category.name,
                'color': category.color
            });
        }
    }

    /* Copiar ID da categoria */
    const handleCopyCategory = (category: Category) => {
        navigator.clipboard.writeText(category.name);
        toast.success("Categoria copiada!");
    };

    const [filteredCategory, setFilteredCategory] = useState<Category[]>(props?.categories as Category[] || []);

    const columns = columnsComponent({
        onOpenLocal: (type, category) => handleOpenModal(type, category),
        onCopy: handleCopyCategory,
    });

    const handleNewCategory = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        postCreate(route("categories.store"), {
            preserveScroll: true,
            onSuccess: () => {
                resetCreate();
                toast.success(response.success || 'Categoria criada com sucesso!');

            },
            onError: () => {
                Object.values(errorsCreate).forEach((err) => {
                    toast.error(err);
                })
            }
        });
    }

    const handleOrderCategories = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;

        if (value === '') {
            setFilteredCategory(props.categories as Category[]);

        } else {
            const filtered = filteredCategory.filter((category) =>
                category.name.toLowerCase().includes(value.toLowerCase())
            );

            setFilteredCategory(filtered);
        }

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
                <div className="grid grid-cols-1 lg:grid-cols-2 w-[100%]  gap-4">
                    {/* grid */}
                    <div className=" w-full p-4 rounded-md shadow-md">
                        <div className="flex items-center justify-between py-2">
                            <h2 className="font-semibold text-lg text-primary/60 mb-2">Acompanhar Categoria</h2>
                            <div className="w-1/2">
                                <Input
                                    id="filtro-categoria"
                                    type="text"
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="filtro-categoria"
                                    onChange={handleOrderCategories}
                                    placeholder="Filtrar nomes..."
                                />
                            </div>
                        </div>

                        <div className="w-full">
                            <DataTable columns={columns} data={filteredCategory} />
                        </div>
                    </div>
                    {/* card de adicionar conteudo */}
                    <div className="bg-primary-foreground p-4 rounded-md shadow-md lg:w-1/2 w-full">
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
                                        onChange={(e) => setCreateData('nome-categoria', e.target.value)}
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
                                        onChange={(e) => setCreateData('color', e.target.value)}
                                    />
                                </div>

                                <Button type="submit" variant="default" className="mt-4 w-1/2 cursor-pointer">
                                    {processingCreate ? (
                                        <LoaderCircle className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <>
                                            <IoAddCircleOutline size={30} />
                                            Adicionar
                                        </>
                                    )}
                                </Button>
                            </form>

                        </div>
                    </div>

                </div>

                {isOpen &&
                    <DialogWrapper
                        title={typeModal === 'edit' ? 'Editar Categoria' : 'Excluir Categoria'}
                        isOpen={isOpen}
                        onClose={onClose}
                        processing={typeModal === 'edit' ? processingUpdate : processingDelete}
                        buttonText={typeModal === 'edit' ? 'Confirmar alterações' : 'Excluir'}
                        handleClick={() => {

                            if (typeModal === 'edit') {
                                return handleEditCategory(category);
                            }

                            return handleDeleteCategory(category);
                        }}
                    >
                        {(typeModal === 'edit') ? (
                            <>
                                <div className="w-full">
                                    <Label htmlFor="email">Nome <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="nome-categoria"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        defaultValue={category.name}
                                        autoComplete="nome-categoria"
                                        onChange={(e) => setUpdateData('nome-categoria', e.target.value)}
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
                                        defaultValue={category.color}
                                        onChange={(e) => setUpdateData('color', e.target.value)}
                                    />
                                </div>
                            </>


                        ) : (
                            <DialogDescription>
                                Esta ação não pode ser desfeita.
                                <strong>
                                    Isso excluirá permanentemente a categoria e removerá as tasks que essa categoria pertence.
                                </strong>
                            </DialogDescription>

                        )}

                    </DialogWrapper>
                }

            </div>
        </AppLayout>
    );
}

export default Categories;