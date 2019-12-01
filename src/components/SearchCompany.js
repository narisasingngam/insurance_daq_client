import React, { Component } from 'react'
import axios from 'axios';
import {CompanyTable} from './CompanyTable'

export class SearchCompany extends Component {

    constructor(props){
        super(props)
        this.state = {
            companyInsuranceDetail: []
        }
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
                <div>
                <div className="text-center">Insurance detail</div>
                    {/* <CompanyTable companyInsuranceDetail = {this.state.companyInsuranceDetail} /> */}
                </div>
            </div>
        )
    }
}

export default SearchCompany
