import { Box, Button, Container, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { clearAnswers } from '../features/quizSlice';
import { quiz } from "../quizData";
import Matching from "./Matching";
import Sorting from "./Sorting";
import Choice from "./Choice";

export default function Quiz() {
    const [results, setResults] = useState<number[] | null>(null);
    const [resetKey, setResetKey] = useState(0);

    const dispatch = useDispatch();
    const answers = useSelector((state: RootState) => state.quiz.lists);

    const handleCheck = () => {
        const results = quiz.map((item, index) => {
            const answer = answers[index];

            if (answer) {
                if (item.type === "M" || item.type === "S") {
                    let count = 0;
                    item.tasks.forEach((task, index) => {
                        if (task.answer === answer[index]) count += 1;
                    });
                    return item.type === "M" ? count : (count === item.tasks.length ? 1 : 0);
                }

                if (item.type === "C") {
                    if (item.multiple) {
                        return [...(answer as string[])].sort().join(',') === [...(item.correctAnswer as string[])].sort().join(',') ? 1 : 0;
                    } else {
                        return answer === item.correctAnswer ? 1 : 0;
                    }
                }
            }
            return 0;
        });

        setResults(results);
    };

    const handleRetry = () => {
        setResults(null);
        dispatch(clearAnswers());
        setResetKey(prev => prev + 1);
    };

    return (
        <Container maxWidth="md" sx={{ mb: 5 }}>
            {quiz.map((item, index) => (
                <Box key={`${item.id}-${resetKey}`} component="section" sx={{ m: 2, p: 2 }}>
                    <Typography variant="h5" gutterBottom>
                        {index + 1}. {item.title}
                    </Typography>

                    {item.type === "M" && <Matching index={index} tasks={item.tasks} />}
                    {item.type === "S" && <Sorting index={index} tasks={item.tasks} />}
                    {item.type === "C" && <Choice index={index} tasks={item.tasks} multiple={item.multiple} />}
                </Box>
            ))}

            {results && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" sx={{ textAlign: "center" }}>
                        Результаты теста
                    </Typography>
                    {results.map((score, i) => {
                        const total = quiz[i].type === "M" ? quiz[i].tasks.length : 1;
                        return (
                            <Typography key={i} sx={{ textAlign: "center" }}>
                                Задание {i + 1}. {score === total ? "Все ответы верные." : `Верных ответов: ${score} из ${total}.`}
                            </Typography>
                        );
                    })}
                </Box>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 4 }}>
                <Button variant="contained" onClick={handleCheck}>Проверить</Button>
                <Button variant="contained" onClick={handleRetry}>Начать снова</Button>
            </Box>
        </Container>
    );
}