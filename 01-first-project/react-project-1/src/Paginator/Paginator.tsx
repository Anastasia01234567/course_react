import React, {useState} from 'react';
import cls from "./Paginator.module.css";
import cn from 'classnames';

type PropsType = {
    totalItemsCount: number
    pageSize: number
    onPageChanged: (pageNumber: number) => void
    currentPage: number
    portionSize?: number
}

let Paginator: React.FC<PropsType> = ({totalItemsCount, pageSize, onPageChanged, currentPage, portionSize = 10}) => {
    let pageCount = Math.ceil((totalItemsCount / pageSize));
    let pages: Array<number> = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }
    let portionCount = Math.ceil(pageCount / portionSize);
    let [portionNumber, setPortionNumber] = useState<number>(1);
    let letPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;
    return (<div>
        {portionNumber > 1 &&
        <button onClick={() => {
            setPortionNumber(portionNumber - 1)
        }}>Prev</button>
        }
        {pages
            .filter(p => p >= letPortionPageNumber && p <= rightPortionPageNumber)
            .map(p => {
                return <span className={cn({[cls.selectedPage]: currentPage === p}, cls.pageNumber)} key={p}
                             onClick={(e) => {
                                 onPageChanged(p)
                             }
                             }> {p}
                </span>
            })}

        {/*<ul className={cls.pagination}>*/}
        {/*{pages.map(p => {*/}
        {/*return (<li><span className={currentPage === p && cls.selectedPage}*/}
        {/*onClick={() => {*/}
        {/*onPageChanged(p);*/}
        {/*}}>{p}</span></li>)*/}
        {/*})}*/}
        {/*</ul>*/}
        {portionCount > portionNumber &&
        <button onClick={() => {
            setPortionNumber(portionNumber + 1)
        }}>Next</button>
        }
    </div>)
};

export default Paginator;