import axios from "axios"
export const createProduct = async(product,authtoken)=>

   await axios.post(
    `http://localhost:8081/api/product`,product,{
        headers:{
            authtoken,
        }
    }
  )

  export const getProductByCount= async (count) => 
  await axios.get(
    `http://localhost:8081/api/products/${count}`);

    export const removeProduct = async(slug,authtoken)=>

    await axios.delete(
     `http://localhost:8081/api/product/${slug}`,{
         headers:{
             authtoken,
         }
     }
   )


  export const getProduct= async (slug) => 
  await axios.get(
    `http://localhost:8081/api/product/${slug}`);

    
    export const updateProduct = async(slug,product,authtoken)=>

    await axios.put(
     `http://localhost:8081/api/product/${slug}`,product,{
         headers:{
             authtoken,
         }
     }
   )


   export const getProducts = async(sort,order,page)=>

   await axios.post(
    `http://localhost:8081/api/products`,{
        sort,order,page
   }
  )


  export const getproductsCount= async () => 
  await axios.get(
    `http://localhost:8081/api/products/total`);



    export const productStar = async(productId,star,authtoken)=>

    await axios.put(
     `http://localhost:8081/api/product/star/${productId}`,{star},{
         headers:{
             authtoken,
         }
     }
   )


   export const getRealted= async (productId) => 
   await axios.get(
     `http://localhost:8081/api/product/realated/${productId}`);

     export const fetchProductsByFliter= async (arg) => 
   await axios.post(
     `http://localhost:8081/api/search/filters`,arg);