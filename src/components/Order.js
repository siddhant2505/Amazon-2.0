import React from 'react'
import moment from "moment"
import Currency from "react-currency-formatter";
import { CurrencyEuroIcon } from '@heroicons/react/solid';
function Order({id,amount, amountShipping,items,timestamp,images}) {
    const quantities=items.reduce((total,item)=>total+item.quantity,0);
    return (
        <div className="relative border rounded-md">
            <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
                <div>
                    <p className="font-bold text-xs">ORDER PLACED</p>
                    <p>{moment.unix(timestamp).format("DD MM YYYY")}</p>
                </div>

                <div>
                    <p className="text-xs font-bold">TOTAL</p>
                    <p>
                        <Currency quantity={amount} currency="INR"/> - Next Day Delivery{" "}
                        <Currency quantity={amountShipping} currency="INR"/>
                    </p>
                </div>
                <p className="flex-1 text-xs text-right text-blue-500  whitespace-nowrap sm:text-xl self-end">
                    {quantities} items
                </p>

                <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap">
                    ORDER # {id}
                </p>
            </div>
            <div className="p-5 sm:p-10">
                <div className="flex space-x-6 overflow-x-auto">
                    {images.map(image=>(
                        <img src={image} alt="p1" className="h-20 object-contain"/>
                    )
                    )}

                </div>
            </div>
            
        </div>
    )
}

export default Order
