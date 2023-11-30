import React from "react"
// stylesheet
import "../../css/admin.css"

function Widgetcont(props){
    return (
        <div className="adminwidget__cont m-5">
            {props.children}
        </div>
    )
}

export default Widgetcont

export function Widget(props){
    return(
        <div className="adminwidget__wraper">
            <div className="adminwidget__heading-cont flex justify-center py-5 font-black text-2xl">
                {props.widgetheading}
            </div>
            {props.children}
        </div>
    )
}