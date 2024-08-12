import styles from './Fullstack.module.css';

export default function FullstackItem({ furniture, handleThumbnailClick, popClick, addBasket, currency, valueRate }) {

  /*
  const formatPrice = 
    new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'UAH',
      currencyDisplay: 'narrowSymbol',
    }).format(furniture.price);
  //
  */

  /* style:  'decimal' | 'percent' | 'currency' | 'unit' */
  /* currency: 'USD' | 'EUR' | UAH */ 

  //
  //const currency = 'UAH';
  const formatPrice = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
  }).format(furniture.price / valueRate);
  //
  
  // если необходимо указывать только имя фото в админ панели:
  // src={`/images${furniture.imagePath}`} // добавление префикса '/images' к imagePath

  return (
    <div className={styles.cardPreviewBox}>
      <img className={styles.cardPreview}        
        src={furniture.imagePath}
        /*src={'https://store-json-db-serv.onrender.com' + furniture.imagePath}*/
        alt={furniture.alt}
        text={furniture.text}
        onClick={() => { handleThumbnailClick(furniture.id); }}             
      />
      <span className={styles.cardPreviewSpan} onClick={() => { popClick(furniture); }}>
        More
      </span>
      <p>Name: {furniture.name}</p>
      <p>Price: {furniture.price ? <strong>{formatPrice}</strong> : <span>&mdash;</span>}</p>
      {<button className={styles.addCart} onClick={(event) => addBasket(furniture.id, event)}>Add to cart</button>}
      {/*'event' используем в случае ссылки вместо кнопки, добавить атрибут href="#"*/}
    </div>
  );
}


