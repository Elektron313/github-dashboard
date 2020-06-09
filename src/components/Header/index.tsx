import React from "react";
import {NavLink} from "react-router-dom";

const Header: React.FC = () => {
    return (
        <div>
            <NavLink className={'link-header'} to={'/repositories'} activeClassName={'active'}>Поиск репозитория</NavLink>
        </div>
    )
};

export default Header