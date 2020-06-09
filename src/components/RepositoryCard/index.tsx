import React from "react";
import {CardElementType} from "../../types";

type Props = {
    value: CardElementType,
}

const RepositoryCard: React.FC<Props> = ({value: dataCard}) => {
    return (
        <div className={'repository-card'}>
            <img src={dataCard.owner.avatar_url} alt="Owner"/>
            <p>
                <b>Название репозитория: </b>
                {dataCard.nameRepository}
            </p>
            <p>
                <b>Дата последнего коммита: </b>
                {dataCard.endDateCommit}
            </p>
            <p>
                <b>Nickname владельца репозитория с ссылкой на него: </b>
                <a href={dataCard.owner.html_url}>{dataCard.owner.login}</a>
            </p>
            <p>
                <b>Список используемых языков в репозитории: </b>
                {dataCard.language}
            </p>
            <p>
                <b>Краткое описание репозитория: </b>
                {dataCard.description}
            </p>
            <div>
                <b>10 наиболее активных контрибьютеров:</b>
                <ul>
                    {dataCard.contributors.map(
                        item => <li key={item.login}>
                            <a
                                target={'_blank'}
                                rel="noopener noreferrer"
                                href={item.html_url}
                            >
                                {item.login}
                            </a>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
};

export default RepositoryCard;