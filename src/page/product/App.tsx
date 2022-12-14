import { useParams } from "react-router-dom";
import { useFetchProduct } from '../../hook/fetch';
import SlideShow from "./SlideShow";
import './css/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { store, alterCartContent, getSessionCartContent } from '../../store'


export default function ProductPage(): any {
  const productId = Number(useParams().id);
  const { loading, error, product } = useFetchProduct(productId);

  const addProductToCartHandler = () => {
    store.dispatch(alterCartContent({ actionName: 'addProductToCart', productId }));
  }

  if (loading) {
    return    // waiting untill request finishes
  }

  if (error) {
    return <p className='errorMsg'> Loading Error! </p>
  }

  const { images, title, description, price, discountPercentage, rating, stock, brand, category } = product

  return (
    <div className='productContainerOuter'>
      <div className='productContainer'>
        <SlideShow images={images} />
        <div className='content'>
          <div className='titleContainer'>
            <div title={title}> {title} </div>
            <div> {computeRatingVisual(rating)} </div>
          </div>
          <p className='desc'> {description} </p>
          <p className='stockBrandCat'> Stock: {stock} </p>
          <p className='stockBrandCat'> Brand: {brand} </p>
          <p className='stockBrandCat'> Category: {category} </p>
          <p className='dicountPercent'><span> {-discountPercentage} % </span></p>
          <div className='priceAddCart'>
            <div> {price}$ </div>
            <div onClick={addProductToCartHandler}> Add to cart </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function computeRatingVisual(rating: number) {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (Math.floor(rating) > i) {
      stars.push(<FontAwesomeIcon key={i} style={{ color: '#6100ff' }} icon={faStar} />)
      continue;
    }

    stars.push(<FontAwesomeIcon key={i} style={{ color: 'gray' }} icon={faStar} />)
  }

  return <span> {stars} &nbsp;{rating} </span>
}
