/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */

// const CategoryForm = ({ handleSubmit, value, setValue }) => {

//     return (
//         <>
//             <form onSubmit={handleSubmit} className="flex items-center space-x-4">
//                 <input 
//                     type="text" 
//                     className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
//                     placeholder="Enter new Category"
//                     value={value}
//                     onChange={e => setValue(e.target.value)} 
//                 />
//                 <button 
//                     type="submit" 
//                     className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                 >
//                     Submit
//                 </button>
//             </form>
//         </>
//     );
// };

// export default CategoryForm;

const CategoryForm = ({ handleSubmit, value, setValue }) => {
    return (
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col sm:flex-row gap-4">
          <input 
            type="text" 
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800" 
            placeholder="Enter new Category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button 
            type="submit" 
            className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors whitespace-nowrap"
          >
            Add Category
          </button>
        </div>
      </form>
    );
  };
  
  export default CategoryForm;
