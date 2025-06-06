import Card from "./Card";
import { useEffect, useState } from "react";
import ShimmerCard from "./ShimmerCard";
import { Link } from "react-router";
import "../styles/Box.css";

const Box = () => {
  const [resList, setResList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleFilter = () => {
    if (!resList || resList.length === 0) return;

    const filterList = resList.filter((res) => res?.info?.avgRating >= 4.5);
    setFilteredList(filterList);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (!resList || resList.length === 0) return;

    // Perform search in real-time as user types
    if (value.trim() === "") {
      setFilteredList(resList);
    } else {
      const filtered = resList.filter((res) =>
        res?.info?.name?.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredList(filtered);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7040592&lng=77.10249019999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Add multiple fallback paths as Swiggy API structure can vary
      let restaurants = [];

      // Try different possible paths in the API response
      if (data?.data?.cards) {
        // Look for restaurants in different card positions
        for (let i = 0; i < data.data.cards.length; i++) {
          const card = data.data.cards[i];
          if (card?.card?.card?.gridElements?.infoWithStyle?.restaurants) {
            restaurants = card.card.card.gridElements.infoWithStyle.restaurants;
            break;
          }
          // Alternative path structure
          if (card?.card?.card?.restaurants) {
            restaurants = card.card.card.restaurants;
            break;
          }
        }
      }

      // Ensure restaurants is always an array
      restaurants = Array.isArray(restaurants) ? restaurants : [];

      setResList(restaurants);
      setFilteredList(restaurants);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message);
      // Ensure arrays are set even on error
      setResList([]);
      setFilteredList([]);
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setFilteredList(resList || []);
    setSearchValue("");
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Show loading state
  if (loading) {
    return <ShimmerCard />;
  }

  // Show error state
  if (error) {
    return (
      <div className="error-container">
        <h2>Something went wrong!</h2>
        <p>{error}</p>
        <button onClick={fetchData} className="retry-btn">
          Try Again
        </button>
      </div>
    );
  }

  // Show empty state
  if (!resList || resList.length === 0) {
    return (
      <div className="empty-container">
        <h2>No restaurants found</h2>
        <p>Unable to load restaurants at the moment.</p>
        <button onClick={fetchData} className="retry-btn">
          Refresh
        </button>
      </div>
    );
  }

  return resList.length === 0 ? (
    <ShimmerCard />
  ) : (
    <div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search restaurant"
          className="res-search"
          value={searchValue}
          onChange={handleSearch}
        />
        <button
          className="search-btn"
          onClick={() => handleSearch({ target: { value: searchValue } })}
        >
          Search
        </button>
      </div>

      <div className="filter-container">
        <button className="filter-btn" onClick={handleFilter}>
          Filter Top Restaurants (4.5+)
        </button>
        <button className="show-all-btn" onClick={resetFilters}>
          Show All Restaurants
        </button>
        {/* <span className="results-count">
          Showing {filteredList?.length || 0} of {resList?.length || 0}{" "}
          restaurants
        </span> */}
      </div>

      <div className="container ml-24">
        {filteredList && filteredList.length > 0 ? (
          filteredList.map((item) => (
            <Link
              key={item?.info?.id || Math.random()}
              to={`/restaurants/${item?.info?.id}`}
            >
              <Card resturant={item} />
            </Link>
          ))
        ) : (
          <div className="no-results">
            <h3>No restaurants match your search</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Box;
