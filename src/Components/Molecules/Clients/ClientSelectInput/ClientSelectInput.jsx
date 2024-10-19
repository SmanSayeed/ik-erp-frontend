const ClientSelectInput = ({ name, value, onChange, options, isLoading, label }) => {
    return (
      <div className="w-full md:w-1/4 pr-4">
        <select
          name={name}
          onChange={onChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={value}
        >
          <option value="">{`Select ${label}`}</option>
          {isLoading ? (
            <option>Loading...</option>
          ) : (
            options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))
          )}
        </select>
      </div>
    );
  };
  
  export default ClientSelectInput