import React, {useState, useEffect, useContext} from 'react';
import {BarChart, Bar} from 'recharts';
import MyContext from '../context/MyContext';

  
// PARENT : Crypto
// CHILD : BarChars, Bar
// DESC  : displays the minichart visible from Landing and Favorites 
const MiniChart = (props) => {
    
    const contextValue = useContext(MyContext);
    const [miniChartState, setMiniChartState] = useState(props);
    const [val0, setVal0] = useState();
    const [valX, setValX] = useState();


    useEffect( () => {
        setMiniChartState(props);

        // DESC : wait till parent comp update
        function waitForElement(){
            if(typeof contextValue['chartDataRank'+miniChartState.rank] !== "undefined"){
                setVal0(contextValue['chartDataRank'+miniChartState.rank][0]['val']);
                setValX(contextValue['chartDataRank'+miniChartState.rank][contextValue['chartDataRank'+miniChartState.rank].length-1]['val']);        
                
            }
            else{
                setTimeout(waitForElement, 2500);
            }
        }
        waitForElement();


        
       
    },[props] );
    


    //DESC : green bars when chart slope is positive , and red when negative
    if(val0 < valX){
        return (
            <div>
            <BarChart width={150} height={40} data={contextValue['chartDataRank'+miniChartState.rank]}>
                    <Bar dataKey='val' fill="green" />
                </BarChart>
            </div>
        )
    } else {
        return (
            <div>
            <BarChart width={150} height={40} data={contextValue['chartDataRank'+miniChartState.rank]}>
                    <Bar dataKey='val' fill="red" />
                </BarChart>
            </div>
        )
    }

    


}
export default MiniChart