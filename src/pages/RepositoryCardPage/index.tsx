import React, {useCallback, useEffect, useState} from "react";
import {RepositoriesAPI} from "../../api/api";
import {setCurrentItemList} from "../../redux/repositoriesReducer";
import {useAppDispatch, AppStateType} from "../../redux/store";
import {useParams} from "react-router-dom";
import RepositoryCard from "../../components/RepositoryCard";
import {useSelector} from "react-redux";
import {CurrentCardElement} from "../../types";

const RepositoryCardPage: React.FC = () => {
    const [isLoading, setLoading] = useState(true);
    const {id} = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const dataRepository = useSelector<AppStateType, CurrentCardElement>((state) => state.repositoriesReducer.currentItemList);

    const requestRepositoryCard = useCallback(async () => {
        try {
            const {
                name: nameRepository,
                pushed_at: endDateCommit,
                owner,
                stargazers_count,
                html_url,
                description,
                language,
                contributors_url,
            } = await RepositoriesAPI.getRepository(id);

            const contributors = await RepositoriesAPI.getContributors(contributors_url);
            const dataForCard: CurrentCardElement = {
                nameRepository,
                endDateCommit,
                stargazers_count,
                html_url,
                description,
                language,
                contributors,
                owner,
            };
            dispatch(setCurrentItemList(dataForCard));
        } catch (err) {
            alert(err);
        } finally {
            setLoading(false);
        }
    }, [dispatch, id]);

    useEffect(() => {
        requestRepositoryCard();
    }, [requestRepositoryCard]);

    return (
        <div>
            {
                isLoading
                    ? 'Loading ...'
                    : dataRepository && <RepositoryCard value={dataRepository}/>
            }
        </div>
    )
};

export default RepositoryCardPage