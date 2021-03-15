import React ,{useEffect, useState, useRef} from 'react';
import Chartjs from 'chart.js';
import {useLocation} from 'react-router-dom';
import './Graphs.css';


const Graphs = (props) => {

   
    const location = useLocation();
    const tirpName = location.state.tirpName;
    const tirpSymbols = location.state.tirpSymbols;
    const tirpRelations = location.state.tirpRelations;
    const tirp = props.getTirp(tirpSymbols,tirpRelations);
    const entityOccurMap = tirp.createEntityOccurMap();
    const keysArray = Array.from(entityOccurMap.keys());

    const handleDropDown = (e)=>{
        const entityID = e.target.value;
        const occurencesArray = entityOccurMap.get(entityID);
        const splittedArr = occurencesArray.split(/[-\[\]]/);
        let newArrLimits=[];
        let newLabelsArr=[];
        for(var i=0; i<splittedArr.length - 1 ; i++){
            if(!isNaN(parseInt(splittedArr[i]))
                        && !isNaN(parseInt(splittedArr[i+1]))){//valid number
                
                let newPair = [parseInt(splittedArr[i]),parseInt(splittedArr[i+1])]
                newArrLimits.push(newPair);
                newLabelsArr.push(tirpSymbols);
                
            }
        }
        let rawDataArr = props.getRawData(entityID,tirpSymbols);
        const [intervals,labels] = parseIntervals(rawDataArr);

        clearChart();
        updateChart(entityID,newArrLimits,newLabelsArr);
        updateChartRaw(entityID,intervals,labels);
        
    }
  
    const parseIntervals = (RawDataArr)=>{
        let intervalArr=[];
        let labelsArr=[];
        for(var i=0; i<RawDataArr.length ; i++){
            intervalArr.push([parseInt(RawDataArr[i].getStartTime()),
                            parseInt(RawDataArr[i].getEndTime())])
            labelsArr.push(RawDataArr[i].getSymbol())
                
        }
        return [intervalArr,labelsArr];
    }
    

    const initialChartConfig = {
        type: "horizontalBar",
        data: {
            labels: [],
            datasets:[{}],
        },
        options: {
            // responsive:true,
            // maintainAspectRatio: false,
            legend: {
                labels: {
                    fontSize: 0
                }
            },
            scales: {
                xAxes: [
                    {
                    ticks: {
                        beginAtZero: true,
                        fontColor:"#000000",
                        fontSize:18
                    }
                    }
                ],
                yAxes:[
                    {
                        ticks: {
                            display: true
                        }
                    }
                ]
            },
            title: {
                display: true,
                text: 'tirp: '+tirpName,
                fontSize:25,
                fontColor:'#0000FF'
            },
            tooltips: {
                titleFontSize: 20,
                bodyFontSize: 20
            }
        }
    }

    const initialChartConfigRaw = {
        type: "horizontalBar",
        data: {
            labels: [],
            datasets:[{}],
        },
        options: {
            // responsive:true,
            // maintainAspectRatio: false,
            legend: {
                labels: {
                    fontSize: 0
                }
            },
            scales: {
                xAxes: [
                    {
                    ticks: {
                        beginAtZero: true,
                        fontColor:"#000000",
                        fontSize:18
                    }
                    }
                ],
                yAxes:[
                    {
                        ticks: {
                            display: true
                        }
                    }
                ]
            },
            title: {
                display: true,
                text: 'Raw data',
                fontSize:25,
                fontColor:'#0000FF'
            },
            tooltips: {
                titleFontSize: 20,
                bodyFontSize: 20
            }
        }
    }
      
    const chartContainer = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);
    const chartContainerRaw = useRef(null);
    const [chartInstanceRaw, setChartInstanceRaw] = useState(null);

    useEffect(() => {
        if (chartContainer && chartContainer.current &&
            chartContainerRaw && chartContainerRaw.current) {
        const newChartInstance = new Chartjs(chartContainer.current, initialChartConfig);
        const newChartInstanceRaw = new Chartjs(chartContainerRaw.current, initialChartConfigRaw);

        setChartInstance(newChartInstance);
        setChartInstanceRaw(newChartInstanceRaw);

        }
    }, [chartContainer,chartContainerRaw]);
    
    const updateChart = (entityID,newData,newLabels)=>{
        chartInstance.data.datasets[0].data = newData;
        chartInstance.data.datasets[0].backgroundColor = '#0000FF';
        chartInstance.data.labels= newLabels;
        chartInstance.options.title.text= 
        ['tirp: '+tirpName,'entityID: '+entityID,tirpRelations!==[]?'relations: '+tirpRelations:null];
        chartInstance.update();
    }

    const updateChartRaw = (entityID,newData,newLabels)=>{
        chartInstanceRaw.data.datasets[0].data = newData;
        chartInstanceRaw.data.datasets[0].backgroundColor = '#DC143C';
        chartInstanceRaw.data.labels= newLabels;
        // chartInstance.options.title.text= 
        // ['tirp: '+tirpName,'entityID: '+entityID,tirpRelations!==[]?'relations: '+tirpRelations:null];
        chartInstanceRaw.update();
    }
   
    const clearChart = () => {
        chartInstance.clear();
        chartInstanceRaw.clear();
    };
     
      
      
    return (

        <div>
            <select onChange={handleDropDown} className="select">
                 {keysArray.map((entry,index)=>{
                     return (<option key={index} 
                                         value={entry}
                                         onChange={(e)=>handleDropDown(e)}>{entry}</option>
                 )})}
             </select>
            <canvas className="canvas" ref={chartContainer} />
            <canvas className="canvas" ref={chartContainerRaw} />
      </div>
      );
 
}

export default Graphs;