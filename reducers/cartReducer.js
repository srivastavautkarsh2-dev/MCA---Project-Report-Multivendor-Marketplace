let initialstate=[]
//load cart items  from local storgage

if(typeof window !== "undefined")
{
    if(localStorage.getItem("cart"))
    {
        initialstate=JSON.parse(localStorage.getItem("cart"))
    }
    else{
        initialstate=[];
    }
}
export function cartReducer( state= initialstate , action)
{
    switch(action.type)
    {
        case "ADD_TO_CART":
        return action.payload;


        default :
        return state;
    }
}

