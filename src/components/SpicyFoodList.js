import React, { useState } from "react";
import { spicyFoods, getNewRandomSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  const [filterBy, setFilterBy] = useState("All");

  // Function to add a new spicy food to the list
  function handleAddFood() {
    const newFood = getNewRandomSpicyFood();
    const newFoodArray = [...foods, newFood];
    setFoods(newFoodArray);
  }

  // Function to handle click on a food item and remove it from the list
  function handleLiClick(id) {
    const newFoodArray = foods.filter((food) => food.id !== id);
    setFoods(newFoodArray);
  }

  // Function to handle click on a food item and increment its heat level
  function handleLiClickWithHeat(id) {
    const newFoodArray = foods.map((food) => {
      if (food.id === id) {
        return {
          ...food,
          heatLevel: food.heatLevel + 1,
        };
      } else {
        return food;
      }
    });
    setFoods(newFoodArray);
  }

  // Function to handle change in the filter dropdown
  function handleFilterChange(event) {
    setFilterBy(event.target.value);
  }

  // Filter the foods based on the selected cuisine or show all
  const foodsToDisplay = foods.filter((food) => {
    if (filterBy === "All") {
      return true;
    } else {
      return food.cuisine === filterBy;
    }
  });

  // Map the filtered foods to create the food list UI
  const foodList = foodsToDisplay.map((food) => (
    <li key={food.id} onClick={() => handleLiClickWithHeat(food.id)}>
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  ));

  return (
    <div>
      {/* Button to add a new food */}
      <button onClick={handleAddFood}>Add New Food</button>

      {/* Dropdown to filter by cuisine */}
      <select name="filter" onChange={handleFilterChange}>
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>

      {/* Display the filtered food list */}
      <ul>{foodList}</ul>
    </div>
  );
}

export default SpicyFoodList;
