import React from 'react'
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );

export default function Stats({labels, data}) {
    return <Radar
    data={{
        labels,
        datasets: [{
        label: 'Value',
        data,
        fill: true,
        backgroundColor: [
            'rgb(187 49 98 / 50%)',
        ],
        borderColor: [
            '#bb3162',
        ],
        }]
    }} options={{
        scales: {
            r: {
                grid: {
                    color: 'rgba(54, 162, 235, 0.25)'
                },
                angleLines: {
                    color: 'rgba(54, 162, 235, 0.25)'
                },
                ticks: {
                    display: false,
                },
                min: 10,
                max: 100
            }
          },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function(value) {
                        return value.formattedValue + '%';
                    }
                }
            }
        }
    }} />;
}
