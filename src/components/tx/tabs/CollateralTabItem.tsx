const CollateralTabItem = () => {
  const collateralData = [
    {
      address: 'addr1qxyz...abc123',
      txHash: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6',
      collateral: '5.00 ADA',
      assets: 'Asset1, Asset2'
    },
    {
      address: 'addr1qxyz...def456',
      txHash: 'k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6',
      collateral: '3.50 ADA',
      assets: 'Asset3'
    }
  ];

  return (
    <div className='overflow-x-auto'>
      <table className='w-full min-w-[800px] border-collapse'>
        <thead>
          <tr className='border-b border-border bg-darker'>
            <th className='p-2 text-left text-sm font-medium'>Address</th>
            <th className='p-2 text-left text-sm font-medium'>Transaction</th>
            <th className='p-2 text-right text-sm font-medium'>Collateral</th>
            <th className='p-2 text-right text-sm font-medium'>Assets</th>
          </tr>
        </thead>
        <tbody>
          {collateralData.map((item, index) => (
            <tr key={index} className='border-b border-border'>
              <td className='p-2 text-sm'>{item.address}</td>
              <td className='p-2 text-sm text-primary'>{item.txHash.slice(0, 20)}...</td>
              <td className='p-2 text-right text-sm'>{item.collateral}</td>
              <td className='p-2 text-right text-sm'>{item.assets}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CollateralTabItem;
