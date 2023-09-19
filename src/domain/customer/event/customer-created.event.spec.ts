import EventDispatcher from "../../@shared/event/event-dispatcher";
import PrintConsole1WhenCustomerCreatedEvent from "./handler/print-console1-when-customer-created.event";
import PrintConsole2WhenCustomerCreatedEvent from "./handler/print-console2-when-customer-created.event";
import Customer from "../entity/customer";
import CustomerCreatedEvent from "./customer-created.event";

describe("CustomerCreatedEvent unit tests", () => {

    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new PrintConsole1WhenCustomerCreatedEvent();
        const eventHandler2 = new PrintConsole2WhenCustomerCreatedEvent();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);
    });

    it("should notify all event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new PrintConsole1WhenCustomerCreatedEvent();
        const eventHandler2 = new PrintConsole2WhenCustomerCreatedEvent();
        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);

        const customer = new Customer("1", "Customer");
        const customerCreatedEvent = new CustomerCreatedEvent(customer);

        eventDispatcher.notify(customerCreatedEvent);
        expect(spyEventHandler1).toHaveBeenCalled()
        expect(spyEventHandler2).toHaveBeenCalled()
    });

});