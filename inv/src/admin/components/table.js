import React from 'react';
import DataTable from 'react-data-table-component';


const data = [
    {
       name:'',
       type:'',
       calories:'500',
       fat:'',
       carbs:'',
       protien:'',
       sodium:'',
       calcium:'',
       iron:''
    },
    {
        name:'',
        type:'',
        calories:'100',
        fat:'',
        carbs:'',
        protien:'',
        sodium:'',
        calcium:'',
        iron:''
     },{
        name:'',
        type:'',
        calories:'0',
        fat:'',
        carbs:'',
        protien:'',
        sodium:'',
        calcium:'',
        iron:''
     },{
        name:'',
        type:'',
        calories:'50',
        fat:'',
        carbs:'',
        protien:'',
        sodium:'',
        calcium:'',
        iron:''
     },{
        name:'',
        type:'',
        calories:'400',
        fat:'',
        carbs:'',
        protien:'',
        sodium:'',
        calcium:'',
        iron:''
     }
    ]

const columns = [
	{
		name: 'Name',
		selector: row => row.name,
		sortable: true,
	},
	{
		name: 'Type',
		selector: row => row.type,
		sortable: true,
	},
	{
		name: 'Calories (g)',
		selector: row => row.calories,
		sortable: true,
		right: true,
	},
	{
		name: 'Fat (g)',
		selector: row => row.fat,
		sortable: true,
		right: true,
	},
	{
		name: 'Carbs (g)',
		selector: row => row.carbs,
		sortable: true,
		right: true,
	},
	{
		name: 'Protein (g)',
		selector: row => row.protien,
		sortable: true,
		right: true,
	},
	{
		name: 'Sodium (mg)',
		selector: row => row.sodium,
		sortable: true,
		right: true,
	},
	{
		name: 'Calcium (%)',
		selector: row => row.calcium,
		sortable: true,
		right: true,
	},
	{
		name: 'Iron (%)',
		selector: row => row.iron,
		sortable: true,
		right: true,
	},
];

const conditionalRowStyles = [
	{
		when: row => row.calories < 300,
		style: {
			backgroundColor: 'rgba(63, 195, 128, 0.9)',
			color: 'white',
			'&:hover': {
				cursor: 'pointer',
			},
		},
	},
	{
		when: row => row.calories >= 300 && row.calories < 400,
		style: {
			backgroundColor: 'rgba(248, 148, 6, 0.9)',
			color: 'white',
			'&:hover': {
				cursor: 'pointer',
			},
		},
	},
	{
		when: row => row.calories >= 400,
		style: {
			backgroundColor: 'rgba(242, 38, 19, 0.9)',
			color: 'white',
			'&:hover': {
				cursor: 'not-allowed',
			},
		},
	},
];

export const Rows = () => (
	<DataTable
		columns={columns}
		data={data}
		conditionalRowStyles={conditionalRowStyles}
	/>
);

export default {
	title: 'Conditional Rows/Rows',
	Test: Rows,
};