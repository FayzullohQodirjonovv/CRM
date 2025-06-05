import React from 'react';
interface DashboardHomeProps {
  loggedInEmail: string; 
}

const DashboardHome: React.FC<DashboardHomeProps> = ({ loggedInEmail }) => {
  return (
      <h2 className="text-white text-3xl font-semibold mb-4">Asosiy</h2>
  );
};

export default DashboardHome;
