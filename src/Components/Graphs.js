import React from 'react';
import {Bar} from 'react-chartjs-2';



const Graphs = (props) => {

    const data={labels:['Tali','Sean','Ravid'],
                datasets:[{
                            label:'population',
                            data:[
                                45,44,60
                            ],
                            backgroundColor:[
                                'rgb(204, 153, 255)',
                                'rgb(0, 204, 255)',
                                'rgb(0, 255, 153)'
                            ]
                }]}
    return (
        <div className="chart">
            <Bar
                
                data={data}
                options={{
                    maintainAspectRatio:true,
                    scales: {
                        yAxes:[
                            {
                                ticks:{
                                    suggestedMin:30,
                                    suggestedMax:70,
                                    fontColor:'#203',
                                    fontSize:20
                                }

                            }
                        ],
                        xAxes:[
                            {
                                ticks:{
                                    fontColor:'#203',
                                    fontSize:20
                                }
                            }
                        ]
                    },
                    title:{
                        display:true,
                        text: 'Raw Data',
                        fontSize:50,
                        fontColor:'rgb(0, 0, 255)'
                    }
                }}
            />
        </div>
       
      );
 
}

export default Graphs;