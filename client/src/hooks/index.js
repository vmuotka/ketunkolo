import { useState, useEffect } from 'react'

export const useField = (name, type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  const setVal = (val) => {
    setValue(val)
  }

  return {
    attributes: {
      name,
      label: name.charAt(0).toUpperCase() + name.slice(1),
      id: name,
      type,
      value,
      onChange
    },
    reset,
    setVal
  }
}

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}