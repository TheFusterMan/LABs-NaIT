import { Grid, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useMemo, useEffect } from 'react';
import { tTasks } from '../quizData';
import { useDispatch, useSelector } from 'react-redux';
import { setAnswer } from '../features/quizSlice';
import { RootState } from '../../store';
import SortableList from './SortableList';

interface ComponentProps {
    index: number,
    tasks: tTasks
}

export default function Matching({ index, tasks }: ComponentProps) {
    const dispatch = useDispatch();
    const answersFromStore = useSelector((state: RootState) => state.quiz.lists[index]) as string[];

    const initialAnswers = useMemo(() => {
        return tasks.map(item => item.answer).sort(() => Math.random() - 0.5)
    }, [tasks]);

    useEffect(() => {
        if (!answersFromStore) dispatch(setAnswer({ index, items: initialAnswers }));
    }, []);

    const handleChange = (newItems: string[]) => dispatch(setAnswer({ index, items: newItems }));

    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
                <List>
                    {tasks.map((item, i) => (
                        <ListItem key={i}>
                            <ListItemButton
                                sx={{
                                    border: '1px solid gray',
                                    borderRadius: '5px',
                                    textAlign: 'right'
                                }}>
                                <ListItemText primary={item.question} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <SortableList items={answersFromStore || initialAnswers} onChange={handleChange} />
            </Grid>
        </Grid>
    );
}