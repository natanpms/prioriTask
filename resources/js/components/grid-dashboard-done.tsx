import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

const GridDashboardDone = () => {
    const [isFiltered,setIsFiltered] = useState('');
    const filteredTasksDone = [{ title: 'Dia', value: 'day' }, { title: 'Semana', value: 'week' }, { title: 'Mês', value: 'month' }];

    return (
        <div className="w-full p-4">
            <div className="flex flex-col lg:flex-row lg:justify-between px-4 space-y-2">
                <div className="flex items-center space-x-2">
                    <div className="rounded-full bg-[#F3F7FD] p-2">
                        <FaCheck className="text-primary/40" />
                    </div>
                    <span className="font-medium text-black/40 dark:text-gray-300">Tarefas Concluídas</span>
                </div>
                <div className="flex justify-center items-center gap-3">
                    {filteredTasksDone?.map((t, index) => (
                        <div className="px-4">
                            <span
                                key={index}
                                className="transform cursor-pointer font-medium text-black/40 underline-offset-8 transition-transform hover:scale-125 hover:text-primary hover:underline dark:text-gray-300"
                                onClick={() => setIsFiltered(t?.value)}
                            >
                                {t.title}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <hr className='my-3' />
        </div>
    );
};

export default GridDashboardDone;
