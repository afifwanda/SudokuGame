import { useEffect,useState } from 'react';

export default (url) => {
    const [data,setData] = useState()
    const [error,setError] = useState(null)

    useEffect(()=>{
        fetch(url)
        .then(response => response.json())
        .then(data => {
          setData(data[0])
        })
        .catch(err => setError(err))
      },[url])

      return {
          data,
          error
      }

}