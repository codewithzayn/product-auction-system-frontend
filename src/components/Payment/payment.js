import React from 'react';
import './PaymentPage.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Stripe from "react-stripe-checkout"
const PaymentPage = () => {
    const naviagte = useNavigate()
    const { highestBiddingPrice } = useParams()
    const { id } = useParams()
    console.log('highestBiddingPrice..', highestBiddingPrice)
    localStorage.setItem('paymentId', id)
    console.log('id..', id)
    const handleToken = (token) => {
        console.log('token.id', token.id)

        axios.post("https://product-auction-system.onrender.com/product/stripe/pay", {
            token: token.id,
            amount: highestBiddingPrice,
            paymentId: id
        }).then((response) => {
            console.log("response get-stripe-pay", response);
            const data = response.data;
            console.log('data stripe pay', data)
            naviagte('/profile')
        })
            .catch((error) => {
                console.error("There was an error!", error);
            });
    };
    return (
        <div className='d-flex justify-content-center pt-5'>

            <Stripe
                stripeKey="pk_test_51N5Xu5CzvYhWZpaqLev0x6zQozjgzF2nLfDyoFPFWXsEh8RJtOMV3pC1tDzjgP24Zk29J5GRD8DWWaefbBsVHOwV00EXbxvPTd"
                token={handleToken}
                amount={highestBiddingPrice}
            />
        </div>
    );

};

export default PaymentPage;
