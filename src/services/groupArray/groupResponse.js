const groupResponse = {

    groupData(array, key) {
        let result = array.reduce((result, currentValue) => {
            // If an array already present for key, push it to the array. Else create an array and push the object
            (result[currentValue[key]] = result[currentValue[key]] || []).push(
                currentValue
            );
            // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
            return result;
        }, {}); // empty object is the initial value for result object
        return result
    },
    groupListByKey(array, key) {
        // Grouping the products by ecommerceCategoryID
        const groupedProducts = array.reduce((acc, product) => {
            if (!acc[product[key]]) {
                acc[product[key]] = [];
            }
            acc[product[key]].push(product);
            return acc;
        }, {});

        // Optional: Convert the object to an array of objects with labels
        const groupedProductsArray = Object.keys(groupedProducts).map(key => ({
            label: key,
            products: groupedProducts[key]
        }));
        return groupedProductsArray;
    }
}
export default groupResponse