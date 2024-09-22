export default function LoadingButtons() {
    return (
        <div className='flex space-x-2 justify-center items-center dark:invert'>
            <div className='h-2 w-2 bg-cor1 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
            <div className='h-2 w-2 bg-cor1 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
            <div className='h-2 w-2 bg-cor1 rounded-full animate-bounce'></div>
        </div>
    )
}