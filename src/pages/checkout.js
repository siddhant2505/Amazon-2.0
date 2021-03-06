import React, { useState } from 'react'
import Header from '../components/Header'
import Image from "next/image"
import { useSelector } from 'react-redux'
import { selectItems, selectQuantities, selectTotal } from '../slices/basketSlice'
import CheckoutProduct from '../components/CheckoutProduct'

import Currency from "react-currency-formatter"
import { useSession } from 'next-auth/client'
import Product from '../components/Product'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
const stripePromise=loadStripe(process.env.stripe_public_key);

function Checkout() {
    const items= useSelector(selectItems);
    const total= useSelector(selectTotal);
    const quantities= useSelector(selectQuantities);

    const [session]=useSession();

    const createCheckoutSession=async ()=>{
        const stripe=await stripePromise;

        //Call the backend to create checkout session
        const checkoutSession=await axios.post('/api/create-checkout-session',
        {
            items:items,
            email:session.user.email,

        })

        //REDIRECT USER TO STRIPE CHECKOUT
            const result=await stripe.redirectToCheckout({
                sessionId: checkoutSession.data.id
            })
            if (result.error) DeviceAcceleration(result.error.message);

    }

    return (
        <div className="bg-gray-100">
            <Header/>
            <main className="lg:flex max-w-screen-2xl mx-auto">
{/* Left hand section */}
            <div  className="flex-grow m-5 shadow-sm">
                <Image src="https://links.papareact.com/ikj" alt="checkoutpic" width={1020} height={250} objectFit="contain"/>
                <div className="flex flex-col p-5 space-y-10 bg-white">
                    <h1 className="text-3xl border-b pb-4">{items.length===0?"Your Shopping Basket is Empty":"Shopping Basket"}</h1>
                    {items.map(({id,title,description,category,image,price,hasPrime,rating,quantity})=>(
        <CheckoutProduct key={id} id={id} title={title} description={description} price={price} category={category} image={image} quantity={quantity} rating={rating} hasPrime={hasPrime}/> 
      ))}
                {/* {items.map((item,i)=>{
                    <CheckoutProduct key={i} id={item.id} title={item.title} rating={item.rating} price={item.price} description={item.description} category={item.category} image={item.image} hasPrime={item.hasPrime}/>
                })} */}
                </div>      
                </div>
{/* Right hand section */}
<div className="flex flex-col bg-white p-10 shadow-md">
    {items.length>0&&(
        <>
        <h2 className="whitespace-nowrap"> Subtotal ({quantities} items):{"  "}
        <span className="font-bold">
            <Currency quantity={total} currency="INR"/>
        </span>
        </h2>
        <button onClick={createCheckoutSession} role="link" disabled={!session} className={`button mt-2 ${!session&& 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}>
            {!session?'Sign in to checkout':"Proceed to Checkout"}
        </button>
        </>
    )}
</div>
            </main>
        </div>
    )
}

export default Checkout
