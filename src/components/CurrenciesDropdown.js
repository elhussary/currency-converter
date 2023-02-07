import React, { useState } from "react";
import { CircleFlag } from "react-circle-flags";
import currenciesName from "../assets/currenciesName.json";
const CurrenciesDropdown = ({
  setTocurrency,
  setFromcurrency,
  fromCurrencies,
  toCurrencies,
  Fromcurrency,
  Tocurrency,
}) => {
  const [Serach, setSerach] = useState("");
  const [currencies, setCurrencies] = useState(currenciesName);

  return (
    <div className="bg-white absolute top-16 shadow-xl shadow-gray-100 z-50 py-4 h-72 overflow-hidden overflow-y-auto">
      <div className="mb-3 px-6">
        <form className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search currency"
            autoFocus
            onChange={(e) => setSerach(e.target.value)}
            className="border-none w-full focus:ring-transparent "
          />
        </form>
      </div>
      <ul>
        {currencies
          .filter((value) => {
            if (Serach === "") {
              if (toCurrencies) {
                return value.COUNTRY !== Fromcurrency.country;
              } else {
                return value.COUNTRY !== Tocurrency.country;
              }
            } else if (
              value.CurrencyCode.toLowerCase().includes(Serach.toLowerCase()) ||
              value.COUNTRY.toLowerCase().includes(Serach.toLowerCase())
            ) {
              if (toCurrencies) {
                return value.COUNTRY !== Fromcurrency.country;
              } else {
                return value.COUNTRY !== Tocurrency.country;
              }
            }
          })
          .map((currencie) => (
            <li
              setToCurrencies
              className="flex justify-between hover:bg-gray-50 p-3.5 px-6 cursor-pointer"
              onClick={() => {
                if (fromCurrencies) {
                  setFromcurrency({
                    ...currencie,
                    country: currencie.COUNTRY,
                    currency: currencie.CurrencyCode,
                    anotherCurrency: currencie.CurrencyName,
                    flag: currencie.Domain_extension,
                  });
                }
                if (toCurrencies) {
                  setTocurrency({
                    ...currencie,
                    country: currencie.COUNTRY,
                    currency: currencie.CurrencyCode,
                    anotherCurrency: currencie.CurrencyName,
                    flag: currencie.Domain_extension,
                  });
                }
              }}
            >
              <div className="flex gap-3 items-center">
                <p>
                  <CircleFlag countryCode={currencie.Domain_extension} className="w-6" />
                </p>
                <p>{currencie.COUNTRY}</p>
              </div>
              <div>
                <p>{currencie.CurrencyName}</p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CurrenciesDropdown;
