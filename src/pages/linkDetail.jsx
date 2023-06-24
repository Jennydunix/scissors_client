import  {useState} from 'react'
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { json, useLoaderData, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";

import "./linkDetail.scss"
const LinkDetails = () => {
	const data = useLoaderData();
	const navigate = useNavigate()
	const [loadingDelete, setLoadingDelete] = useState(false)
	
	const copyContent = async () => {
		try {
			const text = `https://siss.onrender.com/${data.shortId}`;
			await navigator.clipboard.writeText(text);
			alert('copied')
			console.log("Content copied to clipboard");
		} catch (err) {
			console.error("Failed to copy: ", err);
		}
	};

	const deleteLink = async (id) =>{
		try{
			setLoadingDelete(true)
			let response = await axios.delete(`https://api-scissors.onrender.com/links/deleteLink/${id}`, {
				withCredentials: true
			})
			let data = await response.data
			setLoadingDelete(false)
			navigate('/dashboard')
			return data
		}
		catch(err){
			setLoadingDelete(false)
			console.log(err)
		}
	}
	return (
		<div data-testid={`detail-${data._id}`}>
			<Helmet>
				<title>Link Detail</title>
			</Helmet>
			<div className="container">
				<div className="lbox">
					<p onClick={()=>navigate("/dashboard")}>Back</p>
					<h2>Title: {data.title}</h2>
					<p> Description :{data.desc}</p>
					<p>Number of visits :{data.no_of_visits}</p>
					<span>
						<p>
							Custom Link : https://siss.onrender.com/{data.shortId}
						</p>
						<button onClick={copyContent}> Copy to clipboard</button>
					</span>
					<p>Long Url : {data.longUrl}</p>
				</div>
			</div>
			
			{(data && Object.keys(data).length > 0) && <div style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%", marginTop:"24px" }}>
				<QRCode
				size={256}
				style={{ height: "auto", maxWidth: "100%", width: "100%" }}
				value={`https://siss.onrender.com/${data.shortId}`}
				viewBox={`0 0 256 256`}
				/>
			</div>}

			<div style={{marginTop:"12px"}}>
				<button disabled={loadingDelete} onClick={()=>deleteLink(data._id)}>
					{loadingDelete ? 'Deleting' : "Delete Link"}
				</button>
			</div>
		</div>
	);
};

export default LinkDetails;

export const loader = async ({ params }) => {
	try {
		const { data } = await axios(
			"https://api-scissors.onrender.com/links/detail/" + params.id,
			{
				withCredentials: true,
			}
		);
		return data;
	} catch (error) {
		throw json(
			{
				msg: "Can't find link.",
			},
			{ status: 401 }
		);
	}
};
