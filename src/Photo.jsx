import React, { forwardRef, useState } from "react";

//forwarded with a ref for external use
export const Photo = forwardRef(
  ({ onSelect,url, index, faded, style, ...props }, ref) => {

    //states
    const [isSelected, setIsSelected] = useState(false);
    const [isHover, setIsHover] = useState(false);

    //style for the photo 
    const inlineStyles = {
        opacity:  faded ? '0.2' : '1',
        transformOrigin: '0 0',
        height: index === 0 ? 375 : 180, 
        width:'100%',       
        gridRowStart: index === 0 ? 'span 2' : null,
        gridColumnStart: index === 0 ? 'span 2' : null,
        backgroundImage: `url("${url}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'transparent',
        backgroundRepeat: 'no-repeat',
        border: '1px solid #ccc',
        borderRadius:'10px',
        position:"relative",  
        filter: isHover ? 'contrast(30%)' : 'contrast(100%)',
      ...style
    };


    // handling the select 
    const handleSelect = (event) => {
      // when the checkbox within the photo is clicked, passing the value in onSelect for update selectedItems
        const newSelected = event.target.checked;
        setIsSelected(newSelected);
        onSelect(url, newSelected);
        
    }

    return (
      <div className="img"
        ref={ref} 
        style={inlineStyles} 
        onMouseEnter={ () => setIsHover(true)}
        onMouseLeave={ () => setIsHover(false)}
        onClick={handleSelect}
        {...props}
      >

        {/* If the image is hovered over or selected, render a checkbox over it. */}
        {(isHover  || isSelected)   &&(
            <div
            
            style={{
                display: "block",
                position: "absolute",
                top: "5px",
                left: "5px",
                cursor: "pointer",
              }}
            >
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={handleSelect}

                />
            </div>
        )}
      </div>
    );
  }
);
