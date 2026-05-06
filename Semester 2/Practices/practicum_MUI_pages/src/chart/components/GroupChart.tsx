import { tGroup } from "../groupdata";
import SettingChart from "./SettingChart";
import { BarChart} from '@mui/x-charts/BarChart';
import Container from '@mui/material/Container';
import { LineChart} from '@mui/x-charts/LineChart';
import React from "react";
type GroupProps = {
    data: tGroup;
};

function GroupChart({ data } : GroupProps) {
    const [series, setSeries] = React.useState({
        'Максимальная высота': true,
        'Средняя высота': false,
        'Минимальная высота': false,
    });
    const [isBar, setIsBar] = React.useState(true);

    const chartSetting = {
        yAxis: [{ label: 'Высота (м)' }],
        height: 400,
    };
    let seriesY = Object.entries(series)
        .filter(item => item[1] == true)
        .map(item => {
            return {
                "dataKey": item[0],
                "label": item[0],
                barLabel: Object.entries(series).filter(item => item[1] === true).length === 1
                    ? "value" as const
                    : undefined
            };
        });
    return(
        <Container maxWidth="lg">
            {isBar && <BarChart
                dataset={ data }
                xAxis={[{ scaleType: 'band', dataKey: 'Группа' }]}
                series={ seriesY }
                slotProps={{
                    legend: {
                        position: { vertical: 'bottom', horizontal: 'center' },
                    },
                }}
                {...chartSetting}
            />}
            {!isBar && <LineChart
                dataset={ data }
                xAxis={[{ scaleType: 'band', dataKey: 'Группа' }]}
                series={ seriesY}
                slotProps={{
                    legend: {
                        position: { vertical: 'bottom', horizontal: 'center' },
                    },
                }}
                {...chartSetting}
            />}
            <SettingChart series={ series } setSeries={ setSeries } isBar={ isBar } setIsBar={ setIsBar }/>
        </Container>
    )
}

export default GroupChart;