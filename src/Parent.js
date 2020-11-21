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
        <div className="flex-container">
            <div className="flex-container-nodes">
                    <div className="root">
                        <button>{root.name}</button>
                    </div>
                <div className="children">Children:
                    <ul>
                        {presented.map((item, index) => {
                            return (
                                <li>
                                    <div className={item.children.length>0?"nodeComplex":"nodeSimple"}  key={index}>
                                        <button onClick={()=>handleClick(item)}>{item.name}</button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <div className="flex-container-buttons">
                <button onClick={handleClickPrevious}>Previous</button>
                <button onClick={handleClickMore}>Show more</button>
            </div>
        </div>

    );
  }
  
  export default Parent;