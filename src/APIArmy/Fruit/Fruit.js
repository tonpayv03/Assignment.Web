import { APIHeadQuarters } from '../APIHeadQuarters';
import { OrderDetails, OrderPostType } from '../OrderDetails';
import config from '../../Helper/config.json'

export class Fruit {

    static async AddFruit({name, imageFile}) {

        const formData = new FormData();
        formData.append('name', name);
        formData.append('imageFile', imageFile);
        this.requestUrl = config.SERVER_URL + "/Fruit/AddFruit";
        var orderDetails = new OrderDetails(this.requestUrl, formData, true, OrderPostType.POSTFROMDATA, true);
        var response = await APIHeadQuarters.ExecuteStandardOrder(orderDetails);

        return response;
    }

    static async ListAllFruit() {

        this.requestUrl = config.SERVER_URL + "/Fruit/ListAllFruit";
        var orderDetails = new OrderDetails(this.requestUrl, null, true, OrderPostType.GET, true);
        var response = await APIHeadQuarters.ExecuteStandardOrder(orderDetails);

        return response;
    }
}