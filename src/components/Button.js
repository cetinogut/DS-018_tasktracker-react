import PropTypes from 'prop-types'

const Button = ( { color, text, onClick }) => {

    return (
    <button 
        onClick={onClick}
        style={{ backgroundColor: color }} 
        className='btn'>
        {text}
    </button>)
}

Button.defaultProps = {
    color :'steelblue',
    text:'button' // you can set default text on the button
}

Button.prototype = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick:PropTypes.func


}
export default Button
