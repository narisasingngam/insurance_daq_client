import React, { Component } from 'react'
import axios from 'axios';
import { CompanyTable } from './CompanyTable'
import './../styles/search_company.css'
import Card from 'react-bootstrap/Card';

export class SearchCompany extends Component {

    constructor(props) {
        super(props)
        this.state = {
            companyInsuranceDetail: [],
            companyList: [],
            searchCompany: [],
            onClickName: ""
        }
        this.callCompanyAPI()
    }

    callCompanyAPI() {
        axios.get('https://insuranceapii.herokuapp.com/company')
            .then(res => {
                console.log(res.data)
                this.setState({ companyList: res.data })
            })

    }

    handleCompanyInput = (event) => {
        this.setState({ onClickName: event.target.value })
        const filterValues = (name) => {
            return this.state.companyList.filter(data => {
                return data.company_name.toLowerCase().indexOf(name.toLowerCase()) > -1;
            });
        }
        if (event.target.value === "") {
            this.setState({ searchCompany: [] })
        } else {
            this.setState({ searchCompany: filterValues(event.target.value) })
        }

    }

    clickCompany(companyValue) {
        console.log(companyValue)
        this.setState({ searchCompany: [], onClickName: companyValue })
        axios.post('https://insuranceapii.herokuapp.com/company/search', { company: companyValue })
            .then(res => {
                this.setState({ companyInsuranceDetail: res.data })
            })
    }

    render() {
        const items = this.state.searchCompany.map((item, key) =>
            <button className="company-search" key={item.id} onClick={() => this.clickCompany(item.company_name)}>{item.company_name}</button>
        )
        const companyButton = this.state.companyInsuranceDetail.map((item, key) =>
            <div className="card-company">
                <Card style={{ width: '18rem'}}>
                    <Card.Body>
                        <Card.Title>{item.company_name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{item.program_name}</Card.Subtitle>
                        <Card.Text>
                            <center>
                            Premium Rate(per year)
                            </center>
                            <center>
                            <h3>฿{item.premium_rate}</h3>
                            </center>
                        </Card.Text>
                        <Card.Text>
                            Maximum Coverage: {item.covered_expense}
                        </Card.Text>
                        <Card.Text>
                            Coverage: {item.category}
                        </Card.Text>
                        <Card.Text>
                            Policy Period: {item.policy_period}
                        </Card.Text>
                        
                    
                    </Card.Body>
                </Card>
            </div>
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
                    <div>
                        <div className="table-company">
                            {companyButton}
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default SearchCompany
