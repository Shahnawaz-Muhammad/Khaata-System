import { useState } from "react";
import { useCustomerContext } from "../hooks/useCustomerContext";
import { useAuthContext } from "../hooks/useAuthContext";
import InputField from "./common/Input";
import Button from "./common/Button";

const AddItemForm = () => {
  const { customerDetails, dispatch } = useCustomerContext();
  const { user } = useAuthContext();

  const customerId = customerDetails?._id; // Extract customer ID from customerDetails

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const item = { name, description, cost };

    const response = await fetch(`/api/customers/${customerId}/item`, {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    // console.log("json __________", json)

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      dispatch({ type: "ADD_ITEM_TO_CUSTOMER", payload: json.item });

      setName("");
      setDescription("");
      setCost("");
      setError(null);
      setEmptyFields([]);
    }
  };

  return (
    <form
      className="w-full flex flex-col gap-3 p-10  bg-white h-full"
      onSubmit={handleSubmit}
    >
      <h3>Add Item</h3>

      <InputField
        label="Name:"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <InputField
        label="Description:"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <InputField
        label="Cost:"
        type="number"
        value={cost}
        onChange={(e) => setCost(e.target.value)}
      />

      <Button type="submit">Add Item</Button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default AddItemForm;
