import React from "react";
import Header from "../components/Header";
import AddRestaurant from "../components/AddRestaurant";
import RestaurantList from "../components/RestaurantList";

const Home = () => {
    return (
        <div>
           <Header></Header>
            <AddRestaurant></AddRestaurant>
            <RestaurantList></RestaurantList>
        </div>
    )
}

export default Home;
