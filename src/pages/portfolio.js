import React, { useState, useEffect } from "react";
import Header from "../compoent/Header";
import Card from "../compoent/card";
import InfiniteScroll from "react-infinite-scroll-component";
import Counter from "../compoent/counter";
import Aos from "aos";
import "aos/dist/aos.css";
import { ImCross } from "react-icons/im";
import axios from "axios";
import "./portfolio.css";

const Portfolio = () => {
  const [data, setData] = useState([]);
  const [ArrayData, setArrayData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [debounceTime, setDebounceTime] = useState(0);
  // const [lowerLimit, setLowerLimit] = useState(0);
  const [page, setPage] = useState(1);
  const [selectCard, setSelectCard] = useState("");
  const [unit, setUnit] = useState(0);

  /*HandleInput function  will update searchText state value with 
  serach text value of input box.*/

  const HandleInput = (value) => {
    setSearchText(value);
  };

  /*HandleSelectCard function fetch data of select item or clicked item 
  and store it in the selectCard state variable.*/

  const HandleSelectCard = async (value) => {
    const result = await axios.get(
      `https://api.mfapi.in/mf/${value.schemeCode}`
    );
    setSelectCard(result.data);
    Aos.init({ duration: 1000 });
  };

  /*buyFn function update value of SelectCard state variable 
  with empty string ('') and print alert message.*/

  const buyFn = () => {
    alert("you have succesfully buy the Mutual Fund");
    setSelectCard("");
  };

  /*sellFn function update value of SelectCard state variable 
  with empty string ('') and print alert message.*/

  const sellFn = () => {
    alert("you have succesfully sell the Mutual Fund");
    setSelectCard("");
  };

  //cancleFn function update value of SelectCard state variable with empty string ('').

  const cancleFn = () => {
    setSelectCard("");
  };

  /*fetchData function fetch the all data or fetch data based on search text. 
  and whatever data we fetch, set it as a value of data state variable. 
  and also set the first 30 items of fetch data as a value of ArrayData state Value*/

  const fetchData = async (searchText) => {
    let url = "https://api.mfapi.in/mf";

    if (searchText) {
      url = `${url}/search?q=${searchText}`;
    }
    const obj = await axios.get(url);
    const result = obj.data;
    setData(result);
    const sliceArray = result.slice(0, 30);
    setArrayData(sliceArray);
  };

  /*Run the  callBack function 'fetchData' only one time when web page loads.*/
  useEffect(() => {
    fetchData();
  }, []);

  /*Runs the useEffect function when the searchText state changed.
   I have added debouncing in function. 
   so, that when user stop typing text for 800ms, the fecthing data function execute */

  useEffect(() => {
    if (debounceTime > 0) {
      clearTimeout(debounceTime);
    }

    const timer = setTimeout(() => {
      fetchData(searchText);
    }, 800);

    setDebounceTime(timer);
  }, [searchText]);

  /*this useEffect function runs when the page state valriable changed.
  it will combine the ArrayData and next 30 items and store it 
  in result variable and then set that result value as new value on ArrayData */

  useEffect(() => {
    const result = data.slice(ArrayData.length, page * 30);
    setArrayData([...ArrayData, ...result]);
  }, [page]);

  /*it will count the total unit present in portfolio when the ArrayData variabl changed*/

  useEffect(() => {
    let count = ArrayData.length;
    setUnit(count);
  }, [ArrayData]);

  return (
    <>
      <Header />
      <div className={selectCard ? "portfolio" : "PortfoilioBody"}>
        <input
          className="Input"
          type="text"
          value={searchText}
          placeholder="Search"
          onChange={(e) => HandleInput(e.target.value)}
        />
        <InfiniteScroll
          dataLength={ArrayData.length}
          next={() => setPage(page + 1)}
          hasMore={ArrayData.length !== data.length}
          loader={<h4>Loading...</h4>}
          className="infinitScroll"
        >
          {ArrayData.map((item) => (
            <Card
              name={item.schemeName}
              id={item.schemeCode}
              item={item}
              HandleSelectCard={HandleSelectCard}
            />
          ))}
        </InfiniteScroll>
        <hr className="Divider" />
        <div className="total">
          <h2 className="Unit">Total Unit</h2>
          <h2 className="Unit">{unit}</h2>
        </div>
      </div>

      {selectCard && (
        <div className="content">
          <div className="Item-Popup" data-aos="zoom-in">
            <button className="crossIcon" onClick={cancleFn}>
              <ImCross />
            </button>
            <div className="headingName">{selectCard.meta.scheme_name}</div>
            <hr className="Divider" />
            <table className="category">
              <tr>
                <td className="heading">Scheme_Category:-</td>
                <td>{selectCard.meta.scheme_category}</td>
              </tr>
              <hr className="tableDivider" />
              <tr>
                <td className="heading">Scheme_Type:-</td>
                <td>{selectCard.meta.scheme_type}</td>
              </tr>
              <hr className="tableDivider" />
              <tr>
                <td className="heading">Fund_House:-</td>
                <td>{selectCard.meta.fund_house}</td>
              </tr>
              <hr className="tableDivider" />
              <tr>
                <td className="heading">Latest NAV:-</td>
                <td>{selectCard.data[0].nav}</td>
              </tr>
              <hr className="tableDivider" />
              <tr>
                <td className="heading">Latest NAV Date:-</td>
                <td>{selectCard.data[0].date}</td>
              </tr>
              <hr className="tableDivider" />
              <tr>
                <td className="heading">Available Units:-</td>
                <td>10</td>
              </tr>
            </table>
            <hr className="Divider" />
            <div className="counter">
              <Counter />
            </div>
            <div class="buysell-button">
              <button className="Buy-button" onClick={buyFn}>
                Buy
              </button>
              <button className="Sell-button" onClick={sellFn}>
                Sell
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Portfolio;
