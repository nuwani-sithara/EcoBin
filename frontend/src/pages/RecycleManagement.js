import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecycleManagement.css';
import ProgressBar from './ProgressBar'; // Import the progress bar component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTimes } from '@fortawesome/free-solid-svg-icons';

import cardboardImg from '../photos/cartboard.jpg';
import newspaperImg from '../photos/newspaper.jpg';
import plasticCansImg from '../photos/bottle.jpg';
import metalsImg from '../photos/metal.jpg';

const RecycleManagement = ({ items, setItems }) => {
  const navigate = useNavigate();

  // Handle weight increment
  const handleIncrement = (itemName) => {
    const newWeight = items[itemName].weight + 0.1;
    const newTotal = newWeight * items[itemName].pricePerKg;
    setItems({
      ...items,
      [itemName]: { ...items[itemName], weight: newWeight, total: newTotal }
    });
  };

  // Handle weight decrement
  const handleDecrement = (itemName) => {
    const newWeight = Math.max(0.1, items[itemName].weight - 0.1);
    const newTotal = newWeight * items[itemName].pricePerKg;
    setItems({
      ...items,
      [itemName]: { ...items[itemName], weight: newWeight, total: newTotal }
    });
  };

  // Calculate total weight and total price
  const selectedItems = Object.values(items).filter((item) => item.selected);
  const totalWeight = selectedItems.reduce((acc, item) => acc + item.weight, 0);
  const totalPrice = selectedItems.reduce((acc, item) => acc + item.total, 0);

  // Handle navigation to summary page
  const handleNext = () => {
    navigate('/summary', {
      state: { items, totalWeight, totalPrice }
    });
  };

  // Split items into groups of two
  const itemEntries = Object.entries(items);
  const rows = [];
  for (let i = 0; i < itemEntries.length; i += 2) {
    rows.push(itemEntries.slice(i, i + 2));
  }

  return (
    <div>
      <ProgressBar activeStep={1} /> {/* Highlight only the first step */}
      <div className="recycle-container">
        {/* Your existing component code for displaying the items */}
        <div className="item-selection">
          <h3>Select Items</h3>
          {/* Display items in rows of two */}
          {rows.map((row, rowIndex) => (
            <div className="item-row" key={rowIndex}>
              {row.map(([itemName, itemData]) => (
                <div
                  key={itemName}
                  className={`item-card ${itemData.selected ? 'selected' : ''}`}
                >
                  <img src={getImageSrc(itemName)} alt={itemName} className="item-image" />
                  <div className="item-details">
                    <h4>{capitalize(itemName)}</h4>
                    <p>Rs. {itemData.pricePerKg}/kg</p>
                  </div>
                  {!itemData.selected ? (
                    <button
                      className="add-button"
                      onClick={() =>
                        setItems({ ...items, [itemName]: { ...itemData, selected: true } })
                      }
                    >
                      Add
                    </button>
                  ) : (
                    <div>
                      <div className="weight-control">
                        <button onClick={() => handleDecrement(itemName)}>
                          <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <span>{itemData.weight.toFixed(1)}</span>
                        <button onClick={() => handleIncrement(itemName)}>
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                        
                        <p>Rs.{itemData.total.toFixed(2)}</p>
                        <button
                          className="cancel-button"
                          onClick={() =>
                            setItems({
                              ...items,
                              [itemName]: { ...itemData, selected: false, weight: 1.0, total: itemData.pricePerKg }
                            })
                          }
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </div>
                      
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Navigation Button */}
        <div className="next-button-container">
          <button className="next-button" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper function to get image source based on item name
const getImageSrc = (itemName) => {
  switch (itemName) {
    case 'cardboard':
      return cardboardImg;
    case 'newspaper':
      return newspaperImg;
    case 'plasticCans':
      return plasticCansImg;
    case 'metals':
      return metalsImg;
    default:
      return '';
  }
};

// Helper function to capitalize item names
const capitalize = (name) => name.charAt(0).toUpperCase() + name.slice(1);

export default RecycleManagement;
