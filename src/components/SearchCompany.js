import React, { Component } from 'react'
import axios from 'axios';
import './../styles/search_company.css'

export class SearchCompany extends Component {

    constructor(props){
        super(props)
        this.state = {
            companyList: [],
            searchCompany: [],
            onClickName:""
        }
        this.callCompanyAPI()
    }

    callCompanyAPI(){
        axios.get('https://insuranceapii.herokuapp.com/company')
            .then(res => {
                console.log(res.data)
                this.setState({companyList: res.data})
            })
        
    }

    handleCompanyInput = (event) => {
        this.setState({onClickName: event.target.value})
        const filterValues = (name) => {
            return this.state.companyList.filter(data => {
                return data.company_name.toLowerCase().indexOf(name.toLowerCase()) > -1;
            });
        }
        if(event.target.value === ""){
            this.setState({searchCompany:[]})
        }else{
            this.setState({searchCompany: filterValues(event.target.value)})
        }

    }

    clickCompany(company){
        console.log(company)
        this.setState({searchCompany:[],onClickName: company})
    }

    render() {
        const items = this.state.searchCompany.map((item, key) =>
            <button className="company-search" key={item.id} onClick={()=> this.clickCompany(item.company_name)}>{item.company_name}</button>
        )
        return (
            <div className="container">
                <div className="search-bar">
                    <input 
                    className="company-input" 
                    placeholder=" type company name here"
                    onChange={this.handleCompanyInput}
                    value={this.state.onClickName}
                    />
                    <div className="scroll-company">
                    {items}
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchCompany
