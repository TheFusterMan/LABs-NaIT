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
import {years, countries, types } from "./groupdata";

type tSelect = "Страна" | "Год" | "Тип";

function Chart() {
    const [group, setGroup] = React.useState<tSelect>("Страна");
    const [groupData, setGroupData] = React.useState(countries);

    const handleChange = (event: SelectChangeEvent) => {
        setGroup(event.target.value as tSelect);
        setGroupData(event.target.value as tSelect === "Страна" ? countries : event.target.value as tSelect === "Тип" ? types : years);
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
                        <MenuItem value="Страна"> Стране </MenuItem>
                        <MenuItem value="Год"> Году </MenuItem>
                        <MenuItem value="Тип"> Типу </MenuItem>
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