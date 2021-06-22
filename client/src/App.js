import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import GeneralContext from "./store/Context";
// import { myContext } from "./store/Context";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import Page404 from "./pages/404/Page404";

function App() {
  // const {userData} = useContext(myContext);
  // const { loading } = userData;
  return (
    <Router>
      <GeneralContext>
        <div className="App">
          <Switch>
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute path="/dashboard" component={Dashboard} />
            <Route component={Page404} />
          </Switch>
        </div>
      </GeneralContext>
    </Router>
  );
}

export default App;
