import { tAnimalGroup } from "../groupdata";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ruRU } from '@mui/x-data-grid/locales';
import Container from "@mui/material/Container";

type GroupProps = {
    data: tAnimalGroup;
};

function GroupGrid({ data } : GroupProps) {
    const columns: GridColDef[] = [
        { field: 'Группа', headerName: 'Группа', flex: 1 },
        { field: 'Минимальная цена', headerName: 'Минимальная цена', flex: 1 },
        { field: 'Максимальная цена', headerName: 'Максимальная цена', flex: 1 },
        { field: 'Средняя цена', headerName: 'Средняя цена', flex: 1 },
    ];

    return (
        <Container maxWidth="lg" sx={{ height: '400px', mt: '20px', mb: '50px' }}>
            <DataGrid
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                rows={data}
                columns={columns}
            />
        </Container>
    );
}

export default GroupGrid;