import React from 'react';
import './App.css';
import RepositoriesPage from "./pages/RepositoriesPage";
import Header from './components/Header';
import { Switch, Route } from 'react-router-dom';
import RepositoryCardPage from "./pages/RepositoryCardPage";

function App() {
    return (
        <>
            <Header/>
            <div>
                <Switch>
                    <Route exact path={'/repositories'}>
                        <RepositoriesPage/>
                    </Route>
                    <Route  path={'/repositories/:id'}>
                        <RepositoryCardPage/>
                    </Route>
                </Switch>
            </div>
        </>
    )
}

export default App;
