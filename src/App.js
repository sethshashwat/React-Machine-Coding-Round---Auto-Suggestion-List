import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [food, setFood] = useState("");
  const [suggestionList, setSuggestionList] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);

  const handleInput = (e) => {
    setFood(e.target.value);
  }

  useEffect(() => {
    if (food.length >= 2) {
      fetchFood(food);
    }
  }, [food])

  const fetchFood = async (food) => {
    const url = `https://api.frontendeval.com/fake/food/${food}`;
    const res = await fetch(url);
    const result = await res.json();
    setSuggestionList(result);
  }

  const selectItem = (item) => {
    const obj = {
      id: Date.now(),
      foodItem: item,
      isDone: false
    }
    const copyShoppingList = [...shoppingList];
    copyShoppingList.push(obj);
    setShoppingList(copyShoppingList);
    setFood("");
  }

  const handleDoneClick = (id) => {
    const copyShoppingList = [...shoppingList];
    const newShoppinglist = copyShoppingList.map((item) => {
      if(item.id === id) {
        item.isDone = !item.isDone;
      }
      return item;
    })
    setShoppingList(newShoppinglist);
  }

  const handleRemoveClick = (id) => {
    const copyShoppingList = [...shoppingList];
    const newShoppingList = copyShoppingList.filter((item) => {
      return item.id !== id;
    })
    setShoppingList(newShoppingList);
  }

  return (
    <div className="App">
      <h1>My Shopping List</h1>
      <div>
        <input type="text" onChange={handleInput} value={food} />
      </div>
      {
        food.length >= 2 ?
          <div className='suggestion-box'>
            {
              suggestionList.map((item) => {
                return <div className='product' key={item} onClick={() => selectItem(item)}>{item}</div>
              })
            }
          </div> : null
      }
      <div className='bucket'>
        {
          shoppingList.map((item) => {
            return <div className='shoppingItem' key={item.id}>
              <button onClick={() => handleDoneClick(item.id)}>✓</button>
              <div className={item.isDone ? "strike" : ""}>{item.foodItem}</div>
              <button onClick={() => handleRemoveClick(item.id)}>X</button>
            </div>
          })
        }
      </div>
    </div>
  );
}

export default App;
