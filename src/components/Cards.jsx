import styled from "styled-components";
import { MdCategory } from "react-icons/md";
import {BsBagCheckFill} from "react-icons/bs"

const Cards = ({
  img,
  title,
  description,
  price,
  discountPercentage,
  category,
  brand,
}) => {
  return (
    <Wrapper>
      <img src={img} alt={title} />
      <div className="card_data">
        <h3>{title}</h3>
        <div className="info">
          <div className="category">{<MdCategory style={{marginRight:"3px"}} />}{category}</div>
          <div className="brand">{<BsBagCheckFill  style={{marginRight:"3px"}}/>}{brand}</div>
        </div>
        <p className="description">{description}</p>
        <div className="price-section">
          <div className="price">
            {discountPercentage > 0 && (
              <span className="discount-price">${(price * (1 - discountPercentage / 100)).toFixed(2)}</span>
            )}
            <span className="original-price">${price.toFixed(2)}</span>
            <span className="discount">
              -{discountPercentage}% off
            </span>
          </div>
         
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 19rem;
  height: 34rem;
  background: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in;
  display: flex;
  flex-direction: column;

  img {
    border-top-right-radius: 0.5rem;
    border-top-left-radius: 0.5rem;
    width: 100%;
    height: 50%;
    /* object-fit: cover; */
  }

  .card_data {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  h3 {
    font-size: 1.2rem;
    margin: 0.5rem 0;
  }

  .info {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
  }

  .category,
  .brand {
    font-size: 0.8rem;
    padding: 0.2rem 0.5rem;
    color: red;
    border-radius: 0.5rem;
    background-color: #ffd8d0;
  }

  .brand {
    margin-left: 1rem;
  }

  .description {
    margin-top: 1rem;
    font-size: 0.9rem;
  }

  .price-section {
    display: flex;
    flex-direction: column;
  }

  .price {
    font-size: 1.2rem;
    font-weight: 600;
    color: #e91e63;
  }

  .original-price {
    color: red;
    font-size: 0.9rem;
    text-decoration: line-through; /* Strikethrough effect for original price */
    margin-right: 60px;
  }

  .discount-price {
    color: black; /* Blue color for discounted price */
    margin-right: 8px;
   
  }

  .discount {
    font-size: 0.9rem;
    font-weight: 600;
    color: green;
    /* margin-right: 40px; */
    background-color: green;
    color: white;
    border-radius: 7px;
    font-size: 0.7rem;
    padding: 4px;
    
  }

  &:hover {
    transform: scale(1.02);
  }
`;

export default Cards;
