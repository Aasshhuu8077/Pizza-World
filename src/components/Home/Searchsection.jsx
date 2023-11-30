import React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
// components
import { BsSearch } from "react-icons/bs"
// stylesheet
import "../../css/searchsection.css"

const Searchsection = () => {
    const [searchstring, setSearchstring] = useState("")
    const backendurl = useSelector(state => state.backendurlReducer)
    const dispatch = useDispatch()
    const navigator = useNavigate()

    async function searchhandler(event) {
        var req = new Request(backendurl + "/food/search?query=" + searchstring, {
            credentials: "include"
        })
        var res = await fetch(req)
            .then(async (response) => {
                var data = await response.json()
                return { code: response.status, data: data.data }
            })
            .then(data => {
                // fill the reducer state
                var { code, data } = data
                if (code === 200) {
                    dispatch({ type: "SET_SEARCH-DATA", data: data })
                    navigator(`/food/search?query=${searchstring}`)
                }
                return data
            })
            .catch(err => {
                console.log(err)
                alert("error occured")
            })

    }

    return (
        <div className='search__section-cont flex justify-center items-center'>
            <div className='search__bar-cont shadow-md'>
                <input placeholder={"Search for Your taste..."} value={searchstring} onChange={(event) => {
                    setSearchstring((prevstate => event.target.value))
                }}/>
                <button onClick={searchhandler}>
                    <BsSearch />
                </button>
            </div>
        </div>
    )
}

export default Searchsection