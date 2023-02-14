import { useState, useEffect, useRef, useContext } from 'react';
import { WebsocketContext } from '@/contexts/websocket';
import ListItem from './ListItem';

export default function ItemNow() {
  const { queue } = useContext(WebsocketContext);
  const [show, setShow] = useState(false);
  const now = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry.isIntersecting) setShow(true);
        else setShow(false);
      },
      { threshold: 0.8 }
    );
    if (now.current) {
      io.observe(now.current);
    }
    return () => io && io.disconnect();
    // eslint-disable-next-line
  }, [now.current]);

  return (
    <>
      {show && (
        <div className='fixed top-0 w-screen p-4 flex bg-neutral-300'>
          <div className='w-[480px] p-4 flex justify-between items-center gap-4'>
            <div className='font-bold whitespace-nowrap text-ellipsis overflow-hidden'>
              <a
                href={`https://youtu.be/${queue[0].id}`}
                target='_blank'
                rel='noreferrer'
                className='text-lg'
              >
                {queue[0].title}
              </a>
            </div>
            <span className='flex-none'>{queue[0].from}</span>
          </div>
        </div>
      )}
      <div ref={now}>
        <ListItem item={queue[0]} idx={0} />
      </div>
    </>
  );
}
