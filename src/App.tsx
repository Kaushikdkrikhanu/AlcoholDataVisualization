import React, { useState, useEffect } from "react";
import "./App.css";
import ReactECharts from "echarts-for-react";
import {Wine} from './interfaces/index';
import {average} from './util/index'
const App: React.FC = () => {
  const [wines, setWines] = useState<Wine[]>([]);     //data stored here after loading
  const [optionsScatterPlot, setOptionScatterPlot] =  useState<echarts.EChartsOption>({}); //options object for plotting the scatterplot
  const [optionsBarChart, setOptionBarChart] = useState<echarts.EChartsOption>({}); //options object for plotting the barplot
  
 
  
  //loading the data
  useEffect(() => {
    const readFile = async () => {
      try {
        const file = await fetch("/data/wine.data"); //stored in pulic directory
        try {
          const data = await file.text();
          const records = data.split("\n");
          const mwines: Wine[] = records.map((item) => {
            const array = item.split(",");
            const wine: Wine = {
              class: Number(array[0]),
              alcohol: Number(array[1]),
              malicAcid: Number(array[2]),
              ash: Number(array[3]),
              alcalinityOfAsh: Number(array[4]),
              magnesium: Number(array[5]),
              totalPhenols: Number(array[6]),
              flavanoids: Number(array[7]),
              nonflavanoidPhenols: Number(array[8]),
              proanthocyanins: Number(array[9]),
              colorIntensity: Number(array[10]),
              hue: Number(array[11]),
              od280orod315: Number(array[12]),
              proline: Number(array[13]),
            };
            return wine;
          });
          setWines(mwines.slice(0, mwines.length - 1));
        } catch (error) {
          console.error("Text convertion error", error);
        }
      } catch (error) {
        console.error("File open error", error);
      }
    };
    readFile();
  }, []);
  //once the data is loaded, setting up the plots
  useEffect(() => {
    //setting up the scatterplot
    const scatterPlotOptions: echarts.EChartsOption = {
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "cross" },
      },
      grid: {
        left: "15%",
        right: "10%",
      },
      xAxis: {
        name: "Color Intensity",
        nameLocation: "middle",
        nameGap: 30,
      },
      yAxis: {
        type: "value",
        name: "Hue",
        nameLocation: "middle",
        nameGap: 30,
      },
      series: [
        {
          data: wines.map((wine) => {
            return [wine.colorIntensity, wine.hue]; //returning [x,y] pair for each
          }),
          type: "scatter",
        },
      ],
    };
    setOptionScatterPlot(scatterPlotOptions);

    //setting up the bar plot
    const optionForBarChart: echarts.EChartsOption = {
      tooltip: {
        trigger: "item",
      },
      grid: {
        left: "15%",
        right: "10%",
      },
      xAxis: {
        type: "category",
        name: "Alcohol Category",
        axisLabel: {
          align: "center",
        },
        nameLocation: "middle",
        nameGap: 30,
        data: ["Class 1", "Class 2", "Class 3"],
      },
      yAxis: {
        type: "value",
        name: "Average Malic Acid",
        nameLocation: "middle",
        nameGap: 30,
      },
      series: [
        {
          data: average(wines),
          type: "bar",
        },
      ],
    };
    setOptionBarChart(optionForBarChart);
  }, [wines]);



  
  return (
    <div className="app">
      <div className="navbar">ALCOHOL DATA </div>
      <div className="container">
        <div className="scatterplot">
          <ReactECharts option={optionsScatterPlot} />
        </div>
        <div className="barplot">
          <ReactECharts option={optionsBarChart} />
        </div>
      </div>
    </div>
  );
};

export default App;
