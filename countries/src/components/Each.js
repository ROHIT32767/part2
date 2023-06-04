import React from "react"

export default function Each({ element }) {
    const [show, setshow] = React.useState(false)
    function showfunc(event) {
        setshow(!show)
    }
    return (
        <div>
            {
                show===true ? (<div>
                    <h2>{element.name.common}</h2>
                    <h3> capital {element.capital[0]}</h3>
                    <h4>area {element.area}</h4>
                    <h5> Languages:</h5>
                    <div>
                        <ul>
                            {Object.values(element.languages).map(element => <li>{element}</li>)}
                        </ul>
                    </div>
                    <img src={element.flags.png} alt="icons" />
                </div>) : (<div><h2>{element.name.common}</h2> </div>)
            }
            <button onClick={showfunc}> SHOW </button> 
        </div>
    )
}