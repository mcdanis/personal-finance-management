export default class Validation {
  required(param: any, text: string) {
    if (!param.trim()) {
      return `${text} name is required.`;
    }
    return "";
  }

  required2(param: any, text: string) {
    if (!param) {
      return `${text} is required.`;
    }
    return "";
  }

  isNumber(param: any, text: string) {
    if (!param || isNaN(Number(param))) {
      return `${text} must be a valid number.`;
    }
    return "";
  }

  validateAccount(formData: any) {
    const newErrors: Record<any, any> = {};

    newErrors.accountName = this.required(formData.accountName, "Account");
    newErrors.balance = this.isNumber(formData.balance, "Balance");
    newErrors.type = this.required2(formData.type, "Type");

    // setError(
    //   Object.entries(newErrors)
    //     .map(([key, value]) => `${value}`)
    //     .join("<br>")
    // );
    return Object.keys(newErrors).length <= 0;
  }
}

///

// components/MyForm.js
// import React, { useState } from "react";
// import Validation from "../utils/Validation"; // Sesuaikan path sesuai struktur folder Anda

// const MyForm = () => {
//   const [formData, setFormData] = useState({
//     accountName: "",
//     balance: "",
//     type: "",
//   });

//   const [errorMessages, setErrorMessages] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const validation = new Validation(formData);
//     validation.validateFields();

//     if (validation.hasErrors()) {
//       setErrorMessages(validation.getErrorMessages());
//     } else {
//       setErrorMessages("");
//       // Proses pengiriman data atau tindakan lainnya
//       console.log("Form data is valid:", formData);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>
//           Account Name:
//           <input
//             type="text"
//             name="accountName"
//             value={formData.accountName}
//             onChange={handleChange}
//           />
//         </label>
//       </div>
//       <div>
//         <label>
//           Balance:
//           <input
//             type="text"
//             name="balance"
//             value={formData.balance}
//             onChange={handleChange}
//           />
//         </label>
//       </div>
//       <div>
//         <label>
//           Type:
//           <input
//             type="text"
//             name="type"
//             value={formData.type}
//             onChange={handleChange}
//           />
//         </label>
//       </div>
//       <button type="submit">Submit</button>
//       {errorMessages && (
//         <div dangerouslySetInnerHTML={{ __html: errorMessages }} />
//       )}
//     </form>
//   );
// };

// export default MyForm;
