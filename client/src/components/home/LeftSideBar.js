import React from 'react';
import { useSelector } from "react-redux"
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

const LeftSidebar = () => {
    const { auth } = useSelector(state => state)
    return (
        <div className='left_side_bar col-md-3'>
            <CDBSidebar textColor="#333" backgroundColor="#fff">
                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu textColor="#333">
                        <NavLink exact to="/" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="columns">Newfeeds</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/message" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="comment">Chat</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to={`/profile/${auth.user._id}`} activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="user">Profile page</CDBSidebarMenuItem>
                        </NavLink>
                        {/* <NavLink exact to="/" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="chart-line">Analytics</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="users">Groups</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="bell">Notifications</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="cogs">Settings</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="question-circle">Help</CDBSidebarMenuItem>
                        </NavLink> */}
                    </CDBSidebarMenu>
                </CDBSidebarContent>
            </CDBSidebar>
        </div>
    );
};

export default LeftSidebar;
