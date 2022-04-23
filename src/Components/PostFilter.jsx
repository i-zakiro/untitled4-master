import React from 'react';
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";

const PostFilter = ({filter, setFilter}) => {
    return (
        <div>
            <MyInput
                value={filter.query}
                onChange={e => setFilter({...filter, query: e.target.value})}
                placeholder='search...'
            />
            <MySelect
                value={filter.sort}
                onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                defaultValue='SORT BY...'
                options={[
                    {value: 'title', name: 'BY TITLE'},
                    {value: 'body', name: 'BY BODY'},
                ]}
            />
        </div>
    );
};

export default PostFilter;