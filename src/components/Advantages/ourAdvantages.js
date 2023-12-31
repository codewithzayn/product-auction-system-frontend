import React from 'react';
import "./advantage.css"
import servicesData from '../../data/servicesData';
// import SectionsHead from './SectionsHead';


const Services = () => {
    return (
        <>
            <section id="services" className="section">
                <div className="pt-5">

                    {/* <SectionsHead heading="Our Advantages" /> */}
                    <div className="row wrapper services_wrapper" style={{ "background-color": "#0bc096" }}>
                        <div className="d-flex" style={{ display: "flex", margin: "auto", width: "80%" }}>
                            {
                                servicesData.map((item) => {
                                    const { id, icon, title, info } = item;

                                    return (
                                        <div className="col services_card" style={{marginTop: '30px'}} key={id}>
                                            <div className="col services_details d-flex align-items-center justify-content-center" style={{ backgroundColor: "#0bc096", height: "80px" }}>
                                                <div className="col services_icon">{icon}</div>
                                                <div>
                                                    <h4>{title}</h4>
                                                    <p style={{ fontSize: "12px" }}>{info}</p>
                                                </div>
                                            </div>

                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Services;