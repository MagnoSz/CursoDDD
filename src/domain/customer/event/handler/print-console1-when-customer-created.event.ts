import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class PrintConsole1WhenCustomerCreatedEvent implements EventHandlerInterface<CustomerCreatedEvent> {
    handle(event: CustomerCreatedEvent) {
        console.log('Esse é o primeiro console.log do evento: CustomerCreated.');
    }
}