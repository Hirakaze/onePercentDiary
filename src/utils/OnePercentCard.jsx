import { useState } from "react"

export default function OnePercentCard(props){

    const {index, dayNum, handleSave, savedDayData, cardRef} = props

    const isDayOne = index === 0

    const [data, setData] = useState(savedDayData || {})

    function handleData(title, inputData) {
        const newObj = {
            ...data,
            [title] : inputData
        }
        setData(newObj)
    }

    return (
        <>
        <div ref={cardRef} className="diary-container">
            {isDayOne ? 
            (
                <>

                <div className="head-card-container">
                    <div className="card-header">
                        <p>Day {dayNum}</p>
                    </div>

                </div>
                <div className="card-container">
                    <div className="input-card-container">
                        <p><abbr title="Any subject?">What you want to learn one percent better</abbr></p>
                        <input 
                        value={data['Goal']  || ''} 
                        onChange={(e) => handleData('Goal', e.target.value)}
                        type="text" placeholder="Type your goal..." />
                    </div>

                    <div className="input-card-container">
                        <p><abbr title="just an estimation, no need to really keep track of it">Estimated Time (Minutes)</abbr></p>
                        <input 
                        value={data['Time']  || ''} 
                        onChange={(e) => handleData('Time', e.target.value)}
                        type="integer" placeholder="Type estimated time you learn..."/>
                    </div>

                    <div className="input-card-container">
                        <p><abbr title="Just describe what you can. describing can help you remember things more.">Describe your work today</abbr></p>
                        <textarea
                        className="description-input"
                        value={data['Describted'] || ''} 
                        onChange={(e) => handleData('Describted', e.target.value)}
                        placeholder="Today, i learn ..."
                        />
                    </div>
                    
                </div>  
                </>
            ) :
            
            (
                <>
                <div className="head-card-container">
                    <div className="card-header">
                        <p>Day {dayNum}</p>
                    </div>

                </div>

                <div className="card-container">
                    <div className="input-card-container">
                        <p><abbr title="just an estimation, no need to really keep track of it">Estimated Time (Minutes)</abbr></p>
                        <input 
                        value={data['Time']  || ''} 
                        onChange={(e) => handleData('Time', e.target.value)}
                        type="integer" placeholder="Type estimated time you learn..."/>
                    </div>
                    
                    <div className="input-card-container">
                        <p><abbr title="Just describe what you can. describing can help you remember things more.">Describe your work today</abbr></p>
                        <textarea
                        className="description-input"
                        value={data['Describted']  || ''} 
                        onChange={(e) => handleData('Describted', e.target.value)}
                        placeholder="Today, i learn ..."
                        />
                    </div>
                    
                </div>
                </>
            )
            
        }
            <div onClick={() => handleSave(index, {data})} className="save-button">
                <button>Save</button>
            </div>

        </div>
        </>
    )
}