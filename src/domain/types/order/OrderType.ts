import {OrderStatus} from "../../enums/OrderStatus.ts";

export class Order {
    id?: number;
    clientCPF!: string;
    orderDate!: string;
    refundCouponId?: number;
    discountCouponId?: number;
    deliveryAddress!: OrderAddress;
    contactPhoneNumber!: string;
    status?: OrderStatus ;
    items!: OrderItem[];
    paymentCards!: PaymentCard[];
    totalAmount!: number;
}

export class OrderAddress {
    id?: number;
    street!: string;
    number!: string;
    complement?: string;
    neighborhood!: string;
    city!: string;
    state!: string;
    postalCode!: string;
}

export class OrderItem {
    id?: number;
    productCode!: string;
    productName!: string;
    quantity!: number;
    productPriceAtOrder!: number;
}

export class PaymentCard {
    id?: number;
    cardNumber!: string;
    amountPaid!: number;
}


export interface OrderRequest {
    clientCPF: string;
    refundCouponId?: number;
    discountCouponId?: number;
    deliveryAddressId?: number;
    contactPhoneNumber: string;
    paymentCards: PaymentCard[];
}

export interface PaymentCardRequest {
    cardNumber: string;
    amountPaid: number;
}

export interface OrderGet{
    clientCPF: string;
    orderDate: string;
    orderId: number;
    status: OrderStatus;
    totalAmount: number;
}