import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GroupChart from "./components/GroupChart";
import GroupGrid from "./components/GroupGrid";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import * as React from 'react';
import animals from '../list/table';

export function groupAnimalsBy(field: "Категория" | "Порода" | "Наличие") {
    const grouped = animals.reduce((acc, animal) => {
        const key = animal[field];
        const value = animal["Цена, руб."];

        if (!acc[key]) {
            acc[key] = { min: value, max: value, sum: 0, count: 0 };
        }

        acc[key].min = Math.min(acc[key].min, value);
        acc[key].max = Math.max(acc[key].max, value);
        acc[key].sum += value;
        acc[key].count += 1;

        return acc;
    }, {} as Record<string, { min: number, max: number, sum: number, count: number }>);

    return Object.entries(grouped).map(([groupName, data], index) => ({
        id: index + 1,
        "Группа": groupName,
        "Минимальная цена": data.min,
        "Максимальная цена": data.max,
        "Средняя цена": Math.round(data.sum / data.count)
    }));
}

type tSelect = "Категория" | "Наличие" | "Порода";

function Chart() {
    const [group, setGroup] = React.useState<tSelect>("Категория");
    const [groupData, setGroupData] = React.useState(() => groupAnimalsBy("Категория"));

    const handleChange = (event: SelectChangeEvent) => {
        setGroup(event.target.value as tSelect);
        setGroupData(groupAnimalsBy(event.target.value as tSelect));
    };

    return (
        <div>
            <Navbar active="3"/>
            <Box sx={{ width:"200px", m:"auto" }}>
                <FormControl fullWidth>
                    <InputLabel> Группировать по </InputLabel>
                    <Select
                        id="select-group"
                        value={ group }
                        label="Группировать по"
                        onChange={ handleChange }
                    >
                        <MenuItem value="Категория"> Категория </MenuItem>
                        <MenuItem value="Наличие"> Наличие </MenuItem>
                        <MenuItem value="Порода"> Порода </MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <GroupChart data={ groupData } />
            <GroupGrid data={ groupData } />
            <Footer/>
        </div>
    );
}

export default Chart;