import { Box, Button, Container, Typography } from '@mui/material';
import { quiz } from "../quizData";
import Matching from "./Matching";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {clearLists} from "./quizSlice";

function Quiz() {
    const [results, setResults] = useState<number[] | null>(null);
    const [resetKey, setResetKey] = useState(0);

    const dispatch = useDispatch();
    const answers = useSelector((state: RootState) => state.lists.lists);

    const handleCheck = () => {
        let results = quiz.map((item, index) => {
            let count = 0;

            if (answers[index]) {
                item.tasks.forEach((task, taskIndex) => {
                    if (task.answer === answers[index][taskIndex]) {
                        count += 1;
                    }
                });
            }

            return count;
        });

        setResults(results);
    }

    const handleRetry = () => {
        setResults(null);
        dispatch(clearLists());
        setResetKey((prev) => prev + 1);
    }

    return (
        <Container maxWidth="md">
            {quiz.map((item, index) => (
                <Box key={`${item.id}-${resetKey}`} component="section" sx={{ m: 2, p:2 }}>
                    <Typography variant="h5" gutterBottom>
                        {index + 1}. { item.title }
                    </Typography>
                    <Matching index={index} tasks={item["tasks"]}/>
                </Box>
            ))}
            {results && (
                <Box>
                    <Typography variant="h5" sx={{ textAlign: "center" }}>
                        Результаты теста
                    </Typography>
                    {results.map((score, i) => {
                        return (
                            <Typography key={i} sx={{ textAlign: "center" }}>
                                Задание {i + 1}. {score === quiz[i].tasks.length ? "Все ответы верные." : `Верных ответов: ${score}.`}
                            </Typography>
                        );
                    })}
                </Box>
            )}
            <Box sx={{ display: 'flex', justifyContent:'space-around' }}>
                <Button variant="contained" onClick={handleCheck}>Проверить</Button>
                <Button variant="contained" onClick={handleRetry}>Начать снова</Button>
            </Box>
        </Container>
    );
}

export default Quiz