import React from 'react';
import { useSelector } from "react-redux"
import {
    CDBSidebar,
    CDBSidebarHeader,
    CDBSidebarContent,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

const LeftSidebar = () => {
    const { auth } = useSelector(state => state)
    return (
        <div className='left_side col-md-3' style={{ display: 'flex', height: '100vh', overflow: 'scroll initial', position: 'fixed' }}>
            <CDBSidebar textColor="#333" backgroundColor="#fff">
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                    <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
                        ResearchHUB
                    </a>
                </CDBSidebarHeader>
                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu textColor="#333">
                        <NavLink exact to="/" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="columns">Newfeeds</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/tables" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="table">Tables</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to={`/profile/${auth.user._id}`} activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="user">Profile page</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/analytics" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="chart-line">Analytics</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/groups" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="users">Groups</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/notifications" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="bell">Notifications</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/settings" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="cogs">Settings</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/help" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="question-circle">Help</CDBSidebarMenuItem>
                        </NavLink>
                    </CDBSidebarMenu>
                </CDBSidebarContent>
            </CDBSidebar>
        </div>
    );
};

export default LeftSidebar;
