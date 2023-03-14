import "./cssFiles/ticketPreview.css"

const TicketPreview = ({previewTicket}) => {

    let status = null;
    if (previewTicket.open){
        status = "Open"
    } else {
        status = "Closed"
    }
    return (
        <div className="ticketView">
            <h1 className="previewTitle">{previewTicket.title}</h1>
            <h3 className="previewLocation">Located at: previewTicket.location</h3>
            <p className="previewTime">Ticket created on: {previewTicket.createdAt}</p>
            <p className="previewDescription">{previewTicket.description}</p>
            <p className="previewStatus">Status: {status}</p>
        </div>
    );
}

export default TicketPreview;