import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const index=state.items.findIndex(basketItem=>basketItem.id===action.payload.id)
      console.log(action.payload);
      console.log(index);
      if(index<0){
        state.items=[...state.items,action.payload]
      }
      else{
        let newBasket=[...state.items];
        newBasket[index].quantity++,
        console.log("quanity increased");
        state.items=newBasket;
        console.log(state.items);

        
      }
      
    },
    
    decreaseQuantity: (state, action) => {
      const index=state.items.findIndex(basketItem=>basketItem.id===action.payload.id)

      console.log(action.payload.id);
      console.log(index);
      let newBasket=[...state.items];
      if(index>=0){
        if(newBasket[index].quantity>1){
          newBasket[index].quantity--,
          console.log("quanity deccreased");
        }
        else{
          console.warn(
            `Remove the product from basket if you want`
          )
          
        }
        
        
      }
      else{
        
        console.warn(
          `Cant decrease the product (id:${action.payload.id}) from the basket`
        )
      }
      state.items=newBasket;
    },
    removeFromBasket: (state, action) => {
      const index=state.items.findIndex(basketItem=>basketItem.id===action.payload.id)
    
      let newBasket=[...state.items];
      if (index>=0){
        //item exists in the basket
        newBasket.splice(index,1)
      } else{
        console.warn(
          `Cant remove the product (id:${action.payload.id}) from the basket`
        )
      }
      state.items=newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket,decreaseQuantity } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectQuantities= (state) => state.basket.items.reduce((total,item)=>total+item.quantity,0);
export const selectTotal = (state) => state.basket.items.reduce((total,item)=>total+item.price*item.quantity*100,0);

export default basketSlice.reducer;
