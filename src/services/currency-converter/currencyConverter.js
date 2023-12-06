import axios from "@/gateway/backendapi";
import store from "../../store/store";

let converter = {
  async currencyConverter(amount, fromCurrencyRate, toDestinationCurrencyRate) {
    let currencyRate = store.getters.getRates
    if (Object.keys(store.getters.getRates).length > 0) { 
      currencyRate = store.getters.getRates
    } else {
      await axios.get("/fxRates")
          .then((res) => {
            currencyRate = res.data;
          })
          .catch((err) => {
            console.error(err)
          });
    }
        
    
    let propertyArr = Object.keys(currencyRate);
    let valueArr = Object.values(currencyRate);
    let fromIndex = propertyArr.indexOf(fromCurrencyRate);
    let fromRate = valueArr[fromIndex];
    let toIndex = propertyArr.indexOf(toDestinationCurrencyRate);
    let toRate = valueArr[toIndex];
    let result = (amount / fromRate) * toRate;
    return result;
  },
  async convertCurrencyTo(amount, fromCurrencyRate, toDestinationCurrencyRate) {
    let currencyRate = {...store.getters.getRates};
    if (currencyRate && currencyRate.length > 0) {
      currencyRate = store.getters.getRates;
    } else {
      currencyRate = await this.getConversionData();
    }
    let propertyArr = Object.keys(currencyRate);
    let valueArr = Object.values(currencyRate);
    let fromIndex = propertyArr.indexOf('usd'+fromCurrencyRate);
    let fromRate = valueArr[fromIndex];
    return fromRate * amount;
  },

  conversionData: {},

  getConversionData() {
    let vm = this;
    return new Promise((resolve, reject) => {
      if (vm.conversionData.usdngn) {
        resolve(vm.conversionData);
      } else {
        axios
          .get("/fxRates")
          .then((res) => {
            vm.conversionData = res.data;
            resolve(res.data);
          })
          .catch((err) => {
            if (err.response) {
              reject(err.response);
            } else {
              reject(err);
            }
          });
      }
    });
  },
};

export default converter;
