import React, { useState, useEffect } from 'react';
import ContractCard from '../ContractCard/ContractCard';
import '../../pages/_dashboard.scss';
import { ContractItemInterface } from '../../utils/contract.interface';

const Dashboard: React.FC = () => {
  const [contracts, setContracts] = useState<ContractItemInterface[] | null>(
    null
  );

  useEffect(() => {
    const fetchContracts = async () => {
      // const response = await fetch('');
      // const data = await response.json();
      // setContracts(data.contracts);
      setContracts([
        {
          id: 1,
          title: 'Contrat 1',
          description: 'Description du contrat 1',
        },
        {
          id: 2,
          title: 'Contrat 2',
          description: 'Description du contrat 2',
        },
        {
          id: 3,
          title: 'Contrat 3',
          description: 'Description du contrat 3',
        },
        {
          id: 4,
          title: 'Contrat 4',
          description: 'Description du contrat 4',
        },
        {
          id: 5,
          title: 'Contrat 5',
          description: 'Description du contrat 5',
        },
        {
          id: 6,
          title: 'Contrat 6',
          description: 'Description du contrat 6',
        },
      ]);
    };

    fetchContracts();
  }, []);

  return (
    <div className="dashboard">
      <h2>Contrats</h2>
      <div className="dashboard-cards">
        {contracts?.length &&
          contracts.map(contract => (
            <ContractCard key={contract.id} contract={contract} />
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
