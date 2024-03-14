

export default function ItemsPerPage ({ itemsPerPage, handleItemsPerPageChange }) {
  return (
    <div className="flex items-center">
      <span className="mr-2">Items per page:</span>
      <select
        className="block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        value={itemsPerPage}
        onChange={handleItemsPerPageChange}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>
    </div>
  );
};

