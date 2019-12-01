import React, { Component } from 'react'
import './../styles/table.css'

export class CompanyTable extends Component {
    constructor(props){
        super(props)
    }
    render() {
        const detail = this.props.companyInsuranceDetail.map((item,key)=>
            <tr>
                <th scope="row">{key+1}</th>
                <td>{item.company_name}</td>
                <td>{item.program_name}</td>
                <td>{item.category}</td>
                <td>{item.policy_period}</td>
                <td>{item.premium_rate}</td>
                <td>{item.covered_expense}</td>
            </tr>
        )
        return (
            <div className="scroll">
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Company Name</th>
                            <th scope="col">Program</th>
                            <th scope="col">Category</th>
                            <th scope="col">Policy Period</th>
                            <th scope="col">Premium Rate</th>
                            <th scope="col">Covered Expense</th>
                        </tr>
                    </thead>
                    <tbody>
                        {detail}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default CompanyTable
