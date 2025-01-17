// for selection of active or inactive

import { forwardRef } from "react";
import { useId } from "react";

function Select(
  { options=[], label, className="", ...props },
  ref
) {
  const id = useId();

  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}

      <select className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} id={id} ref={ref} {...props}>

        {
            options?.map((eachOption)=>(
                <option key={eachOption}>{eachOption}</option>
            ))
        }

      </select>
    </div>
  );
};


export default forwardRef(Select)