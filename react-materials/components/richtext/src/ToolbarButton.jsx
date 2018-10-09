import styled from 'react-emotion'

const Icon = styled(({ className, ...rest }) => {
  return <span className={`material-icons ${className}`} {...rest} />
})`
  font-size: 18px;
  vertical-align: text-bottom;
`

const Button = ({reversed, active, icon, onMouseDown}) => {
  return (
    <span style={{
      cursor: 'pointer',
      color: reversed
          ? active ? 'white' : '#aaa'
          : active ? 'black' : '#ccc'
      }}
      onMouseDown={onMouseDown}
    >
      <Icon>{icon}</Icon>
    </span>
  );
}

export default Button;
