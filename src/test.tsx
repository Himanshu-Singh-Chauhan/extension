import {useDroppable} from '@dnd-kit/core';
import {useDraggable} from '@dnd-kit/core';

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/K1xQwlVURYi
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export default function Component() {

  const {isOver, setNodeRef} = useDroppable({
    id: 'droppable',
  });

  const {attributes, listeners, setNodeRef:setnodereff, transform} = useDraggable({
    id: 'draggable',
  });

  const style = {
    color: isOver ? 'green' : undefined,
  };
  return (
    <div className="flex flex-col h-screen">
      {/* <header className="h-[60px] flex items-center px-4 shadow-md">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-50">Kanban Board</h1>
      </header> */}
      <main className="flex-1 overflow-auto py-4 px-4">
        <div className="flex space-x-4">
          <div ref={setnodereff} id='123' style={style} {...listeners} {...attributes} className="w-72 bg-gray-200 p-4 rounded-lg shadow-md">
            <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">To Do</h2>
            <div className="bg-white p-3 rounded-lg shadow-sm mb-4">
              <h3 className="text-sm font-semibold mb-1">Task 1</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">This is a description for task 1.</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm mb-4">
              <h3 className="text-sm font-semibold mb-1">Task 2</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">This is a description for task 2afasdfdsf.</p>
            </div>
          </div>
          <div ref={setNodeRef} id='345' className="w-72 bg-gray-200 p-4 rounded-lg shadow-md">
            <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">In Progress</h2>
            <div className="bg-white p-3 rounded-lg shadow-sm mb-4">
              <h3 className="text-sm font-semibold mb-1">Task 3</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">This is a description for task 3.</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm mb-4">
              <h3 className="text-sm font-semibold mb-1">Task 4</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">This is a description for task 4.</p>
            </div>
          </div>
          <div className="w-72 bg-gray-200 p-4 rounded-lg shadow-md">
            <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">Done</h2>
            <div className="bg-white p-3 rounded-lg shadow-sm mb-4">
              <h3 className="text-sm font-semibold mb-1">Task 5</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">This is a description for task 5.</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm mb-4">
              <h3 className="text-sm font-semibold mb-1">Task 6</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">This is a description for task 6.</p>
            </div>
          </div>
          <div className="w-72 bg-gray-200 p-4 rounded-lg shadow-md">
            <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">Done</h2>
            <div className="bg-white p-3 rounded-lg shadow-sm mb-4">
              <h3 className="text-sm font-semibold mb-1">Task 5</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">This is a description for task 5.</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm mb-4">
              <h3 className="text-sm font-semibold mb-1">Task 6</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">This is a description for task 6.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}