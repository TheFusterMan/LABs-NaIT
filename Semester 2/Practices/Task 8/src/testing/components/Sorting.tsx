import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAnswer } from '../features/quizSlice';
import { RootState } from '../../store';
import SortableList from './SortableList';

export default function Sorting({ index, tasks }: { index: number, tasks: any[] }) {
    const dispatch = useDispatch();
    const answersFromStore = useSelector((state: RootState) => state.quiz.lists[index]) as string[];

    const initialAnswers = useMemo(() => tasks.map(t => t.answer).sort(() => Math.random() - 0.5), [tasks]);

    useEffect(() => {
        if (!answersFromStore) dispatch(setAnswer({ index, items: initialAnswers }));
    }, []);

    const handleChange = (newItems: string[]) => dispatch(setAnswer({ index, items: newItems }));

    return <SortableList items={answersFromStore || initialAnswers} onChange={handleChange} />;
}