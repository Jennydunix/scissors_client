import React from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { Navigate, json, useNavigate } from "react-router-dom";
import { useLoaderData, Link } from "react-router-dom";
import "./dashboard.scss";

export const LinkComp = ({link, onClick}) =>{
	return (
		<div
			onClick={onClick}
			className="card"
			key={link._id}
			data-testid={`link-${link._id}`}
		>
			<h3>{link.title}</h3>
			<p>{link.desc}</p>
		</div>
	)
}

const Dashboard = () => {
	const data = useLoaderData();
	const navigate = useNavigate()

	const navigateToDetails = (id) =>{
		navigate(`/dashboard/${id}`)
	}

	return (
		<>
			<Helmet>
				<title>Dashboard</title>
			</Helmet>
			<div className="container">
				{data.length === 0 ? (
					<p className="etext">You have not created a link yet</p>
				) : (
					<div className="linkLists">
						{data.map(link=>{
							return <LinkComp onClick={()=>navigateToDetails(link._id)} link={link}/>
						})}
					</div>
				)
				}
			</div>
		</>
	);
};

export default Dashboard;

export const loader = async () => {
	try {
		const { data } = await axios.get("https://api-scissors.onrender.com/links", {
			withCredentials: true,
		});
		return data;
	} catch (error) {
		throw json(
			{
				msg: "something happened.",
			},
			{ status: 401 }
		);
	}
};
