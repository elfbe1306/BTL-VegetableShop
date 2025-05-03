import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import styles from '../../pages/AdminProduct/AdminProduct.module.css';
import apiService from "../../api";

import Header from "../../components/Admin/Header/Header";
import SideBar from "../../components/Admin/SideBar/SideBar";
import ProductModal from '../../components/ProductModal/ProductModal';
import EditProductModal from "../../components/Admin/EditProductModal/EditProductModal";

const AdminProduct = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
      const FetchProduct = async () => {
        const response = await apiService.FetchProduct();
        setProducts(response);
      }

      FetchProduct();
    }, [])

    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [selectedViewProduct, setSelectedViewProduct] = useState(null);

    const handleOpenProductModal = (product) => {
      setSelectedViewProduct(product);
      setIsProductModalOpen(true);
    };
    const handleCloseProductModal = () => {
      setSelectedViewProduct(null);
      setIsProductModalOpen(false);
    };

    const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
    const [selectedEditProduct, setSelectedEditProduct] = useState(null);

    const handleOpenEditProductModal = (product) => {
      setSelectedEditProduct(product);
      setIsEditProductModalOpen(true);
    };
    const handleCloseEditProductModal = () => {
      setSelectedEditProduct(null);
      setIsEditProductModalOpen(false);
    };

    return (
    <div className={styles.BigWrapper}>
      <SideBar/>
      <div className={styles.Wrapper}>
        <Header title='Products' />
        <main className={styles.main}>
          <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          > 
            <div className={styles.SearchAndAddContainer}>
              <button className={styles.NewProductButton}>Add New Product</button>
              <div className={styles.SearchContainer}>
                <Search className={styles.searchIcon} size={18} />
                <input
                    type="text"
                    placeholder="Search products..."
                    className={styles.searchInput}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <table className={styles.table}>
              <thead>
                <tr>
                    {["Name", "Price", "Discount Price", "Image", "Description", "Quantity", "Action"].map((head) => (
                    <th key={head} className={styles.th}>
                        {head}
                    </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => {
                  const productPrice = product.discount_percentage ? 
                    Math.round(product.price * (100 - Number(product.discount_percentage))) / 100 :
                    product.price

                  return(
                    <motion.tr
                      key={product.product_id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    > 
                      <td className={styles.td}>{product.name}</td>
                      <td className={styles.td}>{product.price}</td>
                      <td className={styles.td}>{productPrice}</td>
                      <td className={styles.td}>
                        <img className={styles.productImage} src={"http://localhost/BTL-VegetableShop/backend/uploads/products/" + product.image + "1.png"}/>
                      </td>
                      <td className={styles.td}>
                        <p className={styles.productDescription}>{product.description}</p>
                      </td>
                      <td className={styles.td}>{product.quantity}</td>
                      <td>
                        <button className={styles.viewButton} onClick={() => handleOpenProductModal(product)}>View</button>
                        <button className={styles.editButton} onClick={() => handleOpenEditProductModal(product)}>Edit</button>
                        <button className={styles.deleButton}>Delete</button>
                      </td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </motion.div>
		    </main>

        {isProductModalOpen && (
          <ProductModal product={selectedViewProduct} onClose={handleCloseProductModal}/>
        )}

        {isEditProductModalOpen && (
          <EditProductModal product={selectedEditProduct} onClose={handleCloseEditProductModal}/>
        )}
      </div>
    </div>
    );
};
export default AdminProduct;
