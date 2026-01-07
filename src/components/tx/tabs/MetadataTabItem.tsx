const MetadataTabItem = () => {
  const metadataItems = [
    {
      key: '721',
      data: {
        name: 'NFT Example',
        image: 'ipfs://...',
        description: 'Example NFT metadata'
      }
    },
    {
      key: '1337',
      data: {
        msg: 'Hello Cardano!',
        author: 'User123'
      }
    }
  ];

  return (
    <div className='flex flex-col gap-1.5'>
      {metadataItems.map((item, index) => (
        <section
          key={index}
          className='flex flex-col rounded-l border border-b border-border bg-darker px-2 py-1.5 shadow-md'
        >
          <div className='mb-1 flex items-center gap-1/2'>
            <div className='w-fit rounded-s border border-border bg-background px-1 py-1/2 text-text-xs font-medium'>
              {item.key}
            </div>
          </div>
          <div className='rounded border border-border bg-background p-2'>
            <pre className='text-xs'>{JSON.stringify(item.data, null, 2)}</pre>
          </div>
        </section>
      ))}
    </div>
  );
};

export default MetadataTabItem;
