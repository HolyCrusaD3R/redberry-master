import AddData from "./AddData";
import Filters from "./Filters";

function FiltersBar(){
    return (
        <div className="h-[47px] flex flex-row justify-between">
            <Filters />
            <AddData />
        </div>        
    );
}

export default FiltersBar;