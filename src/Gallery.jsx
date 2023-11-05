import { DndContext, DragOverlay, closestCenter } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import React from 'react'
import { Photo } from './Photo'
import SortablePhoto from './SortablePhoto'

const Gallery = ({sensors,handleDragStart,handleDragEnd,items,handleSelect,selectedItems,activeId }) => {
  return (
    <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}    
    >
         {/*Creates a sortable context for the list of items */}
         <SortableContext items={items} > 

        {items.map((url, index) => (
        <SortablePhoto key={url} url={url} index={index} onSelect={handleSelect} selected={selectedItems.includes(url)} />
        ))}
    
        </SortableContext>

        {/* Renders a drag overlay with a Photo component if an activeId exists (an item is being dragged) */}
        <DragOverlay adjustScale={true}>            
            {activeId ? (
            <Photo url={activeId} index={items.indexOf(activeId)} selected={selectedItems.includes(activeId)} onSelect={handleSelect} />
            ) : null}
        </DragOverlay>

    </DndContext>
  )
}

export default Gallery