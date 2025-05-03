import React, { useState } from "react";
import styles from './EditProductModal.module.css';
import CloseIcon from "../../../assets/icons/CloseIcon";
import apiService from "../../../api";

const EditProductModal = ({ product, onClose }) => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const [quantity, setQuantity] = useState(product.quantity);

  const [images, setImages] = useState([
    `http://localhost/BTL-VegetableShop/backend/uploads/products/${product.image}1.png`,
    `http://localhost/BTL-VegetableShop/backend/uploads/products/${product.image}2.png`,
    `http://localhost/BTL-VegetableShop/backend/uploads/products/${product.image}3.png`
  ]);
  const [imageFiles, setImageFiles] = useState([null, null, null]);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file && file.type === "image/png") {
      const newImages = [...images];
      newImages[index] = URL.createObjectURL(file);
      setImages(newImages);
  
      const newImageFiles = [...imageFiles];
      newImageFiles[index] = file; // just use the original file
      setImageFiles(newImageFiles);
    } else {
      alert("Please upload a .png image file.");
    }
  };  

  const handleSave = async () => {
    const updatedProduct = {
      id: product.product_id,
      name,
      price,
      quantity,
      description,
      oldname: product.name
    };

    const response = await apiService.UpdateProductByID(updatedProduct, imageFiles);
    console.log(response)
    console.log(images)

    // if (response.success) {
    //   const updatedImageBase = `http://localhost/BTL-VegetableShop/backend/uploads/products/${response.pathName}`;
      
    //   setImages([
    //     `${updatedImageBase + "1.png"}`,
    //     `${updatedImageBase + "2.png"}`,
    //     `${updatedImageBase + "3.png"}`
    //   ]);      

    //   setTimeout(() => {
    //     console.log(images)
    //     onClose();
    //   }, 300);
    // }
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div style={{ paddingTop: 15 }}>
          <div className={styles.insertContainer}>
            <p>Product Name:</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.insertContainer}>
            <p>Price:</p>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className={styles.insertContainer}>
            <p>Quantity:</p>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className={styles.insertContainer}>
            <p>Description:</p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className={styles.insertPicContainer}>
            <p>Image:</p>
            <div className={styles.PicContainer}>
              {images.map((imgSrc, index) => (
                <div key={index} className={styles.PicUploadContainer}>
                  <img
                    className={styles.productImage}
                    src={imgSrc}
                    alt={`product-${index}`}
                  />
                  <input
                    type="file"
                    accept="image/png"
                    onChange={(e) => handleImageChange(e, index)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.SaveButtonContainer}>
          <button className={styles.SaveButton} onClick={() => handleSave()}>Save</button>
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};

export default EditProductModal;
