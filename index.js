const url =
  "https://card.wb.ru/cards/v1/detail?appType=1&curr=rub&dest=-2133463&spp=27&nm=190456385;166416619;160738996;183270278;183269075;183266945;166417437;146972802;190879343;178144226;178142953;183271022;182770058;160737571;189785767;36328331;154611222;190627235;160740830;173462958;67508839";
const KazanWB = 117986;
const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

fetch(url, options)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    let products = data.data.products;

    const stockInfo = [];
    products.forEach((product) => {
      const art = product.id;
      const stock = {};

      product.sizes.forEach((size) => {
        size.stocks.forEach((stockItem) => {
          if (stockItem.wh === KazanWB) {
            stock[size.origName] = stockItem.qty;
          }
        });
      });

      if (Object.keys(stock).length > 0) {
        stockInfo.push({
          art: art,
          stock: stock,
        });
      }
    });
    console.log(stockInfo);
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
