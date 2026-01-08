import React, { useEffect , useState} from 'react';
import ProductCard from './ProductCard';
import useProducts from '../../hooks/useProducts';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import ProductUploadForm from './ProductUploadForm';

const AllProducts = () => {
    const { 
      fetchProducts,
      updateProduct,
      deleteProduct,
      createProduct
    } = useProducts();
  
    // Get products and loading state from Redux store
    const products = useSelector(state => state.products.products);
    const loading = useSelector(state => state.products.loading);

      const [isUploadProductOpen, setIsUploadProductOpen] = useState(false);
      const handleEdit = () => {
        setIsUploadProductOpen(true);
    };
  
    useEffect(() => {
      fetchProducts();
    }, []);

    const handleCreateProduct = async (productData, images) => {
      try {
        await createProduct(productData, images);
        // Show success message
        setIsUploadProductOpen(false);
        fetchProducts();
        toast.success('Product Created successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: {
            background: '#FAD767',
            color: '#3C423A',
            border: '2px solid white',
          },
          progressStyle: {
            background: 'white'
          },
        });
        // Reset form (you'll need to implement this in ProductUploadForm)
      } catch (error) {
        console.error('Error creating product:', error);
        setIsUploadProductOpen(false);
        fetchProducts(); // Refresh the list
      toast.error('Error creating product. Please try again...', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              style: {
                background: '#FAD767',
                color: '#3C423A',
                border: '2px solid white',
              },
              progressStyle: {
                background: 'white'
              },
            });
      }
    };
  
   
  const handleEditProduct = async (productId, productData, images) => {
    try {
      await updateProduct(productId, productData, images);
      
      fetchProducts(); // Refresh the list
      toast.success('Product updated successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          background: '#FAD767',
          color: '#3C423A',
          border: '2px solid white',
        },
        progressStyle: {
          background: 'white'
        },
      });

    } catch (error) {
      console.error('Error updating product:', error);
      fetchProducts(); // Refresh the list
      toast.error('Error updating product. Please try again...', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              style: {
                background: '#FAD767',
                color: '#3C423A',
                border: '2px solid white',
              },
              progressStyle: {
                background: 'white'
              },
            });
    }
  };
  
    const handleDeleteProduct = async (productId) => {
      try {
        await deleteProduct(productId);
        fetchProducts(); // Refresh the list
        toast.success('Product deleted successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: {
            background: '#FAD767',
            color: '#3C423A',
            border: '2px solid white',
          },
          progressStyle: {
            background: 'white'
          },
        });
        
      } catch (error) {
        console.error('Error deleting product:', error);
        fetchProducts(); // Refresh the list
        toast.error('Error deleting product. Please try again...', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: {
            background: '#FAD767',
            color: '#3C423A',
            border: '2px solid white',
          },
          progressStyle: {
            background: 'white'
          },
        });
      }
    };
  
    if (loading) {
      return (
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
      );
    }
  
    return (
      <>
        <div>
          <div className="mb-4 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <h1 className="text-xl sm:text-2xl font-bold">All Products</h1>
            <div className="w-full sm:w-auto rounded-lg flex flex-row gap-5">
            <div className='bg-white pt-3 p-2 border-2 font-semibold  hover:bg-emerald-50'>
            <button onClick={handleEdit} className="text-emerald-800">
            Create New Product
              </button>
              </div>
              <div className='p-3 bg-emerald-600'>
              <p className="text-white">
                <span className="font-bold">Total Products:</span> {products?.length || 0}
              </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            {products && products.length > 0 ? (
              products.map(product => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onEdit={handleEditProduct}
                  onDelete={handleDeleteProduct}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No products found
              </div>
            )}
          </div>
        </div>

        <ProductUploadForm
                onSubmit={handleCreateProduct}
                isOpen={isUploadProductOpen}
                onClose={() => setIsUploadProductOpen(false)}
                
            />

        </>
      );
    };

  export default AllProducts;