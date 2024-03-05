'use client';
import Select from 'react-select';
import React from 'react';

const Select2 = () => {
    const options3 = [
        {value: 'orange', label: 'Orange'},
        {value: 'white', label: 'White'},
        {value: 'purple', label: 'Purple'},
    ];

    return (
        <div className="mb-5">
            <Select placeholder="Choose..." options={options3} isSearchable={false}/>
        </div>
    );
};

export default Select2;
