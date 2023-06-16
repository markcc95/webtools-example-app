import React, {useState, useRef, ChangeEventHandler} from 'react';
import classNames from "classnames";
import debounce from 'lodash/debounce';

interface SearchInputProps {
    id: string;
    name?: string;
    value?: string;
    className?: string;
    handleChange: Function;
}

const SearchInput = (
    {name, id, value, className = '', handleChange}
        :
        SearchInputProps
) => {
    const [searchText, setSearchText] = useState("");

    const inputClass = classNames({
        'bg-gray-50 border border-gray-300 text-gray-900 text-sm outline-none rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500': true,
        [`${className}`]: true
    });

    const resetSearchText = () => {
        setSearchText("");
        handleChange("");
    };

    const debounceRef = useRef(debounce((val) => handleChange(val), 350));
    const onChange = (inputValue:string) => {
        setSearchText(inputValue);
        debounceRef.current(inputValue);
    }

    return (
        <div className="my-4 flex">
            <input
                name={name}
                id={id}
                value={searchText}
                className={inputClass}
                placeholder="Search"
                onChange={(e) => onChange(e.target.value)}
            />
            <button className="ml-4 text-gray-500 hover:text-gray-700 focus:text-indigo-500 text-sm" type="button" onClick={() => resetSearchText()}>Reset</button>
        </div>
    );
};

export default SearchInput;
