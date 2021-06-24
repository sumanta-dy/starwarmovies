import React from "react";
import { HashRouter } from "react-router-dom";
import 'antd/dist/antd.css';
import Router from './Router';

function App() {
    return (
        <div>
            <HashRouter>
                <Router />
            </HashRouter>
        </div>
    );
}

export default App;
