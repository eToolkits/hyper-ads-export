import React from 'react'
import PropTypes from 'prop-types'
import NavigationBar from '../../components/NavigationBar'
import "./styles.css"

const HomeScreen = props => {
    return (
        <div className="homescreen-wrapper">
           <NavigationBar />
        </div>
    )
}

HomeScreen.propTypes = {

}

export default HomeScreen
