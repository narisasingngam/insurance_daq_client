import React, { Component } from 'react'
import './../styles/table.css'

export class tableView extends Component {
    constructor(props){
        super(props)
        
    }
    render() {
        const detail = this.props.insuranceDetail.map((item,key)=>
            <tr>
                <th scope="row">{key+1}</th>
                <td>{item.company_name}</td>
                <td>{item.program_name}</td>
                <td>{item.policy_period}</td>
                <td>{item.premium_rate}</td>
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
                            <th scope="col">Policy Period</th>
                            <th scope="col">Premium Rate</th>
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

export default tableView
