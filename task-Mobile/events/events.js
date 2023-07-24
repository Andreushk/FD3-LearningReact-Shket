/* import Events */
import EventEmitter from "events";


export const clientsTableEvents = new EventEmitter();

export const filterOption = "filterOption";

export const deleteClient = "deleteClient";

export const editClient = "editClient";
export const saveEditedClientData = "saveEditedClientData";

export const addClient = "addClient";
export const cancelAddingClient = "cancelAddingClient";
export const saveAddingClient = "saveAddingClient";