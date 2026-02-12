import { useState } from "react";

export function ApplyButton() {
    const [isApplied, setIsApplied] = useState(false);

    const handleApplyClick = () => {
    setIsApplied(true);
  };
 
    const buttonClasses = isApplied
    ? "button-apply-job is-applied"
    : "button-apply-job";
  const buttonText = isApplied ? "Aplicado" : "Aplicar";

  return (
     <button className={buttonClasses} onClick={handleApplyClick}>
          {buttonText}
    </button>
  )
}