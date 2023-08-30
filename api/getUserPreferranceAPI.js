import { exp } from "react-native-reanimated";
import { DEFAULT } from "../defaults";
import { TRANSACTION_MODE } from "../enum";

export const getAllDebitCategories = () => {
  /*Returns all Expense Categories */
  return [...DEFAULT.DebitCategories];
};

export const getAllCreditCategories = () => {
  /* Returns all income catagories*/
  return [...DEFAULT.CreditCategories];
};

export const getAllTransactionCategories = () => {
  /* Return all Transaction Categories */
  return {
    [TRANSACTION_MODE.INCOME]: getAllCreditCategories(),
    [TRANSACTION_MODE.EXPENSE]: getAllDebitCategories(),
  };
};

export const getAllWallets = () => {
  return DEFAULT.Wallets;
};

export const getCurrencySign = () => {
  return DEFAULT.Currency;
};
