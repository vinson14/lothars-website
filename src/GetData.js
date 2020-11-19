import { GoogleSpreadsheet } from "google-spreadsheet";
import creds from "./creds.json";

class GetData {
    constructor() {
        this.creds = creds;
        this.sheetId = "1LecKPSvqSl2zVS5qX2g-P36AZtB23co7VpTc-hczxiU";
        this.doc = new GoogleSpreadsheet(this.sheetId);
    }

    load = async () => {
        await this.doc.useServiceAccountAuth(this.creds);
        await this.doc.loadInfo();
        this.sheet = this.doc.sheetsByIndex[0];
    };

    totalDistance = async () => {
        let rows = await this.sheet.getRows();
        let totalDistance = 0;
        rows.forEach((row) => {
            totalDistance += parseFloat(row.distance);
        });
        return totalDistance;
    };

    addDistance = async (distance) => {
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        const newRow = await this.sheet.addRow({
            date: `${day} ${month} ${year}`,
            distance: distance,
        });
        return this.totalDistance();
    };
}

export default GetData;
