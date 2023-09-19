import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class PrintConsoleWhenCustomerChangeAddressEvent implements EventHandlerInterface<CustomerCreatedEvent> {
    handle(event: CustomerCreatedEvent): void {
        console.log(`Endereço do cliente ${event.eventData.id}, ${event.eventData.name} alterado para: 
        ${event.eventData.Address.street} ${event.eventData.Address.number}, ${event.eventData.Address.zip} ${event.eventData.Address.city}`);
    }

}