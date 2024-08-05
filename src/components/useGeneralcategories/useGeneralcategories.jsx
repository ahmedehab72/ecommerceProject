import { useQuery } from "@tanstack/react-query"
import axios from "axios"





export default function useGeneralcategories() {
  // getting categories
  function getRecentcategories(){
     return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)}
       // distructing the data and the states
   let GeneralCategoris = useQuery({
     queryKey:["recentcategories"],
     queryFn:getRecentcategories,
   })
 console.log(GeneralCategoris)
   return GeneralCategoris
 }


