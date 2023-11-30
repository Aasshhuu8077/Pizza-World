import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
// component
import Searchsection from '../Home/Searchsection'
import Loadingscreen from '../common/Loadingscreen'
import Searchresultbox from './Searchresultbox'

const Searchresultpage = () => {
    const searchData = useSelector(state => state.searchDataReducer)
    const backendurl = useSelector(state => state.backendurlReducer)
    const resultview = useSelector(state => state.searchResultViewReducer)
    const [searchParams, setSearchParams] = useSearchParams()
    const dispatch = useDispatch()

    async function searchhandler() {
        var searchstring = searchParams.get("query")
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
                }
                return data
            })
            .catch(err => {
                console.log(err)
                alert("error occured")
            })
    }

    useEffect(() => {
        if (searchData === null) {
            searchhandler()
        }
    }, [])

    return (
        <main className='searchpage'>
            <Searchsection />
            <div className='searchpageresult-cont-section'>
                <div className='searchpage__filter-cont'>asdfsdf</div>
                {searchData !== null ?
                    searchData.length !== 0 ?
                        <div className={`${resultview === "grid" ? "searchresultgrid-cont" : "searchresultlist-cont"} searchresultcont`}>
                            {
                                searchData.map((element, index) => {
                                    return (
                                        <Searchresultbox
                                            key={index}
                                            element={element}
                                        />
                                    )
                                })
                            }
                        </div>
                        :
                        <div>Not found Search food</div>
                    :
                    <Loadingscreen />
                }
            </div>
        </main>
    )
}

export default Searchresultpage