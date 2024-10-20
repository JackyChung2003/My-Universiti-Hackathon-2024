// import React, { useState } from 'react';
// import './index.css'; // Add CSS for modal styling

// interface DonationModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (donationAmount: number) => void;
// }

// const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose, onSubmit }) => {
//   const [donationAmount, setDonationAmount] = useState<number>(0);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (donationAmount > 0) {
//       onSubmit(donationAmount);
//       onClose(); // Close the modal after submission
//     } else {
//       alert('Please enter a valid donation amount.');
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <h2>Donate to Campaign</h2>
//         <form onSubmit={handleSubmit}>
//           <label htmlFor="donationAmount">Donation Amount (ETH):</label>
//           <input
//             type="number"
//             id="donationAmount"
//             name="donationAmount"
//             value={donationAmount}
//             onChange={(e) => setDonationAmount(parseFloat(e.target.value))}
//             required
//             min="0.01"
//             step="0.01"
//           />
//           <div className="modal-actions">
//             <button type="submit">Donate</button>
//             <button type="button" onClick={onClose}>
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default DonationModal;
