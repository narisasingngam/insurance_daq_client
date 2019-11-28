import React, { Component } from 'react'
import './../styles/input_details.css'
import Table from './tableView'
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'
// import { DropdownButton, Dropdown, ButtonToolbar } from 'react-bootstrap';
// import DropdownItem from 'react-bootstrap/DropdownItem';

export class inputDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            premuim: 1000,
            age: 0,
            disabled: false,
            searchDisease:[]
        };
        this.searchData = this.searchData.bind(this)
        this.handleInput = this.handleInput.bind(this)
    }

    searchData() {
        this.setState({ disabled: true })
        console.log("mint")
    }

    handleInput = (event) =>{

    }

    render() {
        return (
            <div className="container">
                <div className="input-data">
                    <h3>Filters your insurance rate</h3>

                    <div className="head-qua">Premium rate</div>
                    <div className="input-range">
                        <InputRange
                            maxValue={100000}
                            minValue={1000}
                            value={this.state.premuim}
                            onChange={value => this.setState({ premuim: value })} />
                    </div>

                    <div className="head-qua">Age</div>
                    <div className="input-range">
                        <InputRange
                            maxValue={90}
                            minValue={0}
                            value={this.state.age}
                            onChange={value => this.setState({ age: value })} />
                    </div>
                    <div className="disease-detail" style={this.state.disabled ? {} : { display: 'none' }}>
                        <div className="head-qua">Coverage disease</div>
                        <input
                            className="disease-input"
                            placeholder=" type here "
                            onChange={this.handleInput}
                        />
                    </div>

                    <button className="btn-search" onClick={() => this.searchData()}>Search</button>

                </div>
                <div className="table-data">
                    <Table />
                </div>

            </div>
        )
    }
}

export default inputDetails
