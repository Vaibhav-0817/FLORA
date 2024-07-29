import React from "react";
import styles from "../../styles/styles";

const Sponsors = () => {
  return (
    <div
      className={`${styles.section} hidden sm:block bg-white py-10 px-5 mb-12 cursor-pointer rounded-xl`}
    >
      <div className="flex justify-between w-full">
        <div className="flex items-start">
          <img
            src="https://images.squarespace-cdn.com/content/v1/5a02606abce1766d207a3ac9/bf0f16b0-bf47-49a1-b46f-b445384fec03/LancasterFlowerCompany-color-circle.png?format=1500w"
            alt=""
            className="lg:w-40 w-24 object-contain"
          ></img>
        </div>
        <div className="flex items-start">
          <img
            src="https://images.squarespace-cdn.com/content/v1/5f849140a95d693f7acead52/1605816588739-ZULCHI62VX207IR5TWQT/fivesisters.png"
            alt=""
            className="lg:w-40 w-24 object-contain"
          ></img>
        </div>
        <div className="flex items-start">
          <img
            src="https://www.ibef.org/assets/images/startup-india-4.jpg"
            alt=""
            className="lg:w-40 w-24 object-contain"
          ></img>
        </div>
        <div className="flex items-start">
          <img
            src="https://www.balajiippractice.com/img/msme.png"
            alt=""
            className="lg:w-40 w-24 object-contain"
          ></img>
        </div>
        <div className="flex items-start">
          <img
            src="https://res.cloudinary.com/ufn/image/upload/f_auto,q_auto,fl_progressive,w_550,h_440/v1669059353/1669059353187_8.png"
            alt=""
            className="lg:w-40 w-24 object-contain"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
