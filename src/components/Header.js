// import React from 'react'// this iused to be required but not anymore
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Button from './Button'

const Header = ({title, onAdd, showAdd}) => { // bu proplar App.js ten geliyor
    const onClick= () => {// since it is a componenet it is not ganno always have the same click 
                                 // thats why we'll have that click as  prop.    
        console.log('clicked')
    }
    const location = useLocation()

    return (

    <header className='header'>
        <h1>Dastugo Task Tracker</h1>
        {/* <h2 style={{ color: 'red', backgroundColor: 'black'}}>{title}</h2> this can be used for dynamic styling*/}
        {/* <h3 style = {headingStyle}>{title}</h3>  CSS in JS*/}
        {/* <button className='btn'>Add</button> hard coding a built-in button  */}
     {/* <button>test</button>
     <Button>test</Button>
     <Button text='test'/> */}
     {/* <Button color='green' text='Hello' />   
     <Button color='blue' text='Hello1' />
     <Button color='red' text='Hello2' />*/}
     
     {/* <Button color='green' text='Add' onClick= {onClick}/> */}
     {/* <Button color='green' text='Add' onClick= {onAdd}/> */}
     { location.pathname=== '/' && <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick= {onAdd}/> } {/*form butonu sadece / sayfada iken görünecek, about da görünmeyecek. */}
     

     {/* added and tested default props to Button component
     <Button text='test'/>
     <Button/> */}
    </header>

    )
}

Header.defaultProps = {
    title: 'Dastugo Task Tracker (default header)'
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

// CSS in JS
//const headingStyle = { color: 'darkgreen', backgroundColor: 'gray'}

export default Header
// when you create a new component, we have to put it somewhere in app. We will import this from App.js