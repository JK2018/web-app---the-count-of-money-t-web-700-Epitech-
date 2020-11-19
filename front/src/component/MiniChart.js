import React, {useState, useEffect} from 'react';
import {BarChart, Bar} from 'recharts';
  

const MiniChart = (props) => {
    
    const [miniChartState, setMiniChartState] = useState(props);
    const [apiUrl] = useState("https://api.coingecko.com/api/v3/coins/"+miniChartState.id+"/market_chart?vs_currency=usd&days=30&interval=daily");
    const [data, setData] = useState([]);
  
// fetch data from api
useEffect(() => {
    setMiniChartState(props);
    //console.log("NA : "+miniChartState.allcoinsChartDataFinal);
    const newArray = (miniChartState.allcoinsChartDataFinal).find(([element]) => element.rank == miniChartState.rank);
    //if(miniChartState.rank < 11){
        //console.log("miniChartState.rank :"+miniChartState.rank);
        //console.log("allcoinsChartDataFinal :"+miniChartState.allcoinsChartDataFinal === 101);
       // const z = (miniChartState.allcoinsChartDataFinal).filter(data => data.rank === miniChartState.rank);
       
       if(newArray){
        setData(newArray);
        console.log("NA : "+newArray[0].rank);
       }
       
       
        // from array only keep the data from  allcoinsChartDataFinal array of objs that have rank === miniChartState.rank.
    //}   
}, );
// data[0].val>data[data.length-1].val

if(1==1){
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