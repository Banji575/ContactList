import React from 'react';

const Search = props => {
    return(
        <input placeholder='Search...' onChange = {(e)=>{props.handlerSearch(e)}}/>
    )
    
}

export default Search