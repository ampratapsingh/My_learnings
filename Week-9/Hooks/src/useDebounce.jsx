import { useState } from "react";


function useDebounce(input, delay) {
  const [value, setValue] = useState(input);
  useEffect(() => {
    const interval = setTimeout(() => {
      setValue(input);
    }, delay);
    return () => clearTimeout(interval);
  },[input, delay]);

  return value
}

export default useDebounce

