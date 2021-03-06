import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './styles';
import SidedBar from '../../../components/SideBar';
import NotificationsBar from '../../../components/NotificationsBar';

export default function DefaultLayout({ children }) {
    return (
        <Wrapper>
            <SidedBar />
            {children}
            <NotificationsBar />
        </Wrapper>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.element.isRequired
};