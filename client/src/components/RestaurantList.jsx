import React, {useContext, useEffect} from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import {RestaurantsContext} from "../context/RestaurantsContext";
const RestaurantList = (props) => {

    const {restaurant, setRestaurants} = useContext(RestaurantsContext)

    useEffect( () => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get("/")
                console.log(response)
                setRestaurants(response.data.data.restaurant);
            } catch (err) {
            }
        }
        fetchData();
    }, [])

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
                    <tr>
                        <td>KFC</td>
                        <td>New York</td>
                        <td>$$</td>
                        <td>Rating</td>
                        <td>
                            <button className="btn btn-warning">update</button>
                        </td>
                        <td>
                            <button className="btn btn-danger">delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default RestaurantList
