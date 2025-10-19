import { Link } from '@inertiajs/react';
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Button } from './ui/button';

interface GridProps {
    type?: string;
    title: string;
    tasksCount: number;
    tasks: any[];
    icon: React.ReactNode;
}

const GridDashboard: React.FC<GridProps> = ({ type, title, tasksCount, tasks, icon }) => {
    const ConditionalRender: React.FC = () => {
        if (tasksCount === 0 && type !== 'pending') {
            return (
                <div className="flex h-40 flex-1 items-center justify-center">
                    <span className="text-gray-400">Nenhum dado disponível</span>
                </div>
            );
        }

        if (tasksCount === 0 && type === 'pending') {
            return (
                <div className="flex h-40 flex-col items-center justify-center">
                    <span className="text-gray-400">Nenhum dado disponível</span>

                    <Button variant="link" className="ml-4 p-0 text-sm">
                        <Link href="/tasks">Adicionar Tarefa</Link>
                    </Button>
                </div>
            );
        }

        return (
            <div>
                <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={tasks}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="priority" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar dataKey="Qtd">
                            {tasks.map((entry, index) => (
                                <Cell key={index} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    };

    return (
        <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
            <div className="grid grid-cols-1 gap-4 p-4">
                <div className="flex items-center justify-between space-x-2 px-4 py-3">
                    <div className="flex items-center space-x-2">
                        <div className="rounded-full bg-[#F3F7FD] p-2">{icon}</div>
                        <span className="font-medium text-black/40 dark:text-gray-300">{title}</span>
                    </div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">{tasksCount}</span>
                </div>
                <hr />
                <ConditionalRender />
            </div>
        </div>
    );
};

export default GridDashboard;
