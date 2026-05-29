import Home from './routes/Home';
import Gallery from './routes/Gallery';
import Fleet from './routes/Fleet';
import Specifications from './routes/Specifications';
import TechResources from './routes/TechResources';
import History from './routes/History';
import {Route} from 'react-router-dom';
import Menu from "./components/Menu";
import {Component} from "react";

export default class App extends Component<any, any> {
    render() {
        return (
            <div>
                <Menu/>
                <Route exact={true} path={"/"} component={Home}/>
                <Route exact={true} path={"/fleet"} component={Fleet}/>
                <Route exact={true} path={"/gallery"} component={Gallery}/>
                <Route exact={true} path={"/specs"} component={Specifications}/>
                <Route exact={true} path={"/resources"} component={TechResources}/>
                {/*Forum */}
                <Route exact={true} path={"/history"} component={History}/>

                <Route exact={true} path={"/index.html"} component={Home}/>
                <Route exact={true} path={"/fleet.htm"} component={Fleet}/>
                <Route exact={true} path={"/T37Gal.html"} component={Gallery}/>
                <Route exact={true} path={"/page7.html"} component={Specifications}/>
                <Route exact={true} path={"/techresource.html"} component={TechResources}/>
                <Route exact={true} path={"/history.html"} component={History}/>

            </div>
        );
    }
}
