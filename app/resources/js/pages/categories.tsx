import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";


const Categories:React.FC = () => {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Categorias',
            href: '/categories',
        },
    ];

    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                  teste
                </div>
                
            </div>
        </AppLayout>
    );
}

export default Categories;