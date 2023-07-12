import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";
import StarRating from "./StarRating";

const RestaurantList = (props) => {
    const { restaurants, setRestaurants } = useContext(RestaurantsContext);
    let navigate = useNavigate();

    const [nameFilter, setNameFilter] = useState("");
    const [locationFilter, setLocationFilter] = useState("");
    const [priceRangeFilter, setPriceRangeFilter] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get("/");
                console.log(response.data.data);
                setRestaurants(response.data.data.restaurant);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        try {
            console.log(id);
            const response = await RestaurantFinder.delete(`/${id}`);
            console.log(response);
            setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    const handleUpdate = (e, id) => {
        e.stopPropagation();
        navigate(`/restaurants/${id}/update`);
    };

    const handleRestaurantSelect = (id) => {
        navigate(`/restaurants/${id}`);
    };

    const renderRating = (restaurant) => {
        if (!restaurant.count) {
            return <span className="text-warning">0 reviews</span>;
        }
        console.log(restaurant);
        return (
            <>
                <StarRating rating={restaurant.average_rating} />
                <span className="text-warning ml-1">({restaurant.count})</span>
            </>
        );
    };

    // Apply filters to the restaurants array
    const filteredRestaurants = restaurants.filter((restaurant) => {
        const nameMatch = restaurant.name.toLowerCase().includes(nameFilter.toLowerCase());
        const locationMatch = restaurant.location.toLowerCase().includes(locationFilter.toLowerCase());
        const priceRangeMatch =
            priceRangeFilter === "" || restaurant.price_range === Number(priceRangeFilter);
        return nameMatch && locationMatch && priceRangeMatch;
    });

    return (
        <div className="list-group">
            <div className="mb-4" style={{marginLeft:12}}>
                <div className="row">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Filter by name"
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                        style={{width:200}}
                    />
                    <i className="fa-solid fa-filter fa-2xl col" style={{marginTop:15}}></i>
                </div>
                <div className="row" >
                    <input
                        type="text"
                        className="form-control mt-2"
                        placeholder="Filter by location"
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                        style={{width:200}}
                    />
                </div>
                <div className="row">
                    <input
                        type="number"
                        min="1"
                        max="5"
                        className="form-control mt-2"
                        placeholder="Filter by price range"
                        value={priceRangeFilter}
                        onChange={(e) => setPriceRangeFilter(e.target.value)}
                        style={{width:200}}
                    />
                </div>
            </div>

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
                {filteredRestaurants.map((restaurant) => (
                    <tr
                        onClick={() => handleRestaurantSelect(restaurant.id)}
                        key={restaurant.id}
                    >
                        <td>{restaurant.name}</td>
                        <td>{restaurant.location}</td>
                        <td>{"$".repeat(restaurant.price_range)}</td>
                        <td>{renderRating(restaurant)}</td>

                        <td>
                            <button
                                onClick={(e) => handleUpdate(e, restaurant.id)}
                                className="btn btn-warning"
                            >
                                update
                            </button>
                        </td>
                        <td>
                            <button
                                onClick={(e) => handleDelete(e, restaurant.id)}
                                className="btn btn-danger"
                            >
                                delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default RestaurantList;

// import React, {useContext, useEffect} from "react";
// import {useNavigate} from "react-router-dom";
// import RestaurantFinder from "../apis/RestaurantFinder";
// import {RestaurantsContext} from "../context/RestaurantsContext";
// import StarRating from "./StarRating";
// const RestaurantList = (props) => {
//
//     const {restaurants, setRestaurants} = useContext(RestaurantsContext)
//     let navigate = useNavigate()
//
//     useEffect( () => {
//         const fetchData = async () => {
//             try {
//                 const response = await RestaurantFinder.get("/")
//                 console.log(response.data.data)
//                 setRestaurants(response.data.data.restaurant);
//             } catch (err) {
//                 console.log(err)
//             }
//         }
//         fetchData();
//     }, [])
//     const handleDelete = async (e, id) => {
//         e.stopPropagation()
//         try {
//             console.log(id)
//             const response = await RestaurantFinder.delete(`/${id}`)
//             console.log(response)
//             setRestaurants(restaurants.filter(restaurant => {
//                 return (restaurant.id !== id)
//             }))
//         } catch(err) {
//             console.log(err)
//         }
//     }
//
//     const handUpdate = (e, id) => {
//         e.stopPropagation()
//         navigate(`/restaurants/${id}/update`)
//     }
//
//     const handleRestaurantSelect = (id) => {
//         navigate(`/restaurants/${id}`)
//     }
//
//     const renderRating = (restaurant) => {
//         if (!restaurant.count) {
//             return <span className="text-warning">0 reviews</span>
//         }
//         console.log(restaurant)
//         return (
//             <>
//             <StarRating rating={restaurant.average_rating}/>
//             <span className="text-warning ml-1">({restaurant.count})</span>
//             </>
//         )
//     }
//
//     return (
//         <div className="list-group">
//
//             <table className="table table-hover table-dark">
//                 <thead>
//                     <tr className="bg-primary">
//                         <th scope="col">Restaurant</th>
//                         <th scope="col">Location</th>
//                         <th scope="col">Price Range</th>
//                         <th scope="col">Ratings</th>
//                         <th scope="col">Update</th>
//                         <th scope="col">Delete</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {restaurants && restaurants.map((restaurant) => {
//                         return (
//                             <tr onClick={() => handleRestaurantSelect(restaurant.id)} key={restaurant.id}>
//                                 <td>{restaurant.name}</td>
//                                 <td>{restaurant.location}</td>
//                                 <td>{"$".repeat(restaurant.price_range)}</td>
//                                 <td>{renderRating(restaurant)}</td>
//
//                                 <td>
//                                     <button onClick={(e) => handUpdate(e, restaurant.id)} className="btn btn-warning">update</button>
//                                 </td>
//                                 <td>
//                                     <button onClick={(e) => handleDelete(e, restaurant.id)}   className="btn btn-danger">delete</button>
//                                 </td>
//                             </tr>
//                         )
//                     })}
//                 </tbody>
//             </table>
//         </div>
//     )
// }
//
// export default RestaurantList
