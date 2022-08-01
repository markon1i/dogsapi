import './App.css';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import LandingPage from './components/Landing';
import Nav from './components/Nav';
import Detail from './components/Detail';
import Form from './components/Form';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={LandingPage} />
      <Route path='/home' component={Nav} />
      <Route exact path='/home' component={Home} />
      <Route exact path='/home/detail/:id' component={Detail} />
      <Route exact path='/home/create' component={Form} />
    </div>
  );
}

export default App;
