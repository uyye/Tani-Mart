import "./contactButton.css"

export default function ContactButton({children, phoneNumber, addressShiping, userName}) {


    const handleWhatsAppRedirect = (phoneNumber, addressShiping, userName) => {
            const formatPhone = phoneNumber.replace(/^0/,"62")
            
            const message = `Halo, saya ingin Mengonfirmasi pengiriman untuk pesanan atas nama ${userName} pada alamat ${addressShiping}.`;
            const whatsappURL = `https://wa.me/${formatPhone}?text=${encodeURIComponent(message)}`;
            console.log(whatsappURL);
            
    
            window.open(whatsappURL, "_blank");
        };

    return(
        <div>
            <button onClick={()=>handleWhatsAppRedirect(phoneNumber, addressShiping, userName)} className="contact-button">{children}</button>
        </div>
    )
}