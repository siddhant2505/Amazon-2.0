import React from 'react'
import Image from "next/image"
import { StarIcon } from '@heroicons/react/solid'
import Currency from "react-currency-formatter"
import { removeFromBasket } from '../slices/basketSlice';
import { useDispatch } from 'react-redux';

function CheckoutProduct({id,title,price,rating,description,category,image,hasPrime}) {
    const dispatch= useDispatch();
    
    
    const addItemToBasket=()=>{
        const product ={
            id,title,price,description,category,image,hasPrime,rating
        };
        dispatch(addToBasket(product));

    }
    const removeItemFromBasket=()=>{
        
        dispatch(removeFromBasket({id}));

    }
    return (
        <div className="grid grid-cols-5">
            <Image src={image} height={200} width={200} objectFit="contain"/>
            <div className="col-span-3 mx-5">
                <p>{title}</p>
                <div className="flex">
                    {Array(rating).fill().map((_,i)=>(
                        <StarIcon key={i} className="h-5 text-yellow-500"/>
                    ))}
                </div>
                <p className="text-xs my-2 line-clamp-3">{description}</p>
                <Currency quantity={price*100} currency="INR"/>
                {hasPrime && (
                <div className="flex items-center space-x-2">
                    <img className="w-12" src="https://links.papareact.com/fdw" alt="prime"/>
                    <p className="text-xs text-gray-500"> FREE Next-day Delivery</p>
                    </div>
            )}
            </div>
            {/* Right add/remove button */}
            <div className="flex flex-col space-y-2 my-auto justify-self-end">
                <div className="flex flex-row justify-self-end">
                <button onClick={addItemToBasket} className="button px-3 font-bold">+</button>
                <span className="mt-1 mx-4 text-l">Quantity: 0</span>
                <button onClick={addItemToBasket} className="button px-4 font-bold">-</button>
                
                </div>
                <button onClick={removeItemFromBasket} className="button">Remove to Basket</button>
            </div>
            
        </div>
    )
}

export default CheckoutProduct
