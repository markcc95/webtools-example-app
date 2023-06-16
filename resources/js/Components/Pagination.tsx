import React, {MouseEventHandler} from 'react';
import classNames from "classnames";

interface PaginationProps {
    isDisabledPrevBtn: boolean;
    isDisabledNextBtn: boolean;
    handlePrevBtnClick: MouseEventHandler;
    handleNextBtnClick: MouseEventHandler;
}

const Pagination = ({ 
    isDisabledPrevBtn, 
    isDisabledNextBtn, 
    handlePrevBtnClick, 
    handleNextBtnClick 
} : PaginationProps) => {

    const prevBtnClass = classNames({
        'px-3 py-2 ml-0 leading-tight bg-white border border-gray-300 rounded-l-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white': true,
        'text-blue-500 hover:bg-gray-100 hover:text-blue-500': !isDisabledPrevBtn,
        'bg-gray-200 text-gray-700 cursor-default': isDisabledPrevBtn
    });

    const nextBtnClass = classNames({
        '-ml-1 px-3 py-2 ml--1 leading-tight bg-white border border-gray-300 rounded-r-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white': true,
        'text-blue-500 hover:bg-gray-100 hover:text-blue-500': !isDisabledNextBtn,
        'bg-gray-200 text-gray-700 cursor-default': isDisabledNextBtn
    });

    return (
        <div className="my-4 sm:px-6 lg:px-8">
            <button className={prevBtnClass} onClick={(e) => handlePrevBtnClick(e)} disabled={isDisabledPrevBtn}>Prev</button>
            <button className={nextBtnClass} onClick={(e) => handleNextBtnClick(e)} disabled={isDisabledNextBtn}>Next</button>
        </div>
    );
};

export default Pagination;
