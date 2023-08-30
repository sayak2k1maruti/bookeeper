import {
  getAllWallets,
  getAllTransactionCategories,
} from "../api/getUserPreferranceAPI";
import { useState } from "react";
import { TRANSACTION_MODE } from "../enum";

const useTransactionDetails = () => {
  const [amount, setAmount] = useState("0");
  const [mode, setMode] = useState(TRANSACTION_MODE.EXPENSE);
  const [category, setCategory] = useState(
    getAllTransactionCategories()[mode][0]
  );
  const [wallet, setWallet] = useState(getAllWallets()[0]);
  const [description, setDescription] = useState();

  const updateTransactionDetails = (key, value) => {
    if (key === "amount") {
      setAmount(value);
    } else if (key === "mode") {
      setMode(value);
    } else if (key === "category") {
      setCategory(value);
    } else if (key === "description") {
      setDescription(value);
    } else if (key === "wallet") {
      setWallet(value);
    }
  };
  const TransactionDetails = {
    amount: amount,
    mode: mode,
    category: category,
    description: description,
    wallet: wallet,
  };
  return [TransactionDetails, updateTransactionDetails];
};
export default useTransactionDetails;
