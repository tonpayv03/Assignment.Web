import axios from "axios";
import { FullWaitingSign } from "../ActionsTrigger/Loader/FullWaitingSign";
import { OrderPostType } from "./OrderDetails";
import SwalFire from '../Helper/SwalFire'
import { faL } from "@fortawesome/free-solid-svg-icons";

export class APIHeadQuarters {

    static async ExecuteStandardOrder(orderDetails) {
       
        try {
            
            if (orderDetails.hasLoading) {
                await FullWaitingSign.Show();
            }
            
            console.log('request', orderDetails.requestJson)
            var res = null;

            try {

                if (orderDetails.requestMethod == OrderPostType.POST) {
                    console.log('POST')
                    res = await axios.post(orderDetails.requestUrl, orderDetails.requestJson, { withCredentials: true, validateStatus: false });
                } else if (orderDetails.requestMethod == OrderPostType.GET) {
                    console.log('GET')
                    res = await axios.get(orderDetails.requestUrl, { withCredentials: true, validateStatus: false });
                } else if (orderDetails.requestMethod == OrderPostType.POSTFROMDATA) {

                    console.log('POSTFROMDATA', orderDetails.requestJson)
                    res = await axios.post(orderDetails.requestUrl, orderDetails.requestJson, { withCredentials: true, validateStatus: false, headers: { 'content-type': 'multipart/form-data' } });
                }
                console.log('response', res);
            } catch (error) {
                console.log('error', error);
                await this.WatingSignRemove(orderDetails.hasLoading)
                if (await SwalFire(error)) {
                    return null;
                }
            }

            if (!res.data.isSuccess) {
                await this.WatingSignRemove(orderDetails.hasLoading)
                if (orderDetails.showError) {
                    if (await SwalFire(res.data.errorMessage)) {
                        return res.data ?? null;
                    }
                } else {
                    return res.data ?? null;
                }

            }

            return res.data;

        } catch (e) {
            console.log('APIArmy error', e);
            await this.WatingSignRemove(orderDetails.hasLoading)
            if (await SwalFire('APIArmy error: ' + e.message)) {
                return null;
            }

        } finally { 
            this.WatingSignRemove(orderDetails.hasLoading)
        }
    }

    static async WatingSignRemove(hasLoading) {
        if (hasLoading) {
            await FullWaitingSign.Remove();
        }
    }
}