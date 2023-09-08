import { EVAL_STATUS } from "../enum";
import * as Haptics from "expo-haptics";

export const handleKeypadInput = (
  keyPressed,
  transactionDetails,
  updateTransactionDetails,
  evalError,
  setEvalError,
  handleSubmit
) => {
  const operators = ["+", "-", "×", "÷"];
  const _checkDecimalEligibily = (s) => {
    for (let i = s.length - 1; i >= 0 && !operators.includes(s[i]); i--) {
      console.log(s[i]);
      if (s[i] === ".") return false;
    }
    return true;
  };
  const _eval = (s) => {
    s = s.replace("×", "*");
    s = s.replace("÷", "/");
    let res = eval(s);
    if (res === Infinity || res === -Infinity) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      setEvalError(true);
      return "Error";
    }
    return String(res);
  };
  const setAmount = (amount) => {
    updateTransactionDetails("amount", amount);
  };
  const _getUpdated = (amount, keyPressed) => {
    if (amount === "Error") {
      amount = "0";
    }
    if (keyPressed === "S") {
      // Submit is Pressed
      //setAmount(_eval(amount));
      return _eval(amount);
    }
    if (keyPressed === "C") return "0";
    if (keyPressed === "=") {
      if (operators.includes(amount[amount.length - 1])) {
        amount += "0";
      }
      return _eval(amount);
    }
    if (keyPressed === "B") {
      //Backspace is Pressed
      amount = amount.slice(0, amount.length - 1);
      return amount.length === 0 ? "0" : amount;
    }
    if (operators.includes(keyPressed)) {
      //Some operator is pressed
      if (operators.includes(amount[amount.length - 1]))
        //If already has an operator at last place
        return amount.slice(0, amount.length - 1) + keyPressed;
      return amount + keyPressed;
    }

    if (keyPressed === ".") {
      if (_checkDecimalEligibily(amount)) {
        if (operators.includes(amount[amount.length - 1])) return amount + "0.";
        return amount + ".";
      }
      return amount;
    }
    if (keyPressed === "Z") return amount === "0" ? "0" : amount + "00";
    if (amount === "0") return keyPressed;
    return amount + keyPressed;
  };
  if (evalError) setEvalError(false);
  updateTransactionDetails(
    "amount",
    _getUpdated(transactionDetails.amount, keyPressed)
  );
  if (keyPressed === "S") {
    transactionDetails.amount = _eval(transactionDetails.amount);
    handleSubmit(transactionDetails);
  }
};
