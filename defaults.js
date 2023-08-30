import { R } from "./config";
import { TRANSACTION_MODE } from "./enum";

const DebitCategories = [
  {
    name: "Food",
    icon: R.Icons.paymentCategories.food,
    color: "tomato",
  },
  {
    name: "Health",
    icon: R.Icons.paymentCategories.food,
    color: "lightblue",
  },
  {
    name: "Credit Cards",
    icon: R.Icons.paymentCategories.food,
    color: "gray",
  },
  {
    name: "Shopping",
    icon: R.Icons.paymentCategories.food,
    color: "lightslategrey",
  },
  {
    name: "Rechargs",
    icon: R.Icons.paymentCategories.food,
    color: "violet",
  },
  {
    name: "Entartainment",
    icon: R.Icons.paymentCategories.food,
    color: "orange",
  },
  {
    name: "Transportation",
    icon: R.Icons.paymentCategories.food,
    color: "tomato",
  },
];

const CreditCategories = [
  {
    name: "Salary",
    icon: R.Icons.paymentCategories.food,
    color: "tomato",
  },
  {
    name: "Investment",
    icon: R.Icons.paymentCategories.food,
    color: "lightblue",
  },
  {
    name: "IT Return",
    icon: R.Icons.paymentCategories.food,
    color: "gray",
  },
  {
    name: "Gift",
    icon: R.Icons.paymentCategories.food,
    color: "lightslategrey",
  },
  {
    name: "Lucky Draw",
    icon: R.Icons.paymentCategories.food,
    color: "violet",
  },
  {
    name: "Others",
    icon: R.Icons.paymentCategories.food,
    color: "grey",
  },
];

const TransactionCategories = {
  [TRANSACTION_MODE.EXPENSE]: DebitCategories,
  [TRANSACTION_MODE.INCOME]: CreditCategories,
};

const Wallets = [
  {
    name: "Cash",
    icon: R.Icons.wallets.cash,
    color: "red",
  },
  {
    name: "Bank A",
    icon: R.Icons.wallets.bank,
    color: "blue",
  },
  {
    name: "Card A",
    icon: R.Icons.wallets.card,
    color: "green",
  },
  {
    name: "Bank B",
    icon: R.Icons.wallets.bank,
    color: "orange",
  },
];

export const DEFAULT = {
  DebitCategories: DebitCategories,
  CreditCategories: CreditCategories,
  TransactionCategories: TransactionCategories,
  Wallets: Wallets,
  Currency: "₹",
};
