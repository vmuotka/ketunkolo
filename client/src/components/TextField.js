const TextField = ({ type, value, label, onChange, onBlur, placeholder, disabled }) => {
  return (
    <>
      {}
      <input
        className='py-1'
        style={{
          backgroundColor: 'inherit',
          fontSize: '1.15em'
        }}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
      />
    </>
  )
}

export default TextField