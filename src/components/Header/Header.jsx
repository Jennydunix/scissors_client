import "./Header.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
const Header = () => {
	const ctx = useContext(AuthContext);
	const navigate = useNavigate();

	const handlelogout = async () => {
		try {
			await axios.post("https://api-scissors.onrender.com/auth/logout", {
				withCredentials: true,
			});
			ctx.logout();
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	const toggleNavBar = () =>{
		let navBar = document.querySelector(".nav-links")
		navBar.classList.toggle("show")
	}

	return (
		<header>
			<div className="container">
				<nav>
					<Link className="logo" to={ctx.user ? "/dashboard" : "/"}>
						<img src="/Vector.svg" alt="" />
						<h2>|SCISSOR</h2>
					</Link>
					<div className="nav-links">
						{!ctx.user && (
							<>
								<ul>
									<li onClick={toggleNavBar} className="active">MY URLs</li>
									<li onClick={toggleNavBar}>
										<a href="#about">
											Features
										</a>
									</li>
									<li onClick={toggleNavBar}>
										<a href="#pricing">
											Pricing
										</a>
									</li>
									<li onClick={toggleNavBar}>
										<a href="#analytics">
											Analytics
										</a>
									</li>
									<li onClick={toggleNavBar}>
										<a href="#faq">
											FAQ&apos;s
										</a>
									</li>
								</ul>

								<ul>
									<li onClick={toggleNavBar}>
									<Link to={"/auth/login"}>Log in</Link>
									</li>
									<li onClick={toggleNavBar}>
										<Link to={"/auth/signup"} className="action">
											Try for free
										</Link>
									</li>
								</ul>
							</>
						)}
						{ctx.user && (
							<div className="cuurentUserDetail">
								<p>{ctx.user.username}</p>
								<Link to="/new">New Link</Link>
								<button className="logout" onClick={handlelogout}>
									Logout
								</button>
							</div>
						)}
					</div>

					<div onClick={toggleNavBar} className="burger">
						<div className="line"></div>
						<div className="line"></div>
						<div className="line"></div>
					</div>
				</nav>
			</div>
		</header>
	);
};

export default Header;
