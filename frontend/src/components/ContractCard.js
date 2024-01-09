import React from 'react';
import '../styles/_contractCard.scss';
const ContractCard = ({ contract }) => {
  return (
    <div className="contract-card">
      <img
        className="contract-card__image"
        src={
          'img/contract-' + (Math.floor(Math.random() * (3 - 1)) + 1) + '.jpeg'
        }
        alt="contract"
      />
      <div className="contract-card__info">
        <div className="contract-card__info-text">
          <h3>{contract.title}</h3>
          <p>{contract.description}</p>
        </div>
        <button className="contract-card__info-action">Signer</button>
      </div>
    </div>
  );
};

export default ContractCard;
