import React from "react"
import Each from "./Each.js"
import Single from "./Single.js";
export default function Persons({ persons, newSearch }) {
    const arr = persons.filter(element => element.name.common.toLowerCase().includes(newSearch.toLowerCase()))
    const len = arr.length
    let Body;
    if (len === 0 || newSearch==="") {
        Body = <h4> No matches found</h4>
    }
    else if (len === 1) {
        Body = (
            <Single element={arr[0]} />
        )
    }
    else if (len < 10) {
        Body = (
            <div>
                {arr.map(element => {
                    return (
                        <Each element={element} />
                    )
                })}

            </div>
        )
    }
    else {
        Body = <h4>Too many matches , specify another filter </h4>
    }
    return (
        <div>
            {Body}
        </div>
    )
}