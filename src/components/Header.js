import React from 'react'
import Image from "next/image"
import {MenuIcon,SearchIcon,ShoppingCartIcon} from "@heroicons/react/outline"
import {signIn,signOut,useSession} from "next-auth/client"
import {useRouter} from "next/router";
import { useSelector } from 'react-redux';
import { selectItems } from '../slices/basketSlice';
//import Nextauth from '../pages/api/auth/[...nextauth]'
function Header() {
    const [session]=useSession();
    const router=useRouter();
    
    const items=useSelector(selectItems);
    return (
        <header>
            <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
                <div className="mt-2 flex items-center flex-grow sm:flex-grow-0 ">
                    <Image  onClick={()=>router.push("/")}
                    src="https://links.papareact.com/f90/"
                    width={150}
                    height={40}
                    objectFit="contain"
                    className="cursor-pointer"/>
                </div>
                {/* Search bar */}
                <div className=" hidden sm:flex items-center h-10 cursor-pointer rounded-md flex-grow bg-yellow-400 hover:bg-yellow-500 " >
                    <input className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4" type="text"/>
                    <SearchIcon className=" h-12 p-4"/>
                </div>
                {/* Right */}
                <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
                <div onClick={!session?signIn:signOut} className=" linkdef">
                    <p className="hover:underline">{session?`Hello, ${session.user.name}`:"Sign In"}</p>
                    <p className="font-extrabold md:text-sm">Account & Lists</p>
                </div>
                <div className=" linkdef">
                    <p>Returns</p>
                    <p className="font-extrabold md:text-sm">Orders</p>
                </div>
                <div  onClick={()=>router.push("/checkout")} className=" relative linkdef flex items-center">
                    <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
                        {items.length}
                    </span>
                    <ShoppingCartIcon className="h-10"/>
                    <p className="hidden md:inline mt-2 font-extrabold md:text-sm">Basket</p>
                </div>
                </div>
                
            </div>
            <div className="flex items-center p-2 pl-6 space-x-3 bg-amazon_blue-light text-white text-sm">
                <p className="linkdef flex items-center" >
                <MenuIcon className="h-6 mr-1"/>
                All
                </p>
                <p className="linkdef">Prime Video</p>
                <p className="linkdef">Amazon Business</p>
                <p className="linkdef">Today's Deals</p>
                <p className="linkdef hidden lg:inline-flex">Electronics</p>
                <p className="linkdef hidden lg:inline-flex">Food & Grocery</p>
                <p className="linkdef hidden lg:inline-flex">Prime</p>
                <p className="linkdef hidden lg:inline-flex">Buy Apple</p>
                <p className="linkdef hidden lg:inline-flex">Shopper Toolkit</p>
                <p className="linkdef hidden lg:inline-flex">Health & Personal Care</p>
                
                <div className="absolute right-5 link cursor-pointer hidden lg:inline-flex">
                    
                    <Image 
                    
                    src="http://pngimg.com/uploads/amazon/small/amazon_PNG18.png"
                    width={30}
                    height={30}
                    objectFit="contain"
                    className="cursor-pointer"/>
                    
                    <p className="text-lg mb-2 ml-3">Shopping made easy | Download the app</p>
                  
                    
                </div>

            </div>

        </header>
    )
}

export default Header
