import React from 'react';
import Button from '../../Components/Button/Button';
import Search from '../../Components/Seach/Search';
import './Header.scss';

const Header = props => {
    return(
        <div className = 'header'>
            <Search handlerSearch = {props.searchHandler}/>
            <Button 
                 type="Logout"
                 clickHandler={props.clickHandler}
                />
        </div>
    )
}

export default Header;