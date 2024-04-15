// 'DOMContentLoaded'
document.addEventListener('DOMContentLoaded', async () => {
    
  try {
    const response = await fetch('/api/products');
    const data = await response.json();
    const tableBody = document.getElementById('table-body');
    const curBody = document.getElementById('cur-body');
    
    /* 
    const v = {
      vv: document.getElementById('banned').value,
    };
    //o.innerHTML = `<div>${v.vv}</div>`;
    */
    const string = data.crnc[0].str;  
    const num = data.crnc[1].rate;  
    console.log(string);
    
    const o = document.createElement('div');    
    o.innerHTML = `<div class="currency"><span>Currency: ${string}</span> &#124; <span>Rate: ${num}</span></div>`;
    
    //data.forEach((product, index) => { // для неименованного массива в json
    data.furnitures.forEach((product, index) => {

      //
      const currency = string;
      //const currency = v.vv;
      const formatPrice = new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency,
        currencyDisplay: 'narrowSymbol',
      }).format(product.price / num);
      // 

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${formatPrice}</td>
        <td>${product.text}</td>
        <td>${product.alt}</td>
        <td>${product.imagePath}</td>
        <td class="cell-delete">
          <button class="button-delete font-awesome-icon fas fa-trash-alt"></button>
        </td>
      `;
      tableBody.appendChild(row);
      curBody.appendChild(o);
      // второй параметр в forEach - index - если нужен порядковый номер по массиву, тогда
      // <td>${product.Id}</td> заменить на <td>${index + 1}</td>
    });
        
    const deleteButtons = document.querySelectorAll('.button-delete');
    deleteButtons.forEach(button => {
      button.addEventListener('click', () => {
        deleteRow(button);
      });
    });                                           
        
  } catch (error) {
    console.error('Error fetching data:', error);
  }
      
});
// 'DOMContentLoaded'

    
// deleteRow
async function deleteRow(button) {
  const row = button.parentElement.parentElement;
  const productName = row.querySelector('td:nth-child(2)').textContent; 
  console.log(productName);

  try {
    const response = await fetch(`/api/products/${encodeURIComponent(productName)}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      row.remove();
      location.reload();
    } else {
      console.error('Failed to delete the product.');
    }
        
  } catch (error) {
    console.error('Error deleting product:', error);
  }
      
}
// deleteRow

    
// 'addPlayerForm'
document.getElementById('addPlayerForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const newProduct = {
    id: parseInt(document.getElementById('id').value),
    name: document.getElementById('name').value,
    price: parseInt(document.getElementById('price').value),
    text: document.getElementById('text').value,
    alt: document.getElementById('alt').value,
    imagePath: document.getElementById('imagePath').value,
  };

  try {
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });

    if (response.status === 201) {
      // Успешное добавление, перезагрузить страницу или обновить данные
      location.reload();
      clearFormFields(); // Очистка полей формы
    } else {
      console.error("Failed to add product.");
    }
        
    // Очистка полей после добавления
    function clearFormFields() {
      document.getElementById('id').value = '';
      document.getElementById('name').value = '';
      document.getElementById('price').value = '';
      document.getElementById('text').value = '';
      document.getElementById('alt').value = '';
      document.getElementById('imagePath').value = '';
    }
            
  } catch (error) {
    console.error("Error adding product:", error);
  }
        
});
// 'addPlayerForm'

// 'changeCurrency'
document.getElementById('changeCurrency').addEventListener('submit', async (event) => {
  event.preventDefault();

  const newCrncValue = document.getElementById('banned').value;
  const newRate = document.getElementById('rate').value;

  try {
    const response = await fetch('/api/currency', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ str: newCrncValue, rate: newRate }),
    });

    if (response.status === 201) {
      // Успешное добавление, перезагрузить страницу или обновить данные
      location.reload();
      //clearFormFields(); // Очистка полей формы
    } else {
      console.error("Failed to add product.");
    }
            
  } catch (error) {
    console.error("Error adding product:", error);
  }
        
});
// 'changeCurrency'
        
