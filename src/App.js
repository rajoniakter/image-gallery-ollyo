import { MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useState } from 'react';
import './App.css';
import Gallery from './Gallery';



function App() {
  // variables

  // image data 
  const photos =[
    require("./assets/image-1.webp"),
    require("./assets/image-2.webp"),
    require("./assets/image-3.webp"),
    require("./assets/image-4.webp"),
    require("./assets/image-5.webp") ,
    require("./assets/image-6.webp") ,
    require("./assets/image-7.webp") ,
    require("./assets/image-8.webp") ,
    require("./assets/image-9.webp"),
    require( "./assets/image-10.jpeg"),
    require( "./assets/image-11.jpeg")
  ]

  // states
  const [items, setItems] = useState(photos);
  const [activeId, setActiveId] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  // sensors 
  const sensors = useSensors(useSensor(MouseSensor,{
    activationConstraint:{
      distance:10
    }
  }), useSensor(TouchSensor))


  // functions  
  const  handleDragStart = (event) => {
    setActiveId(event.active.id);
  }

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        //Returning a new array with the item moved to the new position
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  }

  // setting the selected items into a array. 
  // If isSelected is true, the URL is added to the selectedItems array.
  // If isSelected is false, the URL is removed from the selectedItems array.
  const handleSelect = (url, isSelected) => {
    if (isSelected) {
      setSelectedItems([...selectedItems, url]);
    } else {
      setSelectedItems(selectedItems.filter((item) => item !== url));
    }
  };

  // delete images 
  const handleDelete = () => {
    const newItems = items.filter(item => !selectedItems.includes(item)) //It filters the items array to keep only those that are not included in the selectedItems array,

    setItems(newItems)
    setSelectedItems([]);   //after deleting, empty selected items array
  }  
  
  
  return (
    <div className="App ">
    <div className='gallery'>
      <div className='nav'>
        <h3>
            {
              selectedItems.length > 0 ? ` ☑️ ${selectedItems.length} Files Selected` : "Gallery"
            }
        </h3>
        
        {
          selectedItems.length > 0 ? <h3 className="delete" onClick={handleDelete} >Delete files</h3> : ""
        }
      </div>
      
      <div className='image-grid'>
        <Gallery 
          sensors={sensors}
          handleDragStart={handleDragStart}
          handleDragEnd={handleDragEnd}
          items={items}
          handleSelect={handleSelect}
          selectedItems={selectedItems}
          activeId={activeId}/>
      </div>
    </div>  
  </div>

  );
}

export default App;
