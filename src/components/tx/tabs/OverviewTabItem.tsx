const OverviewTabItem = () => {
  return (
    <div className='relative h-[300px] max-w-desktop md:h-[600px] md:w-full'>
      <div className='flex h-full w-full items-center justify-center rounded-l border border-border bg-background p-3'>
        <div className='text-center'>
          <h3 className='mb-4 text-lg font-bold'>Transaction Flow Overview</h3>
          <div className='flex flex-col gap-4 md:flex-row md:gap-8'>
            <div className='flex-1'>
              <div className='mb-2 text-sm font-medium'>Inputs</div>
              <div className='rounded-l border border-border bg-darker p-3'>
                <div className='mb-2 text-xs'>addr1qxyz...abc123</div>
                <div className='text-xs text-primary'>1000.50 ADA</div>
              </div>
              <div className='mt-2 rounded-l border border-border bg-darker p-3'>
                <div className='mb-2 text-xs'>addr1qxyz...def456</div>
                <div className='text-xs text-primary'>500.25 ADA</div>
              </div>
            </div>
            <div className='flex items-center justify-center'>
              <div className='text-2xl text-primary'>→</div>
            </div>
            <div className='flex-1'>
              <div className='mb-2 text-sm font-medium'>Outputs</div>
              <div className='rounded-l border border-border bg-darker p-3'>
                <div className='mb-2 text-xs'>addr1qxyz...ghi789</div>
                <div className='text-xs text-primary'>750.00 ADA</div>
              </div>
              <div className='mt-2 rounded-l border border-border bg-darker p-3'>
                <div className='mb-2 text-xs'>addr1qxyz...jkl012</div>
                <div className='text-xs text-primary'>750.75 ADA</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTabItem;
