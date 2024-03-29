"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSingleItem, clearSingleItem } from "../../../../store/shopSlice";
import { saveItem } from "../../../../store/recipientSlice";
import { AiOutlineClose } from "react-icons/ai";

const SingleProductModal = (props) => {
  const { productModalIsShown, setProductModalIsShown } = props;
  const { singleProduct } = useSelector((store) => store.shop);
  const { singleRecipient } = useSelector((store) => store.recipients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleItem(props.productId));
    return () => {
      dispatch(clearSingleItem());
    };
  }, []);

  const handleSaveItem = () => {
    const saveObj = {
      recipientId: singleRecipient.id,
      name: singleProduct.product_results.title,
      description: singleProduct.product_results.description,
      imageUrl: singleProduct.product_results.primary_image,
      price: singleProduct.product_results.sellers_online[0].base_price,
      link: singleProduct.product_results.sellers_online[0].link,
      rating: singleProduct.product_results.rating,
    };
    dispatch(saveItem(saveObj));
  };

  if (productModalIsShown) {
    return (
      <>
        <div className="fixed top-0 left-0 h-screen w-screen z-50 bg-black/50">
          <div className="flex justify-center items-center w-full h-full ">
            <div className="relative bg-white rounded-lg shadow w-[60%] h-[60%]">
              <button
                type="button"
                onClick={() => {
                  setProductModalIsShown(false);
                }}
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-lg p-3 ml-auto inline-flex items-center"
              >
                <AiOutlineClose className="scale-110" />
                <span className="sr-only">Close modal</span>
              </button>
              <div className="w-full h-full overflow-y-scroll">
                <div className="flex flex-col justify-between w-full h-full p-4">
                  {singleProduct.product_results === undefined ? (
                    <div role="status" className="w-full h-full flex justify-center items-center">
                      <svg
                        class="inline mr-2 w-[20%] h-[20%] text-gray-200 animate-spin fill-cblue-300"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span class="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <div>
                      <div className="flex-none w-52 relative">
                        <picture>
                          <img src={singleProduct.product_results.primary_image} />
                        </picture>
                      </div>
                      <div>{singleProduct.product_results.title}</div>
                      <div>
                        <h3>Price:</h3>
                        <p>${singleProduct.product_results.sellers_online[0].base_price}</p>
                      </div>
                      <div>
                        <a href={singleProduct.product_results.link} target="_blank">
                          <h3>View in Website</h3>
                        </a>
                      </div>
                      <div>
                        <h3>Description:</h3>
                        <p>{singleProduct.product_results.description}</p>
                      </div>
                      <button onClick={handleSaveItem}>Save This Item!</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="flex">
          {product === undefined ? (
            "Loading Product..."
          ) : (
            <div>
              <div className="flex-none w-52 relative">
                <picture>
                  <img src={product.primary_image} />
                </picture>
              </div>
              <div>{product.title}</div>
              <div>
                <h3>Price:</h3>
                <p>${product.sellers_online[0].base_price}</p>
              </div>
              <div>
                <h3>Description:</h3>
                <p>{product.description}</p>
              </div>
              <button onClick={handleSaveItem}>Save This Item!</button>
            </div>
          )}
        </div> */}
      </>
    );
  }
};
export default SingleProductModal;
