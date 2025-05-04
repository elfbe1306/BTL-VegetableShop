import React, { useState } from "react";
import styles from './AddNewProductModal.module.css';
import CloseIcon from "../../../assets/icons/CloseIcon";
import apiService from "../../../api";
import { AwardIcon } from "lucide-react";

const AddNewProductModal = ({ onClose, refreshProducts }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [quantity, setQuantity] = useState();
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([null, null, null]);
  
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file && file.type === "image/png") {
      const newImages = [...images];
      newImages[index] = URL.createObjectURL(file);
      setImages(newImages);
  
      const newImageFiles = [...imageFiles];
      newImageFiles[index] = file;
      setImageFiles(newImageFiles);
    } else {
      alert("Please upload a .png image file.");
    }
  };
  
  const handleAddNewProduct = async () => {
    const addProduct = {
      name: name,
      price: price,
      quantity: quantity,
      description: description
    }

    const response = await apiService.AddNewProduct(addProduct, imageFiles);

    if (response.success) {
      await refreshProducts();
      setTimeout(() => {
        onClose();
      }, 300);
    }
  }

  return(
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
              {[0, 1, 2].map((index) => (
                <div key={index} className={styles.PicUploadContainer}>
                  {images[index] ? (
                    <img
                      className={styles.productImage}
                      src={images[index]}
                      alt={`product-${index}`}
                    />
                  ) : (
                    <div className={styles.placeholder}>No image</div>
                  )}
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
          <button className={styles.SaveButton} onClick={() => handleAddNewProduct()}>Add</button>
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
    </div>
  )
}

export default AddNewProductModal