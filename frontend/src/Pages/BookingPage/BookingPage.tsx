import { useParams } from "react-router-dom"

export const BookingPage = () => {
    const { concertId } = useParams();
    return <div>Concert Id: {concertId}</div>
}