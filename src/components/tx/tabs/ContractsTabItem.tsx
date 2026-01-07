export const ContractsTabItem = () => {
  return (
    <div className='flex flex-col gap-1.5'>
      <div className='flex w-fit gap-1 rounded-max border border-border bg-darker px-1.5 py-1/2 text-text-xs font-medium shadow-md'>
        Total Script Size 25.67kB
      </div>
      <section className='flex flex-col rounded-l border border-b border-border bg-darker px-2 py-1.5 shadow-md'>
        <div className='w-fit rounded-m border border-border bg-background px-1 py-1/2 text-text-xs font-medium'>
          Script #1
        </div>
        <div className='mt-2 text-text-sm'>
          <div className='mb-2'>
            <span className='font-medium'>Contract Type:</span> Plutus V2
          </div>
          <div className='mb-2'>
            <span className='font-medium'>Script Hash:</span> a1b2c3d4e5f6g7h8i9j0
          </div>
          <div className='rounded border border-border bg-background p-2'>
            <pre className='text-xs'>Contract data...</pre>
          </div>
        </div>
      </section>
      <section className='flex flex-col rounded-l border border-b border-border bg-darker px-2 py-1.5 shadow-md'>
        <div className='w-fit rounded-m border border-border bg-background px-1 py-1/2 text-text-xs font-medium'>
          Script #2
        </div>
        <div className='mt-2 text-text-sm'>
          <div className='mb-2'>
            <span className='font-medium'>Contract Type:</span> Plutus V2
          </div>
          <div className='mb-2'>
            <span className='font-medium'>Script Hash:</span> k1l2m3n4o5p6q7r8s9t0
          </div>
          <div className='rounded border border-border bg-background p-2'>
            <pre className='text-xs'>Contract data...</pre>
          </div>
        </div>
      </section>
    </div>
  );
};
