import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import List from '@mui/material/List';
import { SortableItem } from './SortableItem';

interface Props {
    items: string[];
    onChange: (newItems: string[]) => void;
}

export default function SortableList({ items, onChange }: Props) {
    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = items.indexOf(active.id);
            const newIndex = items.indexOf(over.id);
            onChange(arrayMove(items, oldIndex, newIndex));
        }
    };

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
                <List>
                    {items.map((item) => <SortableItem key={item} item={item} />)}
                </List>
            </SortableContext>
        </DndContext>
    );
}