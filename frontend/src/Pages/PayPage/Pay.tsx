import { useParams } from "react-router-dom"

export const Pay = () => {
    const { bookingId } = useParams();
    return <h2>Booking id for pay: {bookingId}</h2>
}