
import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY } from '../actions/action-types/cart-actions'


const initState = {
    items: [
        {"id":9090,"name":"Item1","price":200,"discount":10,"type":"fiction","img_url":"https://store.lexisnexis.com.au/__data/media/catalog/thumb//placeholder.jpg"},
        {"id":9091,"name":"Item2","price":250,"discount":15,"type":"literature","img_url":"https://store.lexisnexis.com.au/__data/media/catalog/thumb//placeholder.jpg"},
        {"id":9092,"name":"Item3","price":320,"discount":5,"type":"literature","img_url":"https://store.lexisnexis.com.au/__data/media/catalog/thumb//placeholder.jpg"},
        {"id":9093,"name":"Item4","price":290,"discount":0,"type":"thriller","img_url":"https://store.lexisnexis.com.au/__data/media/catalog/thumb//placeholder.jpg"},
        {"id":9094,"name":"Item1","price":500,"discount":25,"type":"thriller","img_url":"https://store.lexisnexis.com.au/__data/media/catalog/thumb//placeholder.jpg"},
        {"id":9095,"name":"Item2","price":150,"discount":5,"type":"literature","img_url":"https://store.lexisnexis.com.au/__data/media/catalog/thumb//placeholder.jpg"},
        {"id":9096,"name":"Item3","price":700,"discount":22,"type":"literature","img_url":"https://store.lexisnexis.com.au/__data/media/catalog/thumb//placeholder.jpg"},
        {"id":9097,"name":"Item4","price":350,"discount":18,"type":"fiction","img_url":"https://store.lexisnexis.com.au/__data/media/catalog/thumb//placeholder.jpg"}
    ],
    addedItems:[],
    total: 0,
    length:0,
    newdiscount:0

}
const calculate = (rate, dis)=>{
    
    let discount = rate-(Number(rate)*Number(dis)/100);
    discount = discount -rate ;
    return discount;

}
const cartReducer= (state = initState,action)=>{
   
    //INSIDE HOME COMPONENT
    if(action.type === ADD_TO_CART){
          let addedItem = state.items.find(item=> item.id === action.id)
          //check if the action id exists in the addedItems
         let existed_item= state.addedItems.find(item=> action.id === item.id)
         if(existed_item)
         {
            addedItem.quantity += 1 
             return{
                ...state,
                 total: state.total + addedItem.price ,
                 length: state.length + 1 ,
                 newdiscount : state.newdiscount + calculate(addedItem.price, addedItem.discount)
                  }
        }
         else{
            addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + addedItem.price 
            
            return{
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal,
                length: state.length + 1 ,
                newdiscount : state.newdiscount + calculate(addedItem.price, addedItem.discount)
            }
            
        }
    }
    if(action.type === REMOVE_ITEM){
        let itemToRemove= state.addedItems.find(item=> action.id === item.id)
        let new_items = state.addedItems.filter(item=> action.id !== item.id)
        
        //calculating the total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
        console.log(itemToRemove)
        return{
            ...state,
            addedItems: new_items,
            total: newTotal,
            length: state.length -= 1,
            newdiscount : state.newdiscount -= calculate(itemToRemove.price, itemToRemove.discount)
        }
    }
    //INSIDE CART COMPONENT
    if(action.type=== ADD_QUANTITY){
        let addedItem = state.items.find(item=> item.id === action.id)
          addedItem.quantity += 1 
          let newTotal = state.total + addedItem.price
          return{
              ...state,
              total: newTotal,
              length: state.length + 1 ,
              newdiscount : state.newdiscount + calculate(addedItem.price, addedItem.discount)
          }
    }
    if(action.type=== SUB_QUANTITY){  
        let addedItem = state.items.find(item=> item.id === action.id) 
         
        //if the qt == 0 then it should be removed
        if(addedItem.quantity === 1){
            let new_items = state.addedItems.filter(item=>item.id !== action.id)
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                addedItems: new_items,
                total: newTotal,
                length: state.length - 1,
                newdiscount : state.newdiscount - calculate(addedItem.price, addedItem.discount)
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                total: newTotal,
                length: state.length - 1 ,
                newdiscount : state.newdiscount - calculate(addedItem.price, addedItem.discount)
            }
        }
        
    }

    
    
  else{
    return state
    }
    
}

export default cartReducer
