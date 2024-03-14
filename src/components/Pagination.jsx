
export default function Pagination({ currentPage, totalPages, setCurrentPage }) {
  return (
    <div className="flex justify-between mt-4">
      <div>
        <span className="mr-2">Page {currentPage} of {totalPages}</span>
        <button
          className="px-2 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded mr-2"
          onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button
          className="px-2 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
          onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div> 
  )
}
