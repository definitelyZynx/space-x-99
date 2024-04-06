import { useEffect, useState } from "react";
import { LaunchCard } from "./components/LaunchCard";
import { fetchData } from "./utilities/ApiData";
import { useIntersectionObserver } from "./hooks/useIntersectionObserver";

import "./App.css";
function App() {
  const NOIMAGE_LINK =
    "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";

  const [allData, setAllData] = useState([]);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [hasNextPage, setHasNextPage] = useState(true);

  useEffect(() => {
    fetchData().then((response) => {
      setAllData(response);
      setIsLoading(false);

      getDataToDisplay(response);
    });
  }, []);

  useEffect(() => {
    setFilteredData(
      data.filter((item) =>
        item.name.toLowerCase().includes(searchInput.toLowerCase())
      )
    );
  }, [data, searchInput]);

  const handleSearchInputChange = (event) => setSearchInput(event.target.value);

  const getDataToDisplay = (dataToDisplay, skip = 0, limit = 10) => {
    if(dataToDisplay.length <= skip + limit){
      setHasNextPage(false);
    }

    const currentData = dataToDisplay.slice(skip, skip + limit);

    setData(skip === 0 ? currentData : (prevData) => [...prevData, ...currentData]);
    setIsLoading(false);
  };

  const lastProductRef = useIntersectionObserver(() => {
    if(!searchInput){
      setIsLoading(true);

      if (!isLoading && hasNextPage) {
        setTimeout(() => {
          setIsLoading(false);
          getDataToDisplay(allData, data.length);
        }, 1000)
      }
    }
    
  }, [hasNextPage, !isLoading]);

  return (
    <div className="px-2 md:px-52 py-8 w-full min-h-full bg-slate-100 flex flex-col items-center">
      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2e/SpaceX_logo_black.svg" className="ml-10 mb-5 w-[300px]" />
      <div className="w-full min-h-full p-5">
        <input
          className="w-full border border-slate-300 py-2 px-3 outline-none rounded-[4px]"
          placeholder="Enter keywords..."
          value={searchInput}
          onChange={handleSearchInputChange}
        />

        <div className="w-full border border-slate-300 rounded-[4px] bg-white mt-6 p-8">
          <div className="flex flex-col gap-9 md:gap-6">
            {filteredData.map((data, index, datas) => {
              const launchTitle = data.flight_number + ": " + data.name;
              return (
                <LaunchCard
                  ref={datas.length - 1 === index ? lastProductRef : null}
                  key={index}
                  image={data.links.flickr.original[0] || NOIMAGE_LINK}
                  title={launchTitle}
                  details={data.details}
                />
              );
            })}
          </div>
          {isLoading && (
            <div className="w-full pt-12 flex flex-col justify-center items-center flex-1">
              <div className="w-12 h-12 rounded-full animate-spin border-8 border-solid border-[#101727]  border-t-transparent"></div>
              <p className="font-medium ml-1 mt-2">Please wait...</p>
            </div>
          )}
          {!hasNextPage && (
            <div>
              <p className="font-medium ml-1 mt-2">No more data.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
