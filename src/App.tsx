import React, {useEffect, useState} from 'react';
import {HOST} from "./config";
import './App.css';
import {Kindle} from './pages/kindle';

const postProcessData = (data: any) => {
    for (const d of data) {
        d.date = new Date(d.timestamp);
    }
    return data;
}

function App() {

    const [data, setData] = useState([]);

    const startDate = Date.UTC(2022, 11, 30, 0, 0, 0, 0);
    const endDate = Date.UTC(2022, 11, 30, 1, 0, 0, 0);
    const intervalSecond = 60; // 1min

    const url = new URL(`${HOST}/api/get_kindle`);
    url.searchParams.set('exchange', 'Binance');
    url.searchParams.set('symbol', 'MATICUSD');
    url.searchParams.set('from_timestamp', `${startDate}`);
    url.searchParams.set('to_timestamp', `${endDate}`);
    url.searchParams.set('interval', `${intervalSecond}`);

    useEffect(() => {
        // declare the async data fetching function
        const fetchData = async () => {
            // get the data from the api
            const data = await fetch(url.toString());
            // convert the data to json
            const json = await data.json();
            const procesdedData = postProcessData(json);
            setData(procesdedData);
        }
        fetchData().catch(console.error);
    });


    return (
        <div className="App">
            <Kindle data={data} ratio={1} width={1920} height={1080}/>
        </div>
    );
}

export default App;
