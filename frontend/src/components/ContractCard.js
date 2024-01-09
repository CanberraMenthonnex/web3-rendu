import React from 'react';

const ContractCard = ({ contract }) => {
    return (
        <div className="contract-card">
            <h3>{contract.title}</h3>
            <p>{contract.description}</p>
        </div>
    );
};

export default ContractCard;