import React from 'react';
import './index.css'; // Assuming you store your CSS in this file

const StickyLayout: React.FC = () => {
  return (
    // <div className="page-container">
    //   {/* Left Section */}
    //   <div className="left-section">
    //     <div className="content">
    //       <h2>Left Section - Scrollable Content 1</h2>
    //       <div className="scroll-content">
    //         <p>Lots of content here...</p>
    //         <p>Keep scrolling...</p>
    //         <p>Keep scrolling...</p>
    //         <p>Keep scrolling...</p>
    //         <p>Keep scrolling...</p>
    //         <p>Keep scrolling...</p>
    //         <p>Keep scrolling...</p>
    //       </div>
    //     </div>
        
    //     <div className="content">
    //       <h2>Left Section - Scrollable Content 2</h2>
    //       <div className="scroll-content">
    //         <p>Lots of content here...</p>
    //         <p>Keep scrolling...</p>
    //         <p>Keep scrolling...</p>
    //         <p>Keep scrolling...</p>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Right Section */}
    //   <div className="right-section">
    //     <div className="content">
    //       <h2>Right Section - Sticky</h2>
    //       <p>This section will stay sticky to the top as you scroll.</p>
    //     </div>
    //   </div>
    // </div>

    <div className="campaign-details-container">
      <div className="campaign-header">
        <h1>Campaign Title</h1>
      </div>
      
      <div className="campaign-details-top">
        {/* Left Section (Main Content) */}
        <div className="campaign-details-top-left">
          <div className="content">
            <h2>Left Section - Content 1</h2>
            <div className="scroll-content">
              <p>Scrollable content...</p>
              <p>More content...</p>
            </div>
          </div>
          <div className="content">
            <h2>Left Section - Content 2</h2>
            <div className="scroll-content">
              <p>Scrollable content...</p>
            </div>
          </div>
        </div>

        {/* Right Section (Sticky Sidebar) */}
        <div className="campaign-details-top-right">
          <div className="content">
            <h2>Right Section - Sticky</h2>
            <p>This section will remain sticky at the top as you scroll the left side.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyLayout;
