export interface Order {
    id: number;
    fullName: string;
    phoneNumber: string;
    email: string;
    ticketQuantity: string;
    purchaseAmount: number;
    concertId: number;
}

export interface OrderDto {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    ticketQuantity: string;
    purchaseAmount: number;
    concertId: number;
}