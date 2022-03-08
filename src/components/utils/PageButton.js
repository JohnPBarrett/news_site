import React from 'react';
import randomKey from '../../utils/randomKeyGenerator';
import './PageButton.css';

export default function PageButton(props) {
  const { pageButtonsLength, currentPage, setCurrentPage } = props;
  const buttons = [];

  for (let i = 1; i <= pageButtonsLength; i += 1) {
    buttons.push(i);
  }

  const handlePageChange = (event) => {
    setCurrentPage(+event.currentTarget.value);
    window.scrollTo(0, 0);
  };

  return (
    <div className="pagebutton__container">
      {buttons.map((button, idx) => (
        <button
          value={idx + 1}
          key={randomKey()}
          type="button"
          className={`btn pagebutton__button ${
            +currentPage === idx + 1 && 'pagebutton__button-active'
          }`}
          onClick={handlePageChange}
        >
          {button}
        </button>
      ))}
    </div>
  );
}
