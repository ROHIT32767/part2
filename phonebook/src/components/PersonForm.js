import React from "react"

export default function PersonForm(props){
    return(
        <form onSubmit={props.handleSubmit}>
        <h2>add a New</h2>
        <div>
          name: <input value={props.newName} onChange={props.handleChange} />
        </div>
        <div>number: <input value={props.newNumber} onChange={props.handleNumber} /></div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
    )
}