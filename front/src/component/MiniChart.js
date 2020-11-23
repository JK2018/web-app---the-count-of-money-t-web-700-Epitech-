import React, {useState, useEffect, useContext} from 'react';
import {BarChart, Bar} from 'recharts';
import MyContext from '../context/MyContext';

  
// PARENT : Crypto
// CHILD : BarChars, Bar
// DESC  : displays the minichart visible from Landing and Favorites 
const MiniChart = (props) => {
    
    const contextValue = useContext(MyContext);
    const [miniChartState, setMiniChartState] = useState(props);
    const [data, setData] = useState([]);
    const [val0, setVal0] = useState();
    const [valX, setValX] = useState();
   
    useEffect( () => {
        setMiniChartState(props);
       
        const filterData = () => {
            console.log("azeazeazeae : "+contextValue.allcoinsChartDataFinal2);
            const newArray = contextValue.allcoinsChartDataFinal2.flat().filter((x) => x.rank === miniChartState.rank);
            function waitForElement2(){
                if(typeof newArray !== "undefined"){
                    filterData();
                    console.log("xxxxx "+typeof data[0]);
                }
                else{
                    setTimeout(waitForElement2, 3500);
                    console.log("hereee");
                }
            }
            waitForElement2();
            setData(newArray);
                
                //setVal0(newArray[0].val);
                //setValX(newArray[newArray.length-1].val);
        } 
        //filterData();
        function waitForElement(){
            if(typeof data[0] !== "undefined"){
                filterData();
                console.log("aaaa "+typeof data[0]);
            }
            else{
                setTimeout(waitForElement, 3500);
               // console.log("here");
            }
        }
        waitForElement();
     
           
    },[props] );
    


    
///////////
  


// return (
//     <div>
//     <BarChart width={150} height={40} data={data}>
//             <Bar dataKey='val' fill="green" />
//         </BarChart>
//     </div>
// )


    //DESC : green bars when chart slope is positive , and red when negative
    if(val0 < valX){
        return (
            <div>
            <BarChart width={150} height={40} data={data}>
                    <Bar dataKey='val' fill="green" />
                </BarChart>
            </div>
        )
    } else {
        return (
            <div>
            <BarChart width={150} height={40} data={data}>
                    <Bar dataKey='val' fill="red" />
                </BarChart>
            </div>
        )
    }

    


}
export default MiniChart