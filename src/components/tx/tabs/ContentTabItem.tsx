const ContentTabItem = () => {
  return (
    <div className='flex w-full flex-col gap-1 md:flex-row'>
      <div className='flex-1'>
        <h3 className='mb-2 text-lg font-bold'>Inputs</h3>
        <div className='rounded-l border border-border bg-darker p-2'>
          <div className='mb-2'>
            <div className='text-sm font-medium'>addr1qxyz...abc123</div>
            <div className='text-xs text-grayTextPrimary'>1000.50 ADA</div>
          </div>
          <div className='mb-2'>
            <div className='text-sm font-medium'>addr1qxyz...def456</div>
            <div className='text-xs text-grayTextPrimary'>500.25 ADA</div>
          </div>
        </div>
      </div>
      <div className='flex-1'>
        <h3 className='mb-2 text-lg font-bold'>Outputs</h3>
        <div className='rounded-l border border-border bg-darker p-2'>
          <div className='mb-2'>
            <div className='text-sm font-medium'>addr1qxyz...ghi789</div>
            <div className='text-xs text-grayTextPrimary'>750.00 ADA</div>
          </div>
          <div className='mb-2'>
            <div className='text-sm font-medium'>addr1qxyz...jkl012</div>
            <div className='text-xs text-grayTextPrimary'>750.75 ADA</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentTabItem;
