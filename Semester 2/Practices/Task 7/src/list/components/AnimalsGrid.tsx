import animals from "../table";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { ruRU } from '@mui/x-data-grid/locales';
import Container from '@mui/material/Container';

function AnimalsGrid() {
    const rows: GridRowsProp = animals;
    const columns: GridColDef[] = [
        { field: 'Название животного', headerName: 'Название', flex: 1},
        { field: 'Категория', flex: 0.5},
        { field: 'Порода', flex: 0.5},
        { field: 'Количество', flex: 0.5},
        { field: 'Цена, руб.' },
        { field: 'Наличие'},
    ]
    return (
        <Container maxWidth="lg" sx={{height: '700px', mt: '20px'}}>
            <DataGrid
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                rows={rows}
                showToolbar={true}
                columns={columns}
            />
        </Container>
    );
}
export default AnimalsGrid;