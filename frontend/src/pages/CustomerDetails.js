import React, { useEffect } from "react";
import ItemCard from "../components/ItemCard";
import { useParams } from "react-router-dom";
import { useCustomerContext } from "../hooks/useCustomerContext";
import { useAuthContext } from "../hooks/useAuthContext";
import AddItemForm from "../components/AddItemForm";

const CustomerDetails = () => {
  const { id } = useParams();

  const { items, customerDetails, totalCost, dispatch } = useCustomerContext();

  const { user } = useAuthContext();

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await fetch(`/api/customers/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const json = await response.json();
        console.log("fetch details",json)
        if (response.ok) {
          dispatch({ type: "SET_CUSTOMER_DETAILS", payload: json });
        } else {
          console.error("Failed to fetch customer details:", json);
        }
      } catch (error) {
        console.error("Error fetching customer details:", error);
      }
    };
    if (user) {
      fetchCustomerDetails();
    }
  }, [dispatch, id, user, items]);

  const handleDeleteItem = async (itemId) => {
    try {
      const response = await fetch(`/api/customers/${id}/${itemId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (response.ok) {
        dispatch({ type: "DELETE_ITEM", payload: { itemId } });
      } else {
        console.error("Failed to delete item:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="w-full max-w-screen-2xl grid grid-cols-3 gap-10">
      <div className="col-span-2  flex flex-col gap-2">
        {customerDetails?.items?.map((item) => {
          console.log(item)
          return (
            <ItemCard
              key={item?._id}
              item={item}
              onDelete={() => handleDeleteItem(item?._id)}
            />
          );
        })}
        <div className="w-full p-5 flex justify-end bg-white">
          <h1 className="text-lg font-semibold">Total Cost: {totalCost}</h1>
        </div>
      </div>
      <AddItemForm />
    </div>
  );
};

export default CustomerDetails;
