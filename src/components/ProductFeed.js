import React from 'react'
import Product from "./Product"

function ProductFeed({products}) {
    return (
        <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 md:-mt-52 mx-auto">
            
            {products.
            slice(0,4)
            .map(({id,title,description,category,image,price})=>(
        <Product key={id} title={title} description={description} price={price} category={category} image={image}/>
      ))}
      <img className="md:col-span-full" src="https://links.papareact.com/dyz" alt="subbanner"/>
     <div className="md:col-span-2">
         {products.
            slice(4,5)
            .map(({id,title,description,category,image,price})=>(
        <Product key={id} title={title} description={description} price={price} category={category} image={image}/>
      ))}</div> 
      {products.
            slice(5,products.length)
            .map(({id,title,description,category,image,price})=>(
        <Product key={id} title={title} description={description} price={price} category={category} image={image}/>
      ))}
        </div>
    )
}

export default ProductFeed
