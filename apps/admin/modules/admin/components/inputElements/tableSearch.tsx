import type { NextPage } from 'next';
import styled from 'styled-components';
import { InputField, InputPath, SearchIcon } from 'libs/table/src/lib/tableStyles';

interface SubHeaderProps {
    value: string;
    placeholder?: string;
    onChange: (e: any)=>void;
}

const TableSearch: NextPage<SubHeaderProps> = ({
    value,
    placeholder,
    onChange,
}) => {
    return (
        <InputField>
            <SearchIcon className="Search">
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 13 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                    d="M5.75957 0C8.93886 0 11.5191 2.58029 11.5191 5.75957C11.5191 8.93886 8.93886 11.5191 5.75957 11.5191C2.58029 11.5191 0 8.93886 0 5.75957C0 2.58029 2.58029 0 5.75957 0ZM5.75957 10.2392C8.23427 10.2392 10.2392 8.23427 10.2392 5.75957C10.2392 3.28424 8.23427 1.27991 5.75957 1.27991C3.28424 1.27991 1.27991 3.28424 1.27991 5.75957C1.27991 8.23427 3.28424 10.2392 5.75957 10.2392ZM11.1896 10.2847L13 12.0945L12.0945 13L10.2847 11.1896L11.1896 10.2847Z"
                    fill="#858181"
                    />
                </svg>
            </SearchIcon>
            <InputPath value={value} onChange={onChange} placeholder={placeholder || 'Search'} type="text" />
        </InputField>
    );
};

export default TableSearch;
