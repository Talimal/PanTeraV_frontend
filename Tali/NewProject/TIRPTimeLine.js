import React, {useEffect, useRef, useState} from 'react';
import './TIRPTimeLine.css';
import { Card } from "react-bootstrap";
import Chart from "react-google-charts";
import TIRPTimeLine from '../../Visualization/TirpsContent/TIRPTimeLine';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const TIRPTimeLineMine = (props) => {

    const dummy = ["High Resp. Rate \Respiratory rate.High","High Resp. Rate \Respiratory rate.High - 103 Minutes"];
    const [row,setRow] = useState(
        {
            '_TIRP__mean_offset_from_first_symbol':props.tirp.get_mean_offset_from_first_symbol(),
            '_TIRP__mean_of_first_interval':props.tirp.get_mean_of_first_interval(),
            '_TIRP__symbols':props.tirp.getSymbolsNames(),
        }
    );
    
    useEffect( () => {
        setRow({
            '_TIRP__mean_offset_from_first_symbol':props.tirp.get_mean_offset_from_first_symbol(),
            '_TIRP__mean_of_first_interval':props.tirp.get_mean_of_first_interval(),
            '_TIRP__symbols':props.tirp.getSymbolsNames(),
        });
    }, [props.tirp])

    return (
          <TIRPTimeLine
                    row={row}
                    type_of_comp="tirp"
                /> 
        // <div className="TIRPTimeLine">
    //     <Container fluid> 
    //     <Row>
    //         <Col sm={8}>
    //         <Chart
    //             width={'500px'}
    //             height={'300px'}
    //             chartType="Timeline"
    //             loader={<div>Loading Chart</div>}
    //             data={[
    //                 [
    //                 { type: 'string', id: 'Term' },
    //                 { type: 'string', id: 'Name' },
    //                 { type: 'date', id: 'Start' },
    //                 { type: 'date', id: 'End' },
    //                 ],
    //                 ['1', 'George Washington', new Date(1789, 3, 30), new Date(1797, 2, 4)],
    //                 ['2', 'John Adams', new Date(1797, 2, 4), new Date(1801, 2, 4)],
    //                 ['3', 'Thomas Jefferson', new Date(1801, 2, 4), new Date(1809, 2, 4)],
    //             ]}
    //             options={{'width': 1200,
    //             'avoidOverlappingGridLines':false,
    //             timeline: { showRowLabels: true },
    //             vAxis: {
    //                 ticks: ['1','2','3']
    //             },
    //             xAxes: [{
    //             scaleLabel: {
    //                 display: true,
    //             }
    //             }],
    //             }}
               
                
    //     />
    //         </Col>
    //     </Row>
    // </Container>

               
               
        // </div>
    );
  }
  
  export default TIRPTimeLineMine;