import { useState, useEffect, useRef } from 'react';
import { WebsocketType } from '@/types';
import ListItem from './ListItem';
import ProgressBar from './ProgressBar';

export default function Now({
  queue,
  currentTime,
  duration,
  isPlay,
  send,
}: WebsocketType) {
  const [show, setShow] = useState(false);
  const [current, setCurrent] = useState(currentTime);
  const now = useRef(null);
  const timer = useRef<null | NodeJS.Timer>(null);

  useEffect(() => {
    setCurrent(currentTime);
    if (timer.current !== null) {
      clearInterval(timer.current);
      timer.current = null;
    }
    if (isPlay) timer.current = setInterval(startTimer, 1000);

    return () => {
      if (timer.current !== null) {
        clearInterval(timer.current);
        timer.current = null;
      }
    };
  }, [currentTime, isPlay]);

  const startTimer = (): void => {
    setCurrent((curr) => curr + 1);
  };

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
        <div className='fixed top-0 w-screen p-4 flex justify-center bg-neutral-300'>
          <div className='w-[480px] p-2 flex flex-col justify-center items-center gap-2'>
            <div className='w-full flex justify-between items-center'>
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
            <ProgressBar
              current={current}
              duration={duration}
              isPlay={isPlay}
            />
          </div>
        </div>
      )}
      <div ref={now} className='w-screen max-w-[480px] px-4 py-8 flex flex-col gap-6 bg-neutral-300'>
        <ProgressBar current={current} duration={duration} isPlay={isPlay} />
        <ListItem item={queue[0]} idx={0} />
      </div>
    </>
  );
}
