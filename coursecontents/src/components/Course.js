import React from "react"

function Header(props) {
    return (
        <div>
            <h1>{props.course}</h1>
        </div>
    )
}

function Content(props) {
    return (
        <div>
            {props.parts.map(element => <Part part={element.name} exercises={element.exercises} />)}
        </div>
    )
}

function Part(props) {
    return (
        <div>
            <p>
                {props.part} {props.exercises}
            </p>
        </div>
    )
}

function Total(props) {
    // const total = props.parts.map(element => element.exercises).reduce(function (a, b) {
    //   return a + b;}, 0);
    const total = props.parts.reduce(function (a, b) {
        return a + b.exercises;
    }, 0);
    return (
        <div>
            <p> Total of {total} exercises </p>
        </div>
    )
}

export default function Course(props) {
    return (
        <div>
            <Header
                course={props.course.name}
            />
            <Content
                parts={props.course.parts}
            />
            <Total
                parts={props.course.parts}
            />
        </div>
    )
}