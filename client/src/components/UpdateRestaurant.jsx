import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {RestaurantsContext} from "../context/RestaurantsContext";
import RestaurantFinder from "../apis/RestaurantFinder";

const UpdateRestaurant = () => {
    const {id} = useParams();
    let navigate = useNavigate()
    const {restaurants} = useContext(RestaurantsContext);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("Price Range");

    useEffect( () => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get(`/${id}`);
                setName(response.data.data.restaurant.name);
                setLocation(response.data.data.restaurant.location);
                setPriceRange(response.data.data.restaurant.price_range);
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
            name: name,
            location: location,
            price_range: priceRange
        })
        navigate(`/`)
    }
    return (
        <div>
            <form action="">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input value={name} onChange={e => setName(e.target.value)}
                           id="name" className="form-control" type="text"/>
                </div>
                <div className="form-group">
                    <label htmlFor="location">location</label>
                    <input value={location} onChange={e => setLocation(e.target.value)}
                           id="location" className="form-control" type="text"/>
                </div>
                <div className="form-group">
                    <label htmlFor="price_range">Price Range</label>
                    <select id="price_range" value={priceRange} onChange={e => setPriceRange(e.target.value)}
                            className="form-select my-1 mr-sm-2">
                        <option disabled>Price Range</option>
                        <option value={"1"}>$</option>
                        <option value={"2"}>$$</option>
                        <option value={"3"}>$$$</option>
                        <option value={"4"}>$$$$</option>
                        <option value={"5"}>$$$$$</option>
                    </select>
                </div>
                <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
 export default UpdateRestaurant;
