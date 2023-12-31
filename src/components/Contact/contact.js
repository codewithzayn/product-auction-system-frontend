import Footer from "../footer/footer";
const Contact = () => {
    return (
        <>
            <div class="container z-depth-1 my-5 px-0">

                    
                <section class="my-md-5 bg-dark" >

                    <div class="rgba-black-strong rounded p-5">

                        <h3 class="text-center font-weight-bold text-white mt-3 mb-5">Contact Us</h3>

                        <form class="mx-md-5" action="">

                            <div class="row">
                                <div class="col-md-6 mb-4">

                                    <div class="card">
                                        <div class="card-body px-4">

                                            <div class="md-form md-outline mt-0">
                                                <label for="name">Your Name</label>
                                                <input type="text" id="name" class="form-control"/>
                                            </div>
                                            <div class="md-form md-outline">
                                                <label for="email">Your Email Address</label>
                                                <input type="text" id="email" class="form-control"/>
                                            </div>
                                            <div class="md-form md-outline">
                                                <label for="message">Your Message</label>
                                                <textarea id="message" class="md-textarea form-control" rows="3"></textarea>
                                            </div>
                                            <br/>
                                            <br/>
                                            <button type="submit" class="btn btn-primary btn-md btn-block ml-0 mb-0">Submit inquiry</button>

                                        </div>
                                    </div>

                                </div>
                                <div class="col-md-5 offset-md-1 mt-md-4 mb-4 text-white">

                                    <h5 class="font-weight-bold">Address</h5>
                                    <p class="mb-0">1632 Main Street</p>
                                    <p class="mb-0">Lahore, 94126</p>
                                    <p class="mb-4 pb-2">Pakistan</p>

                                    <h5 class="font-weight-bold">Phone</h5>
                                    <p class="mb-4 pb-2">+ 01 234 567 89</p>

                                    <h5 class="font-weight-bold">Email</h5>
                                    <p>info@gmail.com</p>

                                </div>
                            </div>

                        </form>
                      <hr className="bg-white"/>
                    </div>
                  <Footer/>
                </section>


            </div>
        </>
    )
}
export default Contact;