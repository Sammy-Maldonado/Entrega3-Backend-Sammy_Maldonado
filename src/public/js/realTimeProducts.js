const socket = io();

socket.on('products', data => {
    const finalContent = document.getElementById('productsContent');
    let content = "";
    data.forEach(product => {
        content+=`<li>Id: ${product.id} - ${product.title} - $${product.price}</li>`
    })
    finalContent.innerHTML = content;
})