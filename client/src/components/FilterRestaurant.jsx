import React, {useContext, useState} from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import {RestaurantsContext} from "../context/RestaurantsContext";
const FilterRestaurant = () => {
    const { addRestaurants } = useContext(RestaurantsContext)
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("Price Range");
    return (
        <div className="mb-4">
            <form action="">
                <div className="row"> {/* Use "row" class instead of "form-row" */}
                    <div className="col">
                        <input value={name} onChange={e => setName(e.target.value)}
                               type="text" className="form-control" placeholder="name"/>
                    </div>
                    <div className="col">
                        <input value={location} onChange={e => setLocation(e.target.value)}
                               type="text" className="form-control" placeholder="location"/>
                    </div>
                    <div className="col" style={{marginTop:-5}}>
                        <select value={priceRange} onChange={e => setPriceRange(e.target.value)}
                                className="form-select my-1 mr-sm-2" > {/* Use "form-select" class instead of "custom-select" */}
                            <option disabled>Price Range</option>
                            <option value={"1"}>$</option>
                            <option value={"2"}>$$</option>
                            <option value={"3"}>$$$</option>
                            <option value={"4"}>$$$$</option>
                            <option value={"5"}>$$$$$</option>
                        </select>
                    </div>
                    <div className="col" style={{marginTop:-3}}>
                        <button onClick={handleSubmit} type="submit" className="btn btn-primary">Add</button>
                    </div>
                </div>
            </form>
        </div>
    )
}


export default FilterRestaurant;
