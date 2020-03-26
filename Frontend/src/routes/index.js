import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';

import Authors from '../screens/Authors';
import Books from '../screens/Books';
import Dashboard from '../screens/Dashboard';
import Genders from '../screens/Genders';
import Loans from '../screens/Loans';
import Publishers from '../screens/Publishers';
import Users from '../screens/Users';

import EditAuthors from '../screens/EditAuthors';
import EditPublishers from '../screens/EditPublishers';
import EditGenders from '../screens/EditGenders';

import NewAuthors from '../screens/NewAuthors';
import NewPublishers from '../screens/NewPublishers';
import NewGenders from '../screens/NewGenders';
import NewBooks from '../screens/NewBooks';
import EditBooks from '../screens/EditBooks';
import ShowBook from '../screens/ShowBook';

export default function Routes() {
    return (
        <Switch>
            <Route path='/' exact component={SignIn}/>

            <Route path='/register' exact component={SignUp} isPrivate/>
            <Route path='/authors' exact component={Authors} isPrivate/>
            <Route path='/books' exact component={Books} isPrivate/>
            <Route path='/dashboard' exact component={Dashboard} isPrivate/>
            <Route path='/genders' exact component={Genders} isPrivate/>
            <Route path='/loans' exact component={Loans} isPrivate/>
            <Route path='/publishers' exact component={Publishers} isPrivate/>
            <Route path='/users' exact component={Users} isPrivate/>

            <Route path='/authors/edit' exact component={EditAuthors} isPrivate/>
            <Route path='/books/edit' exact component={EditBooks} isPrivate/>
            <Route path='/genders/edit' exact component={EditGenders} isPrivate/>
            <Route path='/publishers/edit' exact component={EditPublishers} isPrivate/>

            <Route path='/books/new' exact component={NewBooks} isPrivate/>
            <Route path='/authors/new' exact component={NewAuthors} isPrivate/>
            <Route path='/books/new' exact component={Books} isPrivate/>
            <Route path='/genders/new' exact component={NewGenders} isPrivate/>
            <Route path='/publishers/new' exact component={NewPublishers} isPrivate/>

            <Route path='/books/show' exact component={ShowBook} isPrivate/>
        </Switch>
    );
}