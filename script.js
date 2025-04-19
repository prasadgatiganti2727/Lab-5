function isValidBill(input) {
  return /^[0-9]+(\.[0-9]+)?$/.test(input) && parseFloat(input) >= 0;
}

function calcWithTax(bill) {
  return bill + bill * 0.11;
}

function getCurrencySymbol(currency) {
  if (currency === "EUR") return "€";
  if (currency === "INR") return "₹";
  return "$";
}

function updateExtra() {
  const billInput = document.getElementById("bill2").value.trim();
  const errorDiv = document.getElementById("error");

  if (!isValidBill(billInput)) {
    errorDiv.textContent = "Please enter a valid positive number.";
    clearOutputs();
    return;
  }

  errorDiv.textContent = "";

  const bill = parseFloat(billInput);
  const tipPercent = parseFloat(document.getElementById("tipSlider2").value) || 0;
  const currency = document.getElementById("currency").value;
  const symbol = getCurrencySymbol(currency);
  const numPeople = parseInt(document.getElementById("numPeople").value) || 1;

  const tipUSD = bill * tipPercent / 100;
  const totalUSD = calcWithTax(bill) + tipUSD;

  let rate = 1;
  if (currency === "EUR") rate = 0.875;
  else if (currency === "INR") rate = 86.08;

  const tipConverted = tipUSD * rate;
  const totalConverted = totalUSD * rate;
  const splitAmount = totalConverted / numPeople;

  document.getElementById("tipDisplay2").textContent = tipPercent + "%";
  document.getElementById("withTax2").value = "$" + calcWithTax(bill).toFixed(2);
  document.getElementById("convertedTip").value = symbol + tipConverted.toFixed(2);
  document.getElementById("convertedTotal").value = symbol + totalConverted.toFixed(2);
  document.getElementById("splitAmount").value = symbol + splitAmount.toFixed(2);

  speak(`Each person should pay ${symbol}${splitAmount.toFixed(2)}`);
}

function clearOutputs() {
  document.getElementById("withTax2").value = "";
  document.getElementById("convertedTip").value = "";
  document.getElementById("convertedTotal").value = "";
  document.getElementById("splitAmount").value = "";
}

function resetFields() {
  document.getElementById("bill2").value = "";
  document.getElementById("withTax2").value = "";
  document.getElementById("convertedTip").value = "";
  document.getElementById("convertedTotal").value = "";
  document.getElementById("tipSlider2").value = 0;
  document.getElementById("tipDisplay2").textContent = "0%";
  document.getElementById("numPeople").value = 1;
  document.getElementById("splitAmount").value = "";
  document.getElementById("error").textContent = "";
}

function speak(text) {
  const synth = window.speechSynthesis;
  if (synth.speaking) synth.cancel(); // Stop current speech
  const utterance = new SpeechSynthesisUtterance(text);
  synth.speak(utterance);
}

// Event Listeners
document.getElementById("bill2").addEventListener("input", updateExtra);
document.getElementById("tipSlider2").addEventListener("input", updateExtra);
document.getElementById("currency").addEventListener("change", updateExtra);
document.getElementById("numPeople").addEventListener("input", updateExtra);
document.getElementById("resetBtn").addEventListener("click", resetFields);
