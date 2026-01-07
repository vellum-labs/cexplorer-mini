const WithdrawalsTabItem = () => {
  const withdrawalsData = [
    {
      address: 'stake1uxyz...abc123',
      amount: '125.50 ADA'
    },
    {
      address: 'stake1uxyz...def456',
      amount: '75.25 ADA'
    }
  ];

  return (
    <div className='overflow-x-auto'>
      <table className='w-full min-w-[500px] border-collapse'>
        <thead>
          <tr className='border-b border-border bg-darker'>
            <th className='p-2 text-left text-sm font-medium'>Address</th>
            <th className='p-2 text-right text-sm font-medium'>Amount</th>
          </tr>
        </thead>
        <tbody>
          {withdrawalsData.map((item, index) => (
            <tr key={index} className='border-b border-border'>
              <td className='p-2 text-sm'>{item.address}</td>
              <td className='p-2 text-right text-sm'>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WithdrawalsTabItem;
