import React from "react"

export default function Persons({ persons, newSearch, DeleteNumber }) {
    return (
        <div>
            {newSearch === "" ? persons.map((element, index) => {
                return (
                    <div>
                        <h4 key={element.name}>{`${element.name} ${element.number}`}</h4>
                        <button onClick={function () {
                            if (window.confirm(`Delete ${element.name} ?`)) {
                                DeleteNumber(element.id)
                            }
                        }}
                        >Delete</button>
                    </div>
                )
            }
            ) : persons.filter(element => element.name.toLowerCase().includes(newSearch.toLowerCase())).map(element => <h4 key={element.name}>{`${element.name} ${element.number}`}</h4>)}
        </div >
    )
}