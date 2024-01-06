import React from "react";

import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import MyError from "./MyError";

export interface Meal {
    id: string,
    name: string,
    price: string,
    description: string,
    image: string,
    quantity?: any
}

type ArrayOfMeals = Array<Meal>;

const INITIAL_MEALS: ArrayOfMeals = [];

const requestConfig = {
    method: 'GET'
}

export default function Meals(): React.JSX.Element {
    const {
        fetchedData: loadedMeals,
        isFetching,
        errorState
    } = useHttp('http://localhost:3000/meals', requestConfig, INITIAL_MEALS);

    if (isFetching) {
        return <p className="center">Fetching meals...</p>
    }

    if (errorState) {
        return <MyError title="Failed to fetch meals" errorMsg={errorState}/>
    }

    return (
        <ul id="meals">
            {loadedMeals.map((meal: Meal) => (
                <MealItem key={meal.id} meal={meal}/>
            ))}
        </ul>
    );
}