import React, { useState, useMemo } from "react";
// You have been given a list of items you shopped from the grocery store
// You need to calculate the total amount of money you spent

export const Assignment3 = () => {
  const [items, setItems] = useState([
    { name: "Chocolates", value: 10 },
    { name: "Chips", value: 20 },
    { name: "Onion", value: 30 },
    { name: "Tomato", value: 30 },
    // Add more items as needed
  ]);

  // Your code starts here
  const totalValue = useMemo(() => {
    return items.reduce((acc, item) => acc + item.value, 0);  //0 is the initial value of acc
  }, [items]);
  // Your code ends here

  
  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} - Price: ${item.value}
          </li>
        ))}
      </ul>
      <p>Total Value: {totalValue}</p>
    </div>
  );
};

// map is wrong here
// map creates a new array. [10, 20, 30, 30]
// But you want to sum all values, not return an array of partial sums.
//🔹 What is reduce?
// reduce is an array method that takes all the elements of an array and reduces them into a   single value (like a sum, product, object, or even another array).
