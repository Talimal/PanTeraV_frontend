import React,  { useRef, useState } from 'react';
import './Parent.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';


const Parent = (props) => {

    const [root, setRoot] = useState(props.root);
    const [children, setChildren] = useState(props.children);
    let presented=[];
    const notPresented=useRef([]);
    const subtractTwoArrays = (arr1, arr2) => arr1.filter( el => !arr2.includes(el) )

    if(children.length>3){
        presented=children.slice(0,3);
        notPresented.current=subtractTwoArrays(children,presented);
    }
    else{
        presented=children;
    }


    const handleClick = (node) => {
        console.log("root of parent is: "+root.name);
        // let rootName=root.name;
        // let rootChildren = root.children;
        props.addToHistory(root);
        setRoot(node);
        setChildren(node.children);
    }

    const handleClickPrevious =() => {
        let prev = props.getLastRoot();
        console.log("prev on parent: "+prev);
    //     setRoot(lastRoot);
    //     setChildren(lastRoot.children);
    }

    const handleClickMore = (event) => {
        if(notPresented.current.length>0){
            if(notPresented.length>3){
                let notPresentedCopy=notPresented.current;
                presented=notPresented.current.slice(0,3);
                notPresented.current=subtractTwoArrays(notPresentedCopy,presented);
                setChildren(presented);
            }
            else{
                presented=notPresented.current;
                notPresented.current=[];
                setChildren(presented);
            }

        }
    }
  
   
    return (
        <div>
            <ul>
                <li>
                    <div className="root">
                        <button>{root.name}</button>
                    </div>
                </li>
                <div className="children">Children:
                    
                        {/* {firstPresented!=null?
                            firstPresented.map((item, index) => {
                                return (
                                    <li>
                                        <div className="node" index={index}>
                                            <button>{item.name}</button>
                                        </div>
                                    </li>
                                );
                            })
                        : */}
                        {presented.map((item, index) => {
                            return (
                                <li>
                                    <div className={item.children.length>0?"nodeComplex":"nodeSimple"}  key={index}>
                                        <button onClick={()=>handleClick(item)}>{item.name}</button>
                                    </div>
                                </li>
                            );
                        })}
                        
                        {/* {moreToShow?<li>
                                    <div className="more">
                                        <button onClick={handleClickMore}>more</button>
                                    </div>
                                </li>:null} */}
                </div>

            </ul>
            <button onClick={handleClickPrevious}>Previous</button>
            <button onClick={handleClickMore}>Show more</button>

        </div>


    );
  }
  
  export default Parent;