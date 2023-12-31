import img from "../../images/1.jpg";
import Footer from "../footer/footer";
const About= ()=>{
    return(
        <>
        <div class="jumbotron bg-dark">
				<div class="container text-center text-light">
					<h1>About</h1>
                    <h3>Product Auction System</h3>
					<p>Mission, Vission & Values</p>
				</div>
			</div>
            <br/>
            <h1 className="text-center">Our Team</h1>
            <br/>
            <br/>
			<div className="container">
				<div class="row">
					<div class="col-sm-4">
						<div class="card text-center">
							<div class="card-body">
                                <img src="https://thumbs.dreamstime.com/b/portrait-handsome-smiling-young-man-folded-arms-isolated-gray-background-joyful-cheerful-men-crossed-hands-studio-shot-172868988.jpg" alt="..." class="img-thumbnail"></img>
                                <br/>
                                <br/>
                                <h3 class="card-title">Muhammad Tayyab</h3>
                                <h5>CFO & Founder</h5>
								<p class="card-text">Responsible for business operations, founders focus more on planning and developing a strategic vision.</p>
								<button class="btn btn-large btn-block btn-dark" type="button">Contact</button>
							</div>
						</div>
					</div>
					<div class="col-sm-4">
						<div class="card text-center">
							<div class="card-body">
                                <img src="https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?b=1&k=20&m=1200677760&s=612x612&w=0&h=23iBfzKPZy2iU5n1Fh3DEeLcJXaLmTxNqjwRUKZmgWM=" alt="..." class="img-thumbnail"></img>
                                <br/>
                                <br/>
                                <h3 class="card-title">Muhammad Hamas</h3>
                                <h5>CEO & Founder</h5>
								<p class="card-text">Responsible for business operations, founders focus more on planning and developing a strategic vision.</p>
								<button class="btn btn-large btn-block btn-dark" type="button">Contact</button>
							</div>
						</div>
					</div>
					<div class="col-sm-4">
						<div class="card text-center">
							<div class="card-body">
                                <img src="https://thumbs.dreamstime.com/b/closeup-portrait-handsome-smiling-young-man-cheerful-men-isolated-gray-background-studio-shot-closeup-portrait-handsome-177316985.jpg" alt="..." class="img-thumbnail"></img>
                                <br/>
                                <br/>
                                <h3 class="card-title">Abdul Raheem</h3>
                                <h5>CTO & Founder</h5>
								<p class="card-text">Responsible for business operations, founders focus more on planning and developing a strategic vision.</p>
								<button class="btn btn-large btn-block btn-dark" type="button">Contact</button>
							</div>
						</div>
					</div>

				</div><br />
			</div>
            <Footer/>
        </>
    )
}
export default About;