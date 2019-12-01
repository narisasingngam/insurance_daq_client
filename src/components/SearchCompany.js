import React, { Component } from 'react'
import axios from 'axios';

export class SearchCompany extends Component {

    constructor(props){
        super(props)
    }

    callCompanyAPI(){
        axios.get('https://insuranceapii.herokuapp.com/company')
            .then(res => {console.log(res.data)})
        
    }

    render() {
        return (
            <div className="container">
                <div className="search-bar">
                    
                </div>
            </div>
        )
    }
}

export default SearchCompany
