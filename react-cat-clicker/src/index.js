import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import registerServiceWorker from './registerServiceWorker';

const createCatObject = function(name = "cat", counter = 0) {
    const catObject = {
        "catName": name,
        "counter": counter,
        "url": "http://www.laughspark.info/thumbfiles/705X705/cute-cat-image-thinking-635731405758688214-13777.jpg",
    }
    return catObject;
}

const catsData = function(totalCats){
    const cats = [];
    for(let i=0; i<totalCats; i++) {
        cats.push(createCatObject());
    }
    return cats;
}

class AdminForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAdmin:"hidden",
            inputName:this.props.catObj.catName,
            inputCounter: this.props.catObj.counter,
        }
    }

    
    toggleAdmin = () => {
        this.setState((prevState) => {
            if(prevState.showAdmin === "hidden") {
                return {
                    showAdmin: "visible",
                }
            }
            else {
                return {
                    showAdmin: "hidden"
                }
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            inputName: nextProps.catObj.catName,
            inputCounter: nextProps.catObj.counter,
        })
    }

    handleAdminSave = (element) => {
        element.preventDefault();
        const counter = parseInt(this.refs.catCounter.value, 10);
        const catName = this.refs.catName.value;
        const catObj = createCatObject(catName, counter);
        this.props.handleAdminSave(catObj);
    }

    handleNameChange = (element)=> {
        this.setState({
            inputName: element.target.value,
        })
    }

    handleCounterChange = (element) => {
        this.setState({
            inputCounter: element.target.value,
        })
    }

    render() {
        const catObj = this.props.catObj;
        return (
            <div>
                <button type="button" onClick={this.toggleAdmin} > Admin </button>
                <form id="adminForm" style={{visibility: this.state.showAdmin}} onSubmit={this.handleAdminSave} >
                    <p> Cat Name <input id={`cat-name-input`} ref={`catName`} onChange={this.handleNameChange} value={this.state.inputName} /></p>
                    <p> Cat Counter <input id={`cat-counter-input`} ref={`catCounter`} type={`number`} onChange={this.handleCounterChange} value={this.state.inputCounter} /></p>
                    <button type="button" onClick={this.toggleAdmin} >Cancel</button>
                    <button type="submit">Save</button>
                </form>
            </div>
        )
    }

}

function CatComponent(props) {
    
    const catObj = props.catObj;
    return (
        <div id={`cat-display`}>
            <p>{catObj.catName}</p>
            <img src={catObj.url} onClick={props.handleCatClick} id={`image-elem`} />
            <p id={`counter`} > {`Counter:  ${catObj.counter}`} </p>
            <AdminForm catObj={props.catObj} handleAdminSave={props.handleAdminSave} />
        </div>
    );
}

class ListComponent extends React.Component {
    constructor(props){
        super(props);
    }

    handleListClick = (element) =>{
        element.preventDefault();
        const catNum = parseInt(element.target.id, 10);
        this.props.handleListClick(catNum);
    }

    generateList = ()=> {
        return this.props.catList.map((catName, index)=>{
            return <li key={index} >
                <a href={`#`} onClick={this.handleListClick} id={index} >{catName}</a>
            </li>
        });
    }

    render(){
        return (
            <div className={`names-list`} >
                <ul >
                    {this.generateList()}
                </ul>
            </div>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "cats": catsData(4),
            "currentCat": 0,
        };
        this.handleCatClick = this.handleCatClick.bind(this);
        this.handleAdminSave = this.handleAdminSave.bind(this);
        this.handleListClick = this.handleListClick.bind(this);
    }

    handleCatClick() {
        const catList = this.state.cats;
        let counter = catList[this.state.currentCat].counter;
        counter++;
        catList[this.state.currentCat].counter = counter;
        this.setState({
            cats: catList,
        })
    }

    handleAdminSave(catObj) {
        const catList = this.state.cats;
        catList[this.state.currentCat] = catObj;
        this.setState({
            cats: catList,
        })
    }

    handleListClick(catNum) {
        this.setState({
            currentCat: catNum,
        });
    }

    render() {
        const catNamesList = this.state.cats.map((catObj) => catObj.catName);
        return (
            <div className={`container`} id={`page`} >
                <div className={`heading`} >
                    <h1><u>Cat Clicker</u>
                    </h1>
                </div>
                <CatComponent catObj={this.state.cats[this.state.currentCat]} handleAdminSave={this.handleAdminSave} handleCatClick={this.handleCatClick} />
                <ListComponent catList={catNamesList} handleListClick={this.handleListClick} />  
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));