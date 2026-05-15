import { Grid, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { tTasks } from "../quizData"

interface ComponentProps {
    tasks: tTasks;
}

function Matching({tasks}: ComponentProps) {

    return (
        <Grid container spacing={2}>
            <Grid size={6}>
                <List>
                    {tasks.map((item, index) => (
                        <ListItem key={index}>
                            <ListItemButton
                                sx={{
                                    border: '1px solid gray',
                                    borderRadius: '5px',
                                    textAlign: 'right',
                                }}>
                                <ListItemText primary={item.question} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Grid>

            <Grid size={6}>
                Здесь будет блок с ответами
            </Grid>
        </Grid>
    );
}

export default Matching;