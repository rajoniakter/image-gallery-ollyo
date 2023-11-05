import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';
import { Photo } from './Photo';


// for sort photo
const SortablePhoto = (props) => {
    const sortable = useSortable({id: props.url}) //The useSortable hook is used to create sortable functionality for this component
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
     } = sortable;

     const style = {
        transform: CSS.Transform.toString(transform),
        transition
     }

  return (
    <Photo ref={setNodeRef} style={style} {...props} {...attributes} {...listeners} />
  )
}

export default SortablePhoto