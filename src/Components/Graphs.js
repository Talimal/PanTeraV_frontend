import React ,{useEffect, useState, useRef} from 'react';
import Chartjs from 'chart.js';
import {useLocation} from 'react-router-dom';
import './Graphs.css';


const Graphs = (props) => {

   
    const location = useLocation();
    const tirpID = location.state.tirpID;
    const tirp = props.getTirp(tirpID);
    const tirpSymbols = tirp.getSymbols();
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
        clearChart();
        updateChart(entityID,newArrLimits,newLabelsArr);
       
        
    }
  

    const initialChartConfig = {
        type: "horizontalBar",
        data: {
            labels: [],
            datasets:[{}],
            backgroundColor: "red",
            strokeColor: "brown",
        },
        options: {
            legend: {
                labels: {
                    fontSize: 0
                }
            },
            scales: {
                xAxes: [
                    {
                    ticks: {
                        beginAtZero: true
                    }
                    }
                ],
                yAxes:[
                    {
                        ticks: {
                            display: false
                        }
                    }
                ]
            },
            title: {
                display: true,
                text: 'tirp: '+tirpSymbols,
                fontSize:25
            }
        }
    }

      
    const chartContainer = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);
    
    useEffect(() => {
        if (chartContainer && chartContainer.current) {
        const newChartInstance = new Chartjs(chartContainer.current, initialChartConfig);
        setChartInstance(newChartInstance);
        }
    }, [chartContainer]);
    
    const updateChart = (entityID,newData,newLabels)=>{
        chartInstance.data.datasets[0].data = newData;
        chartInstance.data.labels= newLabels;
        chartInstance.options.title.text= 
        'tirp: '+tirpSymbols+',entityID: '+entityID;
        chartInstance.update();
    }
   
    const clearChart = () => {
        chartInstance.clear();
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
            <canvas ref={chartContainer} />
      </div>
      );
 
}

export default Graphs;