import styled from "styled-components";
import Cards from "./components/Cards";
import axios from "axios";
import { useEffect, useState } from "react";

const api = "https://dummyjson.com/products";
const productsPerPage = 6;

function App() {
  const [Products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSorting, setSelectedSorting] = useState("priceLowToHigh");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const getAllProducts = async (url) => {
    setIsLoading(true);
    try {
      const res = await axios.get(url);
      const productsdata = await res.data.products;
      setProducts(productsdata);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts(api);
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    updateProducts(category, selectedSorting);
  };

  const handleSortingChange = (sorting) => {
    setSelectedSorting(sorting);
    updateProducts(selectedCategory, sorting);
  };

  const updateProducts = (category, sorting) => {
    let updatedProducts = [...Products];

    if (category !== "all") {
      updatedProducts = updatedProducts.filter(
        (product) => product.category === category
      );
    }

    if (sorting === "priceLowToHigh") {
      updatedProducts = updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sorting === "priceHighToLow") {
      updatedProducts = updatedProducts.sort((a, b) => b.price - a.price);
    }

    return updatedProducts;
  };

  const filteredProducts = updateProducts(selectedCategory, selectedSorting);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const productsToDisplay = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Wrapper>
      <div className="filters">
        <div className="filter filter-category">
        <div>Category</div>
          <label>
            <input
              type="radio"
              name="category"
              value="all"
              checked={selectedCategory === "all"}
              onChange={() => handleCategoryChange("all")}
            />
            All Categories
          </label>
          <label>
            <input
              type="radio"
              name="category"
              value="smartphones"
              checked={selectedCategory === "smartphones"}
              onChange={() => handleCategoryChange("smartphones")}
            />
            Smartphones
          </label>
          <label>
            <input
              type="radio"
              name="category"
              value="laptops"
              checked={selectedCategory === "laptops"}
              onChange={() => handleCategoryChange("laptops")}
            />
            Laptops
          </label>
          <label>
            <input
              type="radio"
              name="category"
              value="fragrances"
              checked={selectedCategory === "fragrances"}
              onChange={() => handleCategoryChange("fragrances")}
            />
            Fragrances
          </label>
          <label>
            <input
              type="radio"
              name="category"
              value="groceries"
              checked={selectedCategory === "groceries"}
              onChange={() => handleCategoryChange("groceries")}
            />
            Groceries
          </label>
        </div>
        <div className="filter filter-sorting">
        <div>Price</div>
          <label>
            <input
              type="radio"
              name="sorting"
              value="priceLowToHigh"
              checked={selectedSorting === "priceLowToHigh"}
              onChange={() => handleSortingChange("priceLowToHigh")}
            />
            Price: Low to High
          </label>
          <label>
            <input
              type="radio"
              name="sorting"
              value="priceHighToLow"
              checked={selectedSorting === "priceHighToLow"}
              onChange={() => handleSortingChange("priceHighToLow")}
            />
            Price: High to Low
          </label>
        </div>
      </div>

      <div style={{display:"flex", flexDirection:"column"}}>
        {isLoading ? (
          <LoadingSpinner>
            <div className="loader"></div>
          </LoadingSpinner>
        ) : (
          <div className="cards">
            {productsToDisplay.map((ele) => (
              <Cards
                key={ele.id}
                img={ele.images[0]}
                title={ele.title}
                description={ele.description}
                price={ele.price}
                rating={ele.rating}
                brand={ele.brand}
                category={ele.category}
                discountPercentage={ele.discountPercentage}
              />
            ))}
          </div>
        )}

        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </Wrapper>
  );
}

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  width: 100vw;
`;

const Wrapper = styled.section`
  display: flex;
  flex-direction: row;
  gap: 2.5rem;
  /* align-items: center; */

  .pagination {
    align-self: center;
    margin-bottom: 25px;
  }
  .pagination > span{
    margin-left: 10px;
    margin-right:10px;
  }

  .filters {
    height: 100vh;
    /* background: #53c7dc;  */
    background-color: white;
    color: black;
    padding: 1rem;
    padding-top: 5rem;
    width: 290px;
    /* max-width: 290px; */
    border-radius: 0.5rem;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2); /* Add box-shadow */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .filter>div{
    font-weight: bold;
    text-transform: uppercase;
  }

  .filter-category {
    /* background-color: #fff; */
    margin-bottom: 3rem;
  }

  .filter-sorting {
    margin-bottom: 1rem;
  }

  .filter-category label,
  .filter-sorting label {
    display: flex;
    align-items: center;
  }

  
  .cards {
    /* max-width: 1400px; */
    padding: 5rem;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 5rem;
    /* align-items: flex-start; */
  }

  @media (max-width:850px) {
    flex-direction: column;
    .filters{
      height: 100%;
      width: 100vw;
      flex-direction: row;
      gap: 20px;
      justify-content: center;

    }
  }
`;

export default App;