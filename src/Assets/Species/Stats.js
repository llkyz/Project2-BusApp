import { useState, useEffect } from "react"

export default function Stats(props) {
    const [stats, setStats] = useState()

    useEffect(()=> {
        function processStats() {
            let statList = props.data.map((data)=>{
                return {stat: data.stat.name, value: data.base_stat}
            })
            setStats(statList)
        }
        processStats()
    }, [props.data])

    function DisplayStats() {
        return (
            stats.map((data)=>{

                return (
                    <>
                    <div>{data.stat.toUpperCase()}: {data.value}</div>
                    <div className="statBarContainer">
                        <div className="statBar" style={{width: `${data.value/255*100}%`}}/>
                    </div>
                    </>
                )
            })
        )
    }
    

    return (
<div>{stats ? <DisplayStats/> : ""}</div>
    )
}