import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

export default function useProducts() {
  
  
    function getRecent(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/products')
      }
  
  
     let responseObject=  useQuery({
        queryKey:['recentProducts'],
        queryFn:getRecent,
        staleTime:0,           // after 5 second data be stale before 5 second data be fresh
        // retry:6,               // didn't return error until refitch 6 times
        // retryDelay:3000,        // do retry after 3s  
        // refetchInterval:2000 , 
        // refetchIntervalInBackground:true,
        // refetchOnWindowFocus:true,      //after exit from tab stop (inactive)
        // gcTime:4000           //after exit from tab delete all after 4s 
        select:(data)=>data.data.data
      })
  
  
  
  
    return responseObject
}
