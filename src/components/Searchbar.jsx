
export default function Searchbar({ searchTerm, handleSearchChange }) {
  return (
    <form className="mb-4">
      <div className="flex items-center mb-4">
        <input
          type="search"
          className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
    </form>  
  )
}
