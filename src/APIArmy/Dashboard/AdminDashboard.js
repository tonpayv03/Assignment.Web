import { APIHeadQuarters } from '../APIHeadQuarters';
import { OrderDetails, OrderPostType } from '../OrderDetails';
import config from '../../Helper/config.json'


export class AdminDashboard {

    static async ListAllPersonUser(){
        this.requestUrl = config.SERVER_URL + "/User/ListAllPersonUser";
        var orderDetails = new OrderDetails(this.requestUrl, null, false, OrderPostType.GET, true);
        var response = await APIHeadQuarters.ExecuteStandardOrder(orderDetails);

        return response;
    }

    static async ListPersonUsers({skip, take, orderBy, orderDirection}) {

        let request = { skip, take, orderBy, orderDirection }
        this.requestUrl = config.SERVER_URL + "/User/ListPersonUsers";
        var orderDetails = new OrderDetails(this.requestUrl, request, false, OrderPostType.POST, true);
        var response = await APIHeadQuarters.ExecuteStandardOrder(orderDetails);

        return response;
    }

    static async ListCompanyUsers({skip, take, orderBy, orderDirection}) {

        let request = { skip, take, orderBy, orderDirection }
        this.requestUrl = config.SERVER_URL + "/User/ListCompanyUsers";
        var orderDetails = new OrderDetails(this.requestUrl, request, false, OrderPostType.POST, true);
        var response = await APIHeadQuarters.ExecuteStandardOrder(orderDetails);

        return response;
    }
}