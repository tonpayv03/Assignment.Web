import { APIHeadQuarters } from '../APIHeadQuarters';
import { OrderDetails, OrderPostType } from '../OrderDetails';
import config from '../../Helper/config.json'

export class Register {

    static async RegisterPersonUser({cardID, dateOfBirth, name, surname, companyId, email, address, telephone}) {

        let request = { cardID, dateOfBirth, name, surname, companyId, email, address, telephone }
        this.requestUrl = config.SERVER_URL + "/User/AddPersonUser";
        var orderDetails = new OrderDetails(this.requestUrl, request, true, OrderPostType.POST, true);
        var response = await APIHeadQuarters.ExecuteStandardOrder(orderDetails);

        return response;
    }

    static async RegisterCompanyUser({taxID, companyName, email, address, telephone}) {

        let request = { taxID, companyName, email, address, telephone }
        this.requestUrl = config.SERVER_URL + "/User/AddCompanyUser";
        var orderDetails = new OrderDetails(this.requestUrl, request, true, OrderPostType.POST, true);
        var response = await APIHeadQuarters.ExecuteStandardOrder(orderDetails);

        return response;
    }

    static async GetCompaniesChoice(){
        this.requestUrl = config.SERVER_URL + "/User/ListAllCompanyUser";
        var orderDetails = new OrderDetails(this.requestUrl, null, true, OrderPostType.GET, false);
        var response = await APIHeadQuarters.ExecuteStandardOrder(orderDetails);

        return response;
    }
}