export default function ProgressBar({
  current,
  duration,
  isPlay,
}: {
  current: number;
  duration: number;
  isPlay: boolean;
}) {
  const formatTime = (time: number): string => {
    return `${Math.floor(time / 60)} : ${Math.floor(time % 60)
      .toString()
      .padStart(2, '0')}`;
  };
  const percent = ((current / duration) * 100).toFixed();

  return (
    <div className='w-full flex justify-between gap-4 text-sm'>
      <div className='w-full flex justify-between gap-4'>
        <span className='flex-none'>{formatTime(current)}</span>
        <div className='relative w-full border rounded-lg bg-white'>
          <div className='absolute inset-0 flex items-center'>
            <div
              className='mx-0.5 rounded-md bg-sky-300'
              style={{ width: `${percent}%`, height: '80%' }}
            />
          </div>
        </div>
        <span className='flex-none'>{formatTime(duration)}</span>
      </div>
      <div className='flex-none flex justify-between gap-4'>
        <span className='w-6'>{isPlay ? 'ON' : 'OFF'}</span>
        <button className=''>다음</button>
      </div>
    </div>
  );
}
