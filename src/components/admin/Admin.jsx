import React, { useEffect } from 'react'
// component
import Currentorders from "./Currentorders"
import Widgetcont, { Widget } from './Widgetcont'
import Adminprofile from './Adminprofile'
import Completedorders from './Completedorders'

const Admin = () => {
    return (
        <section className='admin__section'>
            <div className='admin__section-cont'>
                <Widgetcont>
                    <Adminprofile />
                    <Widget widgetheading={"Current Ongoing Orders"}>
                        <Currentorders />
                    </Widget>
                    <Widget widgetheading={"Today Completed Orders"}>
                        <Completedorders />
                    </Widget>
                </Widgetcont>
            </div>
        </section>
    )
}

export default Admin