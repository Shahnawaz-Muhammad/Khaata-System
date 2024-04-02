import { useEffect } from "react";
import { useCustomerContext } from "../hooks/useCustomerContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import AddCustomerForm from "../components/AddCustomerForm";
import CustomerCard from "../components/CustomerCard";

const Home = () => {
  const { customers, dispatch } = useCustomerContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("/api/customers", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: "SET_CUSTOMERS", payload: json });
        } else {
          // Handle non-successful response (e.g., unauthorized, server error)
          console.error("Failed to fetch customers:", json);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    if (user) {
      fetchCustomers();
    }
  }, [dispatch, user]);

  const handleDeleteCustomer = async (customerId) => {
    if (!user) {
      return;
    }
    try {
      const response = await fetch(`/api/customers/${customerId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (response.ok) {
        dispatch({ type: "DELETE_CUSTOMER", payload: { customerId } });
      } else {
        console.error("Failed to delete customer:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <div className="w-full max-w-screen-2xl grid grid-cols-3 gap-10">
      <div className="col-span-2  flex flex-col gap-2">
        {customers &&
          customers?.map((customer) => {
            return (
              <CustomerCard
                key={customer._id}
                customer={customer}
                onDelete={() => handleDeleteCustomer(customer._id)}
              />
            );
          })}
      </div>
      <AddCustomerForm />
    </div>
  );
};

export default Home;
