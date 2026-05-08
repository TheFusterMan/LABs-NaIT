import { tGroup } from "../groupdata";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ruRU } from '@mui/x-data-grid/locales';
import Container from "@mui/material/Container";

type GroupProps = {
    data: tGroup;
};

function GroupGrid({ data } : GroupProps) {
    const columns: GridColDef[] = [
        { field: 'Группа', headerName: 'Группа', flex: 1 },
        { field: 'Минимальная высота', headerName: 'Минимальная высота', flex: 1 },
        { field: 'Максимальная высота', headerName: 'Максимальная высота', flex: 1 },
        { field: 'Средняя высота', headerName: 'Средняя высота', flex: 1 },
    ];

    return (
        <Container maxWidth="lg" sx={{ height: '400px', mt: '20px', mb: '50px' }}>
            <DataGrid
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                rows={data}
                showToolbar={true}
                columns={columns}
            />
        </Container>
    );
}

export default GroupGrid;