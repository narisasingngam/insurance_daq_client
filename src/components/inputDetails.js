import React, { Component } from 'react'
import './../styles/input_details.css'
import Table from './tableView'
import BarChart from './BarChart'
import InputRange from 'react-input-range';
import axios from 'axios';
import 'react-input-range/lib/css/index.css'
import LineChart from './LineChart';
// import { DropdownButton, Dropdown, ButtonToolbar } from 'react-bootstrap';
// import DropdownItem from 'react-bootstrap/DropdownItem';

export class inputDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            premuim: 1000,
            age: 0,
            disabled: false,
            enabledOrder: false,
            searchDisease: [],
            apiDisease: [],
            inputvalue: "",
            submitDiseaseValue: "",
            insuranceDetail: [],
            CoverExpenseDetail: [],
            filteredDetail: [],
            filteredCoverExpenseDetail: []
        };
        this.searchData = this.searchData.bind(this)
        this.handleInput = this.handleInput.bind(this)
    }

    searchData() {
        this.setState({ disabled: true })
        this.setState({ enabledOrder: true }) 

        axios.get('https://insuranceapii.herokuapp.com/disease')
            .then(res => {
                console.log(res.data);
                this.setState({ apiDisease: res.data })
            })

        if(this.state.submitDiseaseValue !== ""){
            axios.post('https://insuranceapii.herokuapp.com/health/disease', { age: this.state.age, rate: this.state.premuim, disease: this.state.submitDiseaseValue })
            .then(res => {
                console.log(res.data);
                this.setState({ insuranceDetail: res.data, CoverExpenseDetail: res.data })
            })
            .then(res => this.filterDetail())
        }else{
            axios.post('https://insuranceapii.herokuapp.com/health/cost', { age: this.state.age, rate: this.state.premuim })
            .then(res => {
                console.log(res.data);
                this.setState({ insuranceDetail: res.data, CoverExpenseDetail: res.data })
            })
            .then(res => this.filterDetail())
        }
    }

    orderData(){

        if(this.state.submitDiseaseValue !== ""){
            axios.post('https://insuranceapii.herokuapp.com/health/disease/min', { age: this.state.age, rate: this.state.premuim, disease: this.state.submitDiseaseValue })
            .then(res => {
                console.log(res.data);
                this.setState({ insuranceDetail: res.data })
            })
            .then(res => this.filterDetail())
        }else{
            axios.post('https://insuranceapii.herokuapp.com/health/cost/min', { age: this.state.age, rate: this.state.premuim })
            .then(res => {
                console.log(res.data);
                this.setState({ insuranceDetail: res.data })
            })
            .then(res => this.filterDetail())
        }


        if(this.state.submitDiseaseValue !== ""){
            axios.post('https://insuranceapii.herokuapp.com/health/disease/min/coverexpense', { age: this.state.age, rate: this.state.premuim, disease: this.state.submitDiseaseValue })
            .then(res => {
                console.log(res.data);
                this.setState({ CoverExpenseDetail: res.data })
            })
            .then(res => this.filterCoverExpenseDetail())
        }else{
            axios.post('https://insuranceapii.herokuapp.com/health/cost/min/coverexpense', { age: this.state.age, rate: this.state.premuim })
            .then(res => {
                console.log(res.data);
                this.setState({ CoverExpenseDetail: res.data })
            })
            .then(res => this.filterCoverExpenseDetail())
        }
    }

    filterDetail() {
        let detailArray = []
        this.setState({ filteredDetail: [] });
        for (let i = 0; i < this.state.insuranceDetail.length; i++) {
            if (i === 0) detailArray.push(this.state.insuranceDetail[i]);
            else if (this.state.insuranceDetail[i - 1].company_name === this.state.insuranceDetail[i].company_name
                && this.state.insuranceDetail[i - 1].program_name === this.state.insuranceDetail[i].program_name
                && this.state.insuranceDetail[i - 1].premium_rate === this.state.insuranceDetail[i].premium_rate) {
            } else {
                detailArray.push(this.state.insuranceDetail[i]);
            }
            this.setState({ filteredDetail: detailArray });
        }

    }

    filterCoverExpenseDetail() {
        let detailArray = []
        this.setState({ filteredCoverExpenseDetail: [] });
        for (let i = 0; i < this.state.CoverExpenseDetail.length; i++) {
            if (i === 0) detailArray.push(this.state.CoverExpenseDetail[i]);
            else if (this.state.CoverExpenseDetail[i - 1].company_name === this.state.CoverExpenseDetail[i].company_name
                && this.state.CoverExpenseDetail[i - 1].program_name === this.state.CoverExpenseDetail[i].program_name
                && this.state.CoverExpenseDetail[i - 1].premium_rate === this.state.CoverExpenseDetail[i].premium_rate) {
            } else {
                detailArray.push(this.state.CoverExpenseDetail[i]);
            }
            this.setState({ filteredCoverExpenseDetail: detailArray });
        }

    }
    

    
    

    handleInput = (event) => {
        if(event.target.value !== this.state.submitDiseaseValue){
            this.setState({ enabledOrder: false});
        }
        this.setState({ inputvalue: event.target.value });
        const filterValues = (name) => {
            return this.state.apiDisease.filter(data => {
                return data.symtomp.toLowerCase().indexOf(name.toLowerCase()) > -1;
            });
        }

        if (event.target.value === "") {
            this.setState({ searchDisease: [], submitDiseaseValue: "" });
        } else {
            this.setState({ searchDisease: filterValues(event.target.value) });
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
                    <h3>Filters your insurance details</h3>

                    <div className="head-qua">Premium rate</div>
                    <div className="input-range">
                        <InputRange
                            maxValue={100000}
                            minValue={1000}
                            value={this.state.premuim}
                            onChange={value => this.setState({ premuim: value, enabledOrder: false})} />
                    </div>

                    <div className="head-qua">Policy period</div>
                    <div className="input-range">
                        <InputRange
                            maxValue={90}
                            minValue={0}
                            value={this.state.age}
                            onChange={value => this.setState({ age: value, enabledOrder: false})} />
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
                    <div className="scroll-btn">
                        {items}
                    </div>
                    <button className="btn-search" onClick={() => this.searchData()}>Search</button>
                    <button className="btn-search" style={this.state.enabledOrder ? {} : { display: 'none' }} onClick={() => this.orderData()}>Order</button>
                </div>
                <div className="table-data">
                <div className="text-center">Premium Rate Chart</div>
                <div className="main chart-wrapper">
                        <BarChart
                            insuranceDetail={this.state.filteredDetail}
                        />
                </div>
                <div className="text-center">Coverage Expense Chart</div>
                <div className="sub chart-wrapper">
                        <LineChart
                            insuranceDetail={this.state.CoverExpenseDetail}/>
                    </div>
                <div className="text-center">Insurance detail</div>
                    <Table insuranceDetail={this.state.insuranceDetail} />
                </div>

            </div>
        )
    }
}

export default inputDetails
