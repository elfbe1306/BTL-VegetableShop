import React, { useEffect, useState } from "react";
import styles from './AddNewSaleModal.module.css';
import CloseIcon from "../../../assets/icons/CloseIcon";
import apiService from "../../../api";

import SelectedSaleProductModal from "../SelectSaleProductModal/SelectSaleProductModal";

const AddNewSaleModal = ({ onClose, refreshSales }) => {
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState(0);
  const [description, setDescription] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([null, null]);

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

  const FetchProductForSale = async () => {
    const response = await apiService.FetchProductForSale();
    setProducts(response)
  }

  useEffect(() => {
    FetchProductForSale();
  }, [])

  const [isSelectedSaleProductOpen, setIsSelectedSaleProductOpen] = useState(false);
  const handleSelectedSaleProductOpen = () => {
    setIsSelectedSaleProductOpen(true);
  }
  const handleSelectedSaleProductClose = () => setIsSelectedSaleProductOpen(false);

  const handleSave = async () => {
    const newSale = {
      name: name,
      discount_percentage: discount,
      description: description,
      selectedProducts: selectedProducts.filter(p => p && p.product_id),
    }

    const response = await apiService.CreateSale(newSale, imageFiles);
    return response;
    // if (response.success) {
    //   await refreshSales()
    //   setTimeout(() => {
    //     onClose();
    //   }, 300);
    // }
  }

  return(
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div style={{ paddingTop: 15 }}>
          <div className={styles.insertContainer}>
            <p>Sale Name:</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.insertContainer}>
            <p>Discount Percentage:</p>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
          </div>
          <div className={styles.insertContainer}>
            <p>Description:</p>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className={styles.insertContainer}>
            <p>Products:</p>
            <button onClick={handleSelectedSaleProductOpen}>View</button>
          </div>
          <div className={styles.insertPicContainer}>
            <p>Image:</p>
            <div className={styles.PicContainer}>
              {[0, 1].map((index) => (
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
          <button className={styles.SaveButton} onClick={() => handleSave()}>Save</button>
        </div>

        {isSelectedSaleProductOpen && (
          <SelectedSaleProductModal 
            onClose={handleSelectedSaleProductClose} 
            products={products}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
          />
        )}

        <button className={styles.closeButton} onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
    </div>
  )
}

export default AddNewSaleModal;