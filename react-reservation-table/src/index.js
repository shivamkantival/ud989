import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

const heading = [{
        name:`Service type
        Room`,
        colSpan:1
    },
    {
        name:"Standard service",
        colSpan:2
    },
    {
        name:"Deluxe service",
        colSpan:2
    },
    {
        name:"Total",
        colSpan:1
    },
];
const charges = [
    ["Standard", 10, 15],
    ["Luxury", 20, 25],
    ["Supreme", 30, 35],
    ["Supreme Delux", 40, 45],
];

class TableHead extends React.Component{
    constructor(props) {
        super(props);
        this.renderCol = this.renderCol.bind(this);
    }

    renderCol(obj){
        return (<th colSpan={`1`} rowSpan={`2`} key={obj.name}>
                    {obj.name}
                </th>);
    }

    render(){
        const data = this.props.headings;
        return  (<thead>
                    <tr>
                        {data.map(this.renderCol)}
                    </tr>
                </thead>);
    }
}

class TableBody extends React.Component{
    constructor(props) {
        super(props);
        this.state = {data:this.props.dataValues};
        this.rowNum = this.props.rowNum;
        this.charges = this.props.charges;
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const newInputValue = event.target.value;
        const id = parseInt(event.target.id, 10);
        const oldSum = this.state.data[id - 1];
        let rowData = this.state.data;
        const chargePerRoom = parseInt(this.charges[id], 10);
        let newTotal = 0;
        if (!(newInputValue==="" || (parseInt(newInputValue, 10) < 0)) ) {
            newTotal = chargePerRoom * parseInt(newInputValue, 10);
            rowData[id - 1] = newTotal;
            rowData[2] = rowData[2] - oldSum + newTotal;
            this.setState({data: rowData});
            this.props.handleChange(newTotal - oldSum);
        }
    }

    render() {
        const rowData = this.state.data;
        const element = this.charges.map((value,index) => {
            let element = null;
            if(index !== 0){
                element = (
                    <td key={`row${index}`}>
                        <input type={`number`} min={`0`} onChange={this.handleChange} id={index} />
                        { value }
                    </td>
                )
            }
            return element;
        })
        return (
            <tr>
                <td>
                    {this.charges[0]}
                </td>
                {element}
                <td>{rowData[2]}</td>
            </tr>
        )
    }
}

function TableFoot(props) {
    return (
        <tfoot>
            <tr>
                <td colSpan={`3`}> Grand Sum </td>
                <td>{props.grandTotal} </td>
            </tr>
        </tfoot>
    );
}

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.totalRows = parseInt(charges.length, 10);
        this.totalCols = parseInt(heading.length, 10)-1;
        this.bodyData = new Array(this.totalRows);
        this.state = {
                     grandTotal: 0,
                    };
        for(let i=0;i< this.totalRows;i++) {
            this.bodyData[i] = (new Array(this.totalCols + 1)).fill(0);
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(differenceValue) {
        const currentGrand = this.state.grandTotal;
        this.setState({grandTotal: currentGrand + differenceValue});
    }

    render() {
        return (
            <table className={`container`} >
                 <TableHead headings={heading} />
                 <tbody>
                    {
                        this.bodyData.map((arrayObj, index)=> {
                            return <TableBody dataValues={arrayObj} charges={charges[index]} key={`row${index}`} rowNum={index} handleChange={this.handleChange} />
                        }
                        )
                    }
                 </tbody>
                 <TableFoot grandTotal={this.state.grandTotal} /> 
            </table>)
    }
}

function App(props) {
    return (<div>
                <Table />
           </div>);
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
