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
  
   
    useEffect(() => {
        //console.log(contextValue.allcoinsChartDataFinal2);
        setMiniChartState(props);
        const filterData = (array) => {
            const newArray = array.flat().filter((x) => x.rank === miniChartState.rank);
                setData(newArray);
        } 
       if(!contextValue.allcoinsChartDataFinal2 === undefined){
            filterData(contextValue.allcoinsChartDataFinal2);
        }
        else { 
            //filterData([]);
        }  
           
    },[props] );

///////////
  



// if(!data === undefined){
//     // DESC : green bars when chart slope is positive , and red when negative
//     if(data[0].val < data[data.length-1].val){
//         return (
//             <div>
//             <BarChart width={150} height={40} data={data}>
//                     <Bar dataKey='val' fill="green" />
//                 </BarChart>
//             </div>
//         )
//     } else {
//         return (
//             <div>
//             <BarChart width={150} height={40} data={data}>
//                     <Bar dataKey='val' fill="red" />
//                 </BarChart>
//             </div>
//         )
//     }
// } else {
    return (
        <div>

            <BarChart width={150} height={40} data={data}>
                <Bar dataKey='val' fill="grey" />
            </BarChart>
        </div>
    )
//}
    


}
export default MiniChart