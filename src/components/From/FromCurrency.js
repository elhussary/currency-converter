import React, { useState } from "react";
import { CircleFlag } from "react-circle-flags";
import CurrenciesDropdown from "../CurrenciesDropdown";
const FromCurrency = ({
  fromCurrencies,
  setFromCurrencies,
  Fromcurrency,
  setFromcurrency,
  setValue,
  value,
  Tocurrency,
}) => {
  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setValue(value);
  };
  return (
    <div className="w-full relative">
      <p className="text-sm text-gray-400">From</p>
      <div
        className={`flex justify-between border-b-2 border-gray-100 ${
            fromCurrencies ? "border-blue-500" : ""
        } p-1 cursor-pointer mb-3`}
        onClick={() => setFromCurrencies(!fromCurrencies)}
      >
        <p>
          {Fromcurrency.currency} - {Fromcurrency.anotherCurrency}
        </p>
        <div className="flex gap-1.5 items-center">
          <p>
            <CircleFlag countryCode={Fromcurrency.flag} className="w-6" />
          </p>
          <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </p>
        </div>
      </div>
      <div>
        <input
          type="text"
          className="border-none w-full focus:ring-0 p-6 text-6xl"
          autoFocus
          placeholder="0"
          value={value}
          onChange={handleChange}
        />
      </div>
      {fromCurrencies && (
        <CurrenciesDropdown
          setFromcurrency={setFromcurrency}
          fromCurrencies={fromCurrencies}
          Tocurrency={Tocurrency}
        />
      )}
    </div>
  );
};

export default FromCurrency;
