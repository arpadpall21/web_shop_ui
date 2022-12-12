import { useState, useEffect, useCallback } from "react";
import { FetchResult } from '../helper/types';
import axios from "axios";


export function useFetchProducts(nrOfProducts: number): FetchResult {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setError] = useState('');
  const [productList, setProductList] = useState<(object)[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  let [reqNr, setReqNr] = useState(0);

  const __fetchProducts = useCallback(async () => {
    try {
      setLoading(true);

      const res = await axios.get(`https://dummyjson.com/products?limit=10&skip=${nrOfProducts}`);
      if (reqNr < 1) {
        setTotalProducts(res.data.total);
      }
      setProductList(prev => [...prev, ...res.data.products]);

      setLoading(false);
      setReqNr(reqNr++);
    } catch (err: any) {
      setError("Loading Error");
      console.error(err);
    }
  }, [nrOfProducts]);

  useEffect(() => {
    __fetchProducts();
  }, [nrOfProducts]);

  return { loading, errorMsg, productList, totalProducts };
}