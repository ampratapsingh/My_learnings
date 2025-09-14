import React, { useState, useCallback } from 'react';

// Create a component that tracks and displays the number of times it has been rendered. Use useRef to create a variable that persists across renders without causing additional renders when it changes.

export function Assignment2() {
    const [, forceRender] = useState(0);

    const numberOfTimesRendered = useRef(0);

    const handleReRender = () => {
        // Update state to force re-render
        forceRender(Math.random());
    };

    numberOfTimesRendered.current = numberOfTimesRendered.current + 1;

    return (
        <div>
            <p>This component has rendered {0} times.</p>
            <button onClick={handleReRender}>Force Re-render</button>
        </div>
    );
};

//We could do it in 2 ways;
//1. using a state variable inside the component but the problem with it is that it will itself also rerender but count only once that is of forceRender
//2. using a global variable outside the component, which does work but declaring a variable globally i.e outside a react lifecyle is not a good practice
//3. using useRef has two useCases:
//3a. to create a variable that persists across renders without causing additional renders when it changes
//3b. to create a reference to a DOM element
