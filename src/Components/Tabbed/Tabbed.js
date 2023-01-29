import React from "react";

const Tabbed = (props) => {
    return (
        <li className="nav-item">
            {
                props.isActive
                    ? <a className="nav-link active" style={props.style ? props.style : { minWidth: '233px', width: 'auto', fontSize:"0.9rem" }} onClick={props.onClick} id={props.id} data-bs-toggle="tab" href="#all" role="tab" aria-controls="all" aria-selected="true">{props.text}</a>
                    : <a className="nav-link" style={{ minWidth: '233px', width: 'auto', fontSize:"0.9rem" }} onClick={props.onClick} id={props.id} data-bs-toggle="tab" href="#all" role="tab" aria-controls="all" aria-selected="true">{props.text}</a>
            }

        </li>)
}

export { Tabbed }; 