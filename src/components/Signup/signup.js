import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import "./signup.css";
import img from "../../images/bid.jpg";
import { SocialIcon } from "react-social-icons";
import axios from "axios"
import setAuthToken from "../../utils/setAuthToken";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate()
	const [confirmPassword, setConfirmPassword] = useState('');
	const [token, setToken] = useState('')

	const submit = (e) => {
		e.preventDefault();
		console.log(name)
		console.log(email)
		console.log(password)
		console.log(confirmPassword)
		const obj = {
			name: name,
			email: email,
			password: password,
			confirmPassword: confirmPassword
		}
		axios.post('http://localhost:1337/user/sign-up', obj)
			.then(response => {
				console.log("response", response)
				if (response.data.token) {
					var token = response.data.token;
					console.log("token axios", token);
					setAuthToken(token);
					setToken(token)
					localStorage.setItem("jwtToken", token);
					navigate('/')
				}
			})
			.catch(error => {
				toast.error(error.response.data.message)
			});
	}
	return (
		<>
			<div className="container my-auto">
				<div className="row">
					<div className="order-2 order-md-1 col-12 col-md-6">
						<div className="card my-5 border-0">
							<div className="mx-4 my-5">
								<div style={{ float: "left" }}>
									<h1 style={{ marginBottom: "20px" }}>Sign up</h1>
								</div>
								<ToastContainer />
								<div className="login-form">
									<form className="login-form__group" onSubmit={submit}>
										<div className="input-icons">
											<i className="fa fa-user icon"></i>
											<input
												name="name"
												type="text"
												className="input-field"
												value={name}
												onChange={(e) => setName(e.target.value)}
												placeholder="Full name"
											/>
										</div>
										<div className="input-icons">
											<i className="fa fa-envelope icon"></i>
											<input
												name="email"
												type="email"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												className="input-field"
												placeholder="Email"
											/>
										</div>
										<div className="input-icons">
											<i className="fa fa-lock icon"></i>
											<input
												name="password"
												type="password"
												value={password}
												onChange={(e) => setPassword(e.target.value)}
												className="input-field"
												placeholder="Password"
											/>
										</div>
										<div className="input-icons">
											<i className="fa fa-lock icon"></i>
											<input
												name="confirmpass"
												type="password"
												value={confirmPassword}
												onChange={(e) => setConfirmPassword(e.target.value)}
												className="input-field"
												placeholder="Confirm Password"
											/>
										</div>

										<br />

										<div className="text-center mt-4 mb-3">
											<input
												type="submit"
												style={{ "backgroundColor": " #000", width: "245px", height: "48px", borderRadius: "25px", border: "none" }}
												className="btn btn-primary"
												value="Register"
											/>
										</div>
									</form>
									<br />
									{/* <div className="col-12 mb-5 text-center">
										<button className="btn btn-primary mb-2 mt-3" style={{ "backgroundColor": " #dd4b39", width: "245px", height: "48px" }}
											type="submit"
										>
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google me-2" viewBox="0 0 16 16">
												<path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
											</svg>
											Continue with Google
										</button>
										<br></br>
										<button className="btn  btn-primary"
											style={{ "backgroundColor": " #3b5998", width: "245px", height: "48px" }}
											type="submit"
										>
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook me-2" viewBox="0 0 16 16">
												<path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
											</svg>
											Continue with Facebook
										</button>
									</div> */}
								</div>
								<br />
								<div className="d-flex justify-content-end mr-2">
									<h6>Already a member?</h6>
									<a
										className="ms-2 h6"
										style={{ textDecoration: "none", color: "black" }}
										to="/login"
									>
										<Link className="signUpLink" to="/login">
											<i style={{color:"#0bc096"}}>
												<u>Login</u>
											</i>
										</Link>
									</a>
								</div>
							</div>
						</div>
					</div>

					<div className="order-1 order-md-2  col-md-6 text-center my-5">
						<div className="card">

							<img src={img} style={{borderRadius:"15px", border:"none"}} className="imgg-fluid " alt="signupp" />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SignUp;
