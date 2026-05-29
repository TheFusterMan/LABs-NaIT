import { FormControl, FormGroup, FormControlLabel, Checkbox, RadioGroup, Radio } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setAnswer } from '../features/quizSlice';
import { RootState } from '../../store';
import { useMemo } from 'react';

export default function Choice({ index, tasks, multiple }: { index: number, tasks: any[], multiple?: boolean }) {
    const dispatch = useDispatch();
    const answer = useSelector((state: RootState) => state.quiz.lists[index]);

    const shuffledTasks = useMemo(() => {
        return [...tasks].sort(() => Math.random() - 0.5);
    }, [tasks]);

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setAnswer({ index, items: e.target.value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentAnswers = (answer as string[]) || [];
        const value = e.target.name;
        dispatch(setAnswer({ index, items: e.target.checked
                ? [...currentAnswers, value]
                : currentAnswers.filter(a => a !== value) }));
    };

    if (multiple) {
        const currentAnswers = (answer as string[]) || [];
        return (
            <FormGroup>
                {shuffledTasks.map((task, i) => (
                    <FormControlLabel key={i} control={<Checkbox checked={currentAnswers.includes(task.answer)} onChange={handleCheckboxChange} name={task.answer} />} label={task.answer} />
                ))}
            </FormGroup>
        );
    }

    return (
        <FormControl>
            <RadioGroup value={(answer as string) || ''} onChange={handleRadioChange}>
                {shuffledTasks.map((task, i) => (
                    <FormControlLabel key={i} value={task.answer} control={<Radio />} label={task.answer} />
                ))}
            </RadioGroup>
        </FormControl>
    );
}