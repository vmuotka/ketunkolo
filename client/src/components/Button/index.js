import './button.css'

const Button = ({ onClick, color, children }) => {
  let colorClassNames
  switch (color) {
    case 'secondary':
      colorClassNames = 'bg-secondary-500 hover:bg-secondary-600'
      break
    case 'primary':
    default:
      colorClassNames = 'bg-primary-500 hover:bg-primary-600'
      break
  }
  return (
    <button
      className={`${colorClassNames} px-2.5 py-1.5 rounded text-white text-lg`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export const ButtonGroup = ({ className, children }) => {
  return (
    <span className={`buttongroup ${className}`}>
      {children}
    </span>
  )
}

export default Button