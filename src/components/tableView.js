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
                <td>{item.covered_expense}</td>
            </tr>
        )
        return (
            <div>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Company Name</th>
                            <th scope="col">Program</th>
                            <th scope="col">Covered expenses</th>
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
