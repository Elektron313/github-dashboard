import React from "react";
import {NavLink} from "react-router-dom";
import {SearchRepositories} from "../../types/github";

type PropsType = {
    value: SearchRepositories.IRepository
}

const Repository: React.FC<PropsType> = (
    {
        value: {
            name,
            stargazers_count,
            pushed_at: endDateCommit,
            owner: {
                html_url: urlGitHub
            },
            id
        }
    }
) => {
    return (
        <li className="repository-item">
            <p>
                <b>Название репозитория: </b>
                <NavLink to={`/repositories/${id}`} className={'link-repository'}>{name}</NavLink>
            </p>
            <p>
                <b>Кол-во звёзд на github: </b>
                {stargazers_count}
            </p>
            <p>
                <b>Дата последнего коммита: </b>
                {new Date(endDateCommit).toLocaleString()}
            </p>
            <p>
                <b>Ссылка на гитхаб: </b>
                <a target={'_blank'} rel="noopener noreferrer" href={urlGitHub}>{urlGitHub}</a>
            </p>
        </li>
    )
};

export default Repository;