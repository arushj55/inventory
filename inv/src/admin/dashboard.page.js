import { NavLink } from "react-router-dom";
import React from 'react';
import { Chart } from "../admin/components/chart";
export function AdminDashboard() {

    return (
        <>
            <div className="container-fluid">
                <h1 className="mt-4">Dashboard Page</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item">
                        <NavLink to="/dashboard">Dashboard</NavLink>
                    </li>
                    <li className="breadcrumb-item active"></li>
                </ol>

                <div>
                    <Chart/>
                </div>
            </div>
            </>
    );
}