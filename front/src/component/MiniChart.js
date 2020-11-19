import React, {useState, useEffect} from 'react';
import {BarChart, Bar} from 'recharts';
  

const MiniChart = (props) => {
    
    const [miniChartState, setMiniChartState] = useState(props);
    const [apiUrl] = useState("https://api.coingecko.com/api/v3/coins/"+miniChartState.id+"/market_chart?vs_currency=usd&days=30&interval=daily");
    const [data, setData] = useState([]);
  
// fetch data from api
useEffect(() => {
    setMiniChartState(props);
    //if(miniChartState.rank < 11){
       setData(miniChartState.allcoinsChartDataFinal[miniChartState.rank]);
        console.log(data);
    //}   
}, );


if(1===1){
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