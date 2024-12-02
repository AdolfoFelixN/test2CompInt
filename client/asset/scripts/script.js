var InitialCount = -1;

const deleteProducts = async () => {
    const url = 'https://compintnodejs-production.up.railway.app/product';

    try {
        const res = await axios.get(url);
        const products = res.data;

        for (let product of products) {
            const productId = product.id.toString();
            await axios.delete(`${url}/${productId}`);
        }
        location.reload();
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    } catch (error) {
        console.error("Error deleting products:", error);
    }
};

var checkout = async (event) => {
    event.preventDefault(); // Prevenir la redirección por defecto del formulario

    const url = "https://api.scanova.io/v2/qrcode/text?data=upi%3A%2F%2Fpay%3Fpa%3Dshebinjosejacob2014%40oksbi%26pn%3DTXN965654954321%26tn%3DA%26am%3D4%26cu%3DINR%26url%3Dhttps%3A%2F%2Fcoderscafe.cf%2F&size=l&error_correction=M";

    try {
        const response = await fetch(url);
        const imgBlob = await response.blob();
        const image = URL.createObjectURL(imgBlob);

        document.getElementById("qr").style.display = "block";
        document.getElementById("image").src = image;

        // Opcional: ocultar el QR después de 10 segundos
        setTimeout(() => {
            document.getElementById("qr").style.display = "none";
        }, 10000);
    } catch (error) {
        console.error("Error generating QR:", error);
    }

    deleteProducts();
};
