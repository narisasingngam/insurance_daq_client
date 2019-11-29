import React, { Component } from 'react'
import './../styles/input_details.css'
import Table from './tableView'
import InputRange from 'react-input-range';
import axios from 'axios';
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
            searchDisease: [],
            apiDisease: [],
            inputvalue: "",
            submitDiseaseValue: "",
            insuranceDetail:[]

        };
        this.searchData = this.searchData.bind(this)
        this.handleInput = this.handleInput.bind(this)
    }

    searchData() {
        this.setState({ disabled: true })

        axios.post('https://insuranceapii.herokuapp.com/health/cost', { age: this.state.age, rate: this.state.premuim })
            .then(res => {
                console.log(res.data);
                this.setState({insuranceDetail: res.data})
            })

        axios.get('https://insuranceapii.herokuapp.com/disease')
            .then(res => {
                console.log(res.data);
                this.setState({ apiDisease: res.data })
            })

        axios.post('https://insuranceapii.herokuapp.com/health/disease', { age: this.state.age, rate: this.state.premuim, disease: this.state.submitDiseaseValue })
            .then(res => {
                console.log(res.data);
            })

    }


    handleInput = (event) => {
        this.setState({ inputvalue: event.target.value })
        const filterValues = (name) => {
            return this.state.apiDisease.filter(data => {
                return data.symtomp.toLowerCase().indexOf(name.toLowerCase()) > -1;
            });
        }

        if (event.target.value === "") {
            this.setState({ searchDisease: [] })
        } else {
            this.setState({ searchDisease: filterValues(event.target.value) })
        }

    }

    clickDisease(symtomp) {
        this.setState({ inputvalue: symtomp, searchDisease: [], submitDiseaseValue: symtomp });
    }

    render() {
        const items = this.state.searchDisease.map((item, key) =>
            <button className="disease-btn" key={item.id} onClick={() => this.clickDisease(item.symtomp)}>{item.symtomp}</button>
        )
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
                            value={this.state.inputvalue}
                        />
                    </div>
                    {items}
                    <button className="btn-search" onClick={() => this.searchData()}>Search</button>

                </div>
                <div className="table-data">
                    <Table insuranceDetail={this.state.insuranceDetail}/>
                </div>

            </div>
        )
    }
}

export default inputDetails
