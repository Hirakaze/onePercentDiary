import { useEffect, useRef, useState } from "react";
import OnePercentCard from "./OnePercentCard";
import { db } from "./firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";

export default function Grid(){

    // const [loading, setLoading] = useState(true) 
    const daysPerPage = 30
    const [pageStart, setPageStart] = useState(0)
    const [selectedDay, setSelectedDay] = useState(null)
    const [savedData, setSavedData] = useState({})
    const selectedCardRef = useRef(null)

    useEffect(
        () => {
            if (selectedDay !== null && selectedCardRef.current) {
                selectedCardRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                })
            }
        }, [selectedDay]
    )

    // useEffect (
    //     () => {
    //         async function fetchEntries(){
    //             try{
    //                 setLoading(true)
    //                 const querySnapshot = await getDocs(collection(db, "diary_entries"))

    //                 const formattedData = {}
    //                 querySnapshot.forEach((docSnap) => {
    //                     const entry = docSnap.data()
    //                     formattedData[entry.day_index] = {
    //                         Goal: entry.goal,
    //                         Time: entry.time,
    //                         Describted: entry.describted,
    //                         isComplete: entry.is_complete,
    //                     }
    //                 })
    //                 setSavedData(formattedData)
    //             } catch(error){
    //                 console.error("Error Fetching Data; ", error)
    //             }finally{
    //                 setLoading(false)
    //             }
    //         }
    //         fetchEntries()
    //     }, []
    // )

    // async function handleSave(index, inputtedData){
    //     const entryData = inputtedData.data || {}

    //     const docRef = doc(db, "diary_entries", `day_${index}`)
    //     const payLoad = {
    //         day_index: index,
    //         goal: entryData.Goal || "",
    //         time: parseInt(entryData.Time) || 0,
    //         describted: entryData.Describted || "",
    //         is_complete: true,
    //         updated_at: new Date().toISOString()
    //     }

    //     try{
    //         await setDoc(docRef, payLoad)

    //         const newObj = {
    //             ...savedData,
    //             [index]: {
    //                 data: entryData,
    //                 isComplete: true,
    //             }
    //         }

    //         setSavedData(newObj)
    //         setSelectedDay(null)
    //     }catch(error){
    //         console.error("Error saving data", error)
    //     }
    // }

    useEffect(
        () => {
            if(!localStorage) {return;}
            if(localStorage.getItem('oneDiary')){
                const data = JSON.parse(localStorage.getItem('oneDiary'))
                setSavedData(data)
            }else{
                setSavedData({})
            }
        }, []
    )

    function handleSave(index, data){
        const newObj = {
            ...savedData,
            [index]: {
                ...data,
                isComplete: !!data.isComplete || !!savedData?.index?.isComplete
            }
        }
        setSavedData(newObj)
        localStorage.setItem('oneDiary', JSON.stringify(newObj))
        setSelectedDay(null)
    }

    function handleExport(){
        const entries = Object.entries(savedData)
            .sort(([firstDay], [secondDay]) => Number(firstDay) - Number(secondDay))
            .map(([dayIndex, entry]) => {
                const entryData = entry.data || entry

                return {
                    day_index: Number(dayIndex),
                    day: Number(dayIndex) + 1,
                    goal: entryData.Goal || "",
                    time: entryData.Time || 0,
                    describted: entryData.Describted || "",
                    is_complete: entry.isComplete ?? entry.is_complete ?? true,
                }
            })

        const file = new Blob([JSON.stringify(entries, null, 2)], {
            type: "application/json",
        })
        const downloadUrl = URL.createObjectURL(file)
        const downloadLink = document.createElement("a")

        downloadLink.href = downloadUrl
        downloadLink.download = "diary-entries.json"
        downloadLink.click()
        URL.revokeObjectURL(downloadUrl)
    }

    // if (loading) {
    //     return <p style={{ textAlign: "center", padding: "2rem" }}>Loading entries...</p>;
    // }

    let availablePages = 1
    while (savedData[availablePages * daysPerPage - 1]?.isComplete) {
        availablePages += 1
    }

    const canGoPrevious = pageStart > 0
    const canGoNext = pageStart + daysPerPage < availablePages * daysPerPage

    return(
        <>
        <div className="day-navigation">
            <button
                type="button"
                onClick={() => setPageStart(pageStart - daysPerPage)}
                disabled={!canGoPrevious}
                aria-label="Show the previous 30 days"
            >
                &lt;
            </button>
            <span>Days {pageStart + 1}-{pageStart + daysPerPage}</span>
            <button
                type="button"
                onClick={() => setPageStart(pageStart + daysPerPage)}
                disabled={!canGoNext}
                aria-label="Show the next 30 days"
            >
                &gt;
            </button>
            
        </div>
        
        <div className="card-grid">
            {Array.from({length:daysPerPage}, (_, pageIndex) =>{
                const index = pageStart + pageIndex
                const isLocked = index === 0 ? false:
                !savedData[index - 1]

                const dayNum = String(index + 1).padStart(2, '0')
                if(index === selectedDay){
                    return(
                    <OnePercentCard key={index} index={index} dayNum={dayNum} handleSave={handleSave} savedDayData={savedData[index]?.data || savedData[index]} cardRef={selectedCardRef}/>
                    )
                }

                return(
                    <div className="one-percent-progress">
                        
                        <button key={dayNum} className={"card day-card " + (isLocked ? 'inactive' : '') }   
                        onClick={() => {
                            if(isLocked){return}
                            setSelectedDay(index)
                        }}
                        >
                            <p>Day {dayNum}</p>
                        </button>
                    </div>
                )
            })}
        </div>

        <div className="export-button">
            <button type="button" onClick={handleExport}>
                Export JSON
            </button>
        </div>
        
        {/* <div className="ai-container">

            <textarea>

            </textarea>
        </div> */}

        </>
    )

    
}