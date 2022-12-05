import React, {useEffect, useReducer} from 'react';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import NaviBar from "./Components/NaviBar";
import About from "./Pages/About";
import Rent from "./Pages/Rent";
import DetailedTruck from "./Pages/DetailedTruck";
import {
    reducer,
    GET_SELECTED_TRUCK_FROM_LOCAL,
    SET_SELECTED_TRUCK_FOR_LOCAL
} from "./Supporting Files/reducer";
import {defaultState, Context} from "./Supporting Files/context";
import History from "./Pages/History";
import {fetchBrand, fetchBrands, fetchOrders, fetchTruck, fetchTrucks} from "./Supporting Files/NetworkRequests";

function App() {
    const [state, dispatch] = useReducer(reducer, defaultState);

    useEffect(() => {
        dispatch({
            type: GET_SELECTED_TRUCK_FROM_LOCAL,
            payload: {}
        })
    }, [state.id])

    useEffect(()=>{
        console.log("STATE RELOAD IN APP")
        console.log(state)
    },[state])

    useEffect(() => {
        console.log("APP")
        console.log(state)
        dispatch({
            type: SET_SELECTED_TRUCK_FOR_LOCAL,
            payload: {}
        })
    }, [state.selectedTruck])



    return (
        <Context.Provider value={{
            fetchOrders,
            fetchTrucks,
            fetchBrands,
            fetchTruck,
            fetchBrand,
            state, dispatch
        }}>
            <Router>
                <React.StrictMode>
                    <NaviBar/>
                    <Routes>
                        <Route exact path="/about" element={<About/>}/>
                        <Route  path="/" element={<Rent/>}/>
                        <Route exact path="rent/:id" element={<DetailedTruck/>}/>
                        <Route exact path="history/:id" element={<History/>}/>
                    </Routes>
                </React.StrictMode>
            </Router>
        </Context.Provider>
);
}

export default App;