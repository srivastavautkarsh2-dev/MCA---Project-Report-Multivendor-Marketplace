import axios from 'axios';

export const getsubs = async () => await axios.get(
        `http://localhost:8081/api/sub`);





export const getsub = async (slug) => await axios.get(
        `http://localhost:8081/api/sub/${slug}`
    )


export const removesub = async (slug, authtoken) => await axios.delete(
        `http://localhost:8081/api/sub/${slug}`,
        {
            headers: {
                authtoken
            }
        }
    )


export const updatesub = async (slug, sub, authtoken) =>  await axios.put(
        `http://localhost:8081/api/sub/${slug}`,sub,
        {
            headers:
            {
                authtoken,
            }
        }
    )




export const createsub = async(sub,authtoken)=>

   await axios.post(
    `http://localhost:8081/api/sub`,sub,{
        headers:{
            authtoken,
        }
    }
  )
    