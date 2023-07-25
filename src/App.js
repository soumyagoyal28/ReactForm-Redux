
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Assignment1 from './Assignment3/Component/Assignment1';
import Assignment2 from './Assignment3/Component/Assignment2';
import HomePage from './Assignment3/Component/HomePage';
import Error from './Assignment3/Component/Error';
import NavBar from './Assignment3/NavBar';
import Assignment3 from './Assignment3/Component/Assignment3'
import { Provider } from 'react-redux';
import Store from './Assignment4/Store';
import Table from './Assignment4/Table';
import Form from './Assignment4/Form';

function App() {
  return (
    <Provider store={Store}>
    <div className="App">
      <NavBar/>
      <Routes>
        <Route exact path='/' element ={<HomePage/>} />
        <Route path='/assignment1' element = {<Assignment1/>}/>
        <Route path='/assignment2' element = {<Assignment2/>}/>
        <Route path='/assignment3' element = {<Assignment3/>}/>
        <Route path='/*' element = {<Error/>}/>
        <Route path='/table' element = {<Table/>}/>
        <Route path='/form' element = {<Form/>}/>
        </Routes>
    </div>
    </Provider>
  );
}

export default App;
