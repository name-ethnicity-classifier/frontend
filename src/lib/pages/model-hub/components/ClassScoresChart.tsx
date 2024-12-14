import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


interface ClassScoresChartProps {
    classes: string[],
    scores: number[]
}


const ClassScoresChart = (props: ClassScoresChartProps) => {

    const [isRendered, setIsRendered] = useState<boolean>(false);

    useEffect(() => {
		setIsRendered(true);
	}, []);

	return (
        <Box
            height="99%"
            width="99%"
            minHeight="200px"
        >
            { isRendered &&
                <Bar
                    height={100} 
                    width={400}
                    data={{
                        labels: props.classes,
                        datasets: [
                            {
                                label: "Accuracies",
                                data: props.scores,
                                backgroundColor: "rgba(0, 47, 255, 0.55)",
                                order: 2
                            }
                        ]
                    }} 
                    options={{
                        maintainAspectRatio: false,
                    }}
                />
            }
        </Box>
	);
};

export default ClassScoresChart;
