import React, {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import {RestaurantsContext} from "../context/RestaurantsContext";
const RestaurantList = (props) => {

    const {restaurants, setRestaurants} = useContext(RestaurantsContext)
    let navigate = useNavigate()

    useEffect( () => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get("/")
                console.log(response)
                setRestaurants(response.data.data.restaurant);
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [])
    const handleDelete = async (id) => {
        try {
            const response = await RestaurantFinder.delete(`/${id}`)
            setRestaurants(restaurants.filter(restaurant => {
                return (restaurant.id !== id)
            }))
        } catch(err) {
            console.log(err)
        }
    }

    const handUpdate = (id) => {
        navigate(`/restaurants/${id}/update`)
    }

    return (
        <div className="list-group">
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">Restaurant</th>
                        <th scope="col">Location</th>
                        <th scope="col">Price Range</th>
                        <th scope="col">Ratings</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants && restaurants.map((restaurant) => {
                        return (
                            <tr key={restaurant.id}>
                                <td>{restaurant.name}</td>
                                <td>{restaurant.location}</td>
                                <td>{"$".repeat(restaurant.price_range)}</td>
                                <td>reviews</td>
                                <td>
                                    <button onClick={() => handUpdate(restaurant.id)} className="btn btn-warning">update</button>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(restaurant.id)}   className="btn btn-danger">delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default RestaurantList
