var InitialCount = -1;

const deleteProducts = async () => {
  const url = "https://compintnodejs-production.up.railway.app/product";

  try {
    const res = await axios.get(url);
    const products = res.data;

    for (let product of products) {
      const productId = product.id.toString();
      await axios.delete(`${url}/${productId}`);
    }
    location.reload();
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  } catch (error) {
    console.error("Error deleting products:", error);
  }
};

const checkout = async (event) => {
  //event.preventDefault(); // Prevenir la redirección por defecto del formulario

  //const url = "https://api.scanova.io/v2/qrcode/text?data=upi%3A%2F%2Fpay%3Fpa%3Dshebinjosejacob2014%40oksbi%26pn%3DTXN965654954321%26tn%3DA%26am%3D4%26cu%3DINR%26url%3Dhttps%3A%2F%2Fcoderscafe.cf%2F&size=l&error_correction=M";

  var url =
    "https://api.scanova.io/v2/qrcode/text?data=upi%3A%2F%2Fpay%3Fpa%3Dshebinjosejacob2014%40oksbi%26pn%3DTXN965654954321%26tn%3DA%26am%3D4%26cu%3DINR%26url%3Dhttps%3A%2F%2Fcoderscafe.cf%2F&size=l&error_correction=M&data_pattern=RECT&eye_pattern=TLBR_LEAF&data_gradient_style=Radial&data_gradient_start_color=%2302c8db&data_gradient_end_color=%2302c8db&eye_color_inner=%2302c8db&eye_color_outer=%2302c8db&background_color=%23ecf0f3&logo.size=15&logo.excavated=true&logo.angle=0&poster.left=50&poster.top=50&poster.size=40&poster.eyeshape=ROUND_RECT&poster.dataPattern=ROUND&format=png&apikey=eyoyiwxepkatudvfwqeezwwkxpldscxdpfmcwkpd";

  try {
    const response = await fetch(url);
    const imgBlob = await response.blob();
    const image = URL.createObjectURL(imgBlob);

    document.getElementById("qr").style.display = "block";
    document.getElementById("image").src = image;

    // Ocultar el QR después de 10 segundos y llamar a deleteProducts
    setTimeout(() => {
      document.getElementById("qr").style.display = "none";
      deleteProducts();
    }, 10000);
  } catch (error) {
    console.error("Error generating QR:", error);
  }
};

const loadProducts = async () => {
  const url = "https://compintnodejs-production.up.railway.app/product";

  try {
    const res = await axios.get(url);
    const products = res.data;
    const len = products.length;

    if (len > InitialCount + 1) {
      // Mostrar contenido relacionado con los productos
      $("#1").css("display", "none");
      $("#home").css("display", "grid");
      $("#2").css("display", "grid");
      let payable = 0;

      products.forEach((product) => {
        payable += parseFloat(product.payable);
      });

      const product = products.pop();

      // Definir la imagen basada en el nombre del producto
      let productImage;
      switch (product.name.toLowerCase()) {
        case "Atun":
          productImage = "asset/img/atun.jpg";
          break;
        case "Lechera":
          productImage = "asset/img/lechera.jpg";
          break;
        case "Rufles":
          productImage = "asset/img/ruffles.jpg"; 
          break;
        case "Doritos":
          productImage = "asset/img/doritos.jpg";
          break;
        case "Pepsi":
          productImage = "asset/img/pepsi.jpg"; 
          break;
        case "Manzana":
          productImage = "asset/img/1.jpg"; 
          break;
        case "Milky Way":
          productImage = "asset/img/milkyWay.jpg"; 
          break;
        case "Frijoles":
          productImage = "asset/img/frijoles.jpg"; 
          break;
        default:
          productImage = `asset/img/1.jpg`; // Ruta predeterminada
      }

      const x = `
                <section>
                    <div class="card card-long animated fadeInUp once">
                        <img src="${productImage}" class="album" alt="${product.name}">
                        <div class="span1">Nombre del Producto</div>
                        <div class="card__product">
                            <span>${product.name}</span>
                        </div>
                        <div class="span2">Por Unidad</div>
                        <div class="card__price">
                            <span>${product.price}</span>
                        </div>
                        <div class="span3">Unidades</div>
                        <div class="card__unit">
                            <span>${product.taken} ${product.unit}</span>
                        </div>
                        <div class="span4">A Pagar</div>
                        <div class="card__amount">
                            <span>${product.payable}</span>
                        </div>
                    </div>
                </section>
            `;

      document.getElementById("home").innerHTML += x;
      document.getElementById("2").innerHTML = `PAGAR $${payable}`;
      InitialCount += 1;
    }
  } catch (error) {
    console.error("Error loading products:", error);
  }
};

// Listener para cargar productos al iniciar la página
window.onload = () => {
  setInterval(function () {
    loadProducts();
  }, 1000);
};
