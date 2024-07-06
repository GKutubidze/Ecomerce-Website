import { createContext, useContext, useEffect, useState } from "react";
import { Country } from "../Types/Types";
import axios from "axios";
interface CountryContextType {
  countries: Country[];
  selectedCountry: string;
  selectedCity: string;
  cities: string[];
  handleCountryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleCityChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  zipcode: string;
  setZipcode: React.Dispatch<React.SetStateAction<string>>;
}
const CountryContext = createContext<CountryContextType | undefined>(undefined);

export const CountryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [zipcode, setZipcode] = useState<string>("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://countriesnow.space/api/v0.1/countries"
        );
        setCountries(response.data.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const countryName = event.target.value;
    setSelectedCountry(countryName);

    const country = countries.find((item) => item.country === countryName);
    if (country) {
      setCities(country?.cities);
    }
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
  };

  return (
    <CountryContext.Provider
      value={{
        countries,
        selectedCountry,
        selectedCity,
        cities,
        handleCountryChange,
        handleCityChange,
        zipcode,
        setZipcode,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = (): CountryContextType => {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error("useCountry must be used within a CountryProvider");
  }
  return context;
};
