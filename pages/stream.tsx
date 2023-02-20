import { useWebsocket } from '@/hooks/useWebsocket';

export default function Stream() {
  const { queue } = useWebsocket('stream');

  return (
    <div
      className='w-[600px] h-[240px] p-12 flex justify-center items-center
                  rounded-tr-3xl bg-neutral-700'
    >
      <div className='w-full flex flex-col justify-center gap-6 text-neutral-100'>
        <span>{queue[0].title}</span>
        <div className='w-full flex justify-between'>
          <span>{queue[0].channel}</span>
          <span>{queue[0].from}</span>
        </div>
      </div>
    </div>
  );
}
