import React, { useEffect, useState } from "react";
import FromCurrency from "./components/From/FromCurrency";
import ToCurrency from "./components/To/ToCurrency";
import axios from "axios";
import Navbar from "./components/Layout/Navbar";

function App() {
  const [fromCurrencies, setFromCurrencies] = useState(false);
  const [toCurrencies, setToCurrencies] = useState(false);

  const [value, setValue] = useState("");
  const [convertedAmount, setConvertedAmount] = useState();

  const [Fromcurrency, setFromcurrency] = useState({
    flag: "us",
    country: "United States",
    currency: "USD",
    anotherCurrency: "US Dollar",
  });

  const [Tocurrency, setTocurrency] = useState({
    flag: "eg",
    country: "Egypt",
    currency: "EGP",
    anotherCurrency: "Egyptian Pound",
  });

  useEffect(() => {
    if (fromCurrencies) {
      setFromCurrencies(false);
    }
    if (toCurrencies) {
      setToCurrencies(false);
    }
  }, [Fromcurrency, Tocurrency]);

  useEffect(() => {
    if (value > 0) {
      //Fetch API
      axios
        .get(
          `https://currency-converter18.p.rapidapi.com/api/v1/convert?from=${Fromcurrency.currency}&to=${Tocurrency.currency}&amount=${value}`,
          {
            headers: {
              "X-RapidAPI-Key": "3fdd3959bbmsh62eaec25346a4cap1f229ejsne607bd0ddfb5",
              "X-RapidAPI-Host": "currency-converter18.p.rapidapi.com",
            },
          }
        )
        .then(function (response) {
          // handle success
          setConvertedAmount(
            response.data.result.convertedAmount.toString().slice(0, 5) + " " + Tocurrency.currency
          );
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  }, [Fromcurrency.currency, Tocurrency.currency, value]);

  const HandleSwitching = () => {
    setFromcurrency(Tocurrency);
    setTocurrency(Fromcurrency);
  };
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto flex flex-col justify-center  md:pt-10">
        <header className="text-center mb-14 text-2xl md:text-3xl">
          <h1>Always get the real exchange rate</h1>
        </header>

        <section className="flex justify-center flex-wrap px-6 sm:flex-nowrap gap-8 ">
          <FromCurrency
            fromCurrencies={fromCurrencies}
            setFromCurrencies={setFromCurrencies}
            Fromcurrency={Fromcurrency}
            Tocurrency={Tocurrency}
            setFromcurrency={setFromcurrency}
            setValue={setValue}
            value={value}
          />
          <div className="translate-y-5">
            <button onClick={HandleSwitching}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
            </button>
          </div>
          <ToCurrency
            Fromcurrency={Fromcurrency}
            toCurrencies={toCurrencies}
            setToCurrencies={setToCurrencies}
            Tocurrency={Tocurrency}
            setTocurrency={setTocurrency}
            convertedAmount={convertedAmount}
          />
        </section>
      </main>
    </>
  );
}

export default App;
