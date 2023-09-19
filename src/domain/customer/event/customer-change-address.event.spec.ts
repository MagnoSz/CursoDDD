import EventDispatcher from "../../@shared/event/event-dispatcher";
import PrintConsoleWhenCustomerChangeAddressEvent from "./handler/print-console-when-customer-change-address.event";
import CustomerFactory from "../factory/customer.factory";
import Address from "../value-object/address";
import CustomerChangeAddressEvent from "./customer-change-address.event";

describe("CustomerChangeAddressEvent unit tests", () => {

    it("should create a CustomerChangeAddressEvent", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new PrintConsoleWhenCustomerChangeAddressEvent();

        eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0]).toMatchObject(eventHandler);
    });

    it("should notify a customer change address", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new PrintConsoleWhenCustomerChangeAddressEvent();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0]).toMatchObject(eventHandler);

        const address = new Address("Street", 1, "000-000", "City");
        const customer = CustomerFactory.createWithAddress("Customer", address);
        const customerChangeAddressEvent = new CustomerChangeAddressEvent(customer);

        eventDispatcher.notify(customerChangeAddressEvent);
        expect(spyEventHandler).toHaveBeenCalled();
    });

});