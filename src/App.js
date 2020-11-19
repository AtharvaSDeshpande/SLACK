

import Header from './Header';
import Login from './Login';
import Main from './Main';
import { useStateValue } from './StateProvider';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
function App() {
  const [{user},dispatch] = useStateValue();
  console.log("user",user);
  return (
    <div className="app">
      {(user) ? (
        <div>
          <Header/>
          <Router>
            <Main/>
          </Router>
          
        </div>
        
      ): (<Login/>)
      
    }
    </div>
  );
}

export default App;
