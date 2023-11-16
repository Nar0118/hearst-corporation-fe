export const formatNumberToTerra = (number: number): string => {
  const units = [
    { value: Math.pow(10, 15), label: "PH" },
    { value: Math.pow(10, 12), label: "TH" },
  ];
  
  for (const unit of units) {
    if (number >= unit.value) {
      return (number / unit.value).toFixed(2) + unit.label;
    }
  }
  
  return number.toString();
};