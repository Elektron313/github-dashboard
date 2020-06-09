import React, {useCallback, useEffect} from "react";
import {useSelector} from "react-redux";
import {AppStateType, useAppDispatch} from "../../redux/store";
import CustomInput from "../../components/CustomInput";
import {DataForRepositoriesPage} from "../../types";
import {requestRepositories} from "../../redux/repositoriesReducer";
import {debounce} from "lodash";
import Paginator from "../../components/Paginator";
import Repository from "../../components/Repository";
import {useStickyState} from "../../utils";

const RepositoriesPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const [valueSearch, editSearch] = useStickyState('', 'search-line--input');
    const [currentPage, changeCurrentPage] = useStickyState(1, 'current-page-pagination');
    const {list, pageSize, totalCount} =
        useSelector<AppStateType, DataForRepositoriesPage>(({ repositoriesReducer }) => repositoriesReducer);
    const debouncedRequestRepositories = useCallback(
        debounce((value: string) => dispatch(requestRepositories(value)), 500),
        []
    );

    const onChangeSearch = (value: string) => {
        editSearch(value);
        debouncedRequestRepositories(value);
    };

    useEffect(() => {
        dispatch(requestRepositories(valueSearch, currentPage))
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, []);

    const onChangePage = useCallback((currentPage: number) => {
        changeCurrentPage(currentPage);
        dispatch(requestRepositories(valueSearch, currentPage));
    }, [valueSearch, dispatch, changeCurrentPage]);

    return (
        <div>
            <CustomInput
                value={valueSearch}
                onChange={onChangeSearch}
            />
            <div className={'repositories-wrapper'}>
                <Paginator
                    totalItemsCount={totalCount}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChanged={onChangePage}
                />
                <ul className="repository-list">
                    {
                        list.map(repo => <Repository key={repo.id} value={repo} />)
                    }
                </ul>
            </div>
        </div>
    )
};

export default RepositoriesPage;