import React ,{useEffect, useState, useRef} from 'react';
import Chartjs from 'chart.js';
import {useLocation} from 'react-router-dom';
import './Graphs.css';


const Graphs = (props) => {

   
    const location = useLocation();
    const tirpID = location.state.tirpID;
    const tirpName = location.state.tirpName;
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
            backgroundColor: 'rgba(134,159,152, 1)',
            borderColor: 'rgba(134,159,152, 1)',
            hoverBackgroundColor: 'rgba(230, 236, 235, 0.75)',
            hoverBorderColor: 'rgba(230, 236, 235, 0.75)',
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
                        beginAtZero: true,
                        fontColor:"#000000",
                        fontSize:18
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
                text: 'tirp: '+tirpName,
                fontSize:25,
                fontColor:'#0000FF'
            },
            tooltips: {
                titleFontSize: 20,
                bodyFontSize: 20
                // callbacks: {
                //     label: function(tooltipItem, data) {
                //         var label = "";    
                //         return label;
                //     }
                // }
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
        chartInstance.data.datasets[0].backgroundColor = '#0000FF';
        chartInstance.data.labels= newLabels;
        chartInstance.options.title.text= 
        'tirp: '+tirpName+',entityID: '+entityID;
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