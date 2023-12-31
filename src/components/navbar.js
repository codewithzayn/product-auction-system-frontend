// import "../style.css";

const Navbar = () => {
	return (
		<div>
			<section>
				<div class="container-fluid">
					<nav
						class="navbar navbar-expand-lg navbar-dark fixed-top h-300px"
						style={{ backgroundColor: "navy" }}
					>
						<div class="container">
							<a
								style={{ color: "white" }}
								className="d-none pink-back"
								class="navbar-brand"
								href="#"
							>
								<b>Bus Ticketing System</b>
							</a>
							<button
								class="navbar-toggler"
								type="button"
								data-bs-toggle="collapse"
								data-bs-target="#navbarText"
								aria-controls="navbarText"
								aria-expanded="false"
								aria-label="Toggle navigation"
							>
								<span class="navbar-toggler-icon"></span>
							</button>

							<div class="collapse navbar-collapse" id="navbarText">
								<ul class="navbar-nav me-auto mb-2 mb-lg-0">
									<li class="nav-item">
										<a
											to="/Aboutus"
											style={{ color: "white" }}
											className="nav-link active"
										>
											About Us
										</a>
									</li>
									<li class="nav-item">
										<a
											to="/Contactus"
											style={{ color: "white" }}
											className="nav-link active"
										>
											Contact Us
										</a>
									</li>
								</ul>
							</div>

							<span class="navbar-text d-flex">
								<a
									to="/login"
									className="btn btn-primary me-3"
									style={{ width: "90px", marginRight: "10px" }}
								>
									Login
								</a>
								<a
									to="/register"
									className="btn btn-primary "
									style={{ width: "90px" }}
								>
									Sign Up
								</a>
							</span>
						</div>
					</nav>
					<br />
					<br />
				</div>
			</section>
		</div>
	);
};
export default Navbar;
