function generateManipulateSale(colors, products, statuses) {
  const descriptions = [];

  for (let i = 0; i < colors.length; i++) {
    const product = products[i % products.length];
    const status = statuses[i % statuses.length];

    descriptions.push(
      `${capitalize(product)} ${capitalize(colors[i])} ${capitalize(status)}`
    );
  }

  return descriptions;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const colors = ['merah', 'kuning', 'hijau', 'pink', 'ungu'];
const products = ['baju', 'celana', 'topi', 'jaket', 'sepatu'];
const statuses = ['diskon', 'sale', 'diskon', 'sale', 'sale'];

console.log(generateManipulateSale(colors, products, statuses));

colors.push('maroon');

console.log(generateManipulateSale(colors, products, statuses));
