import axios from 'axios';

const url = "footballcompendium.azurewebsites.net/stadia"

describe("The router", () => {
    test("The get route", async () => {
        const res = await axios.get(url)

        expect(res).toBeTruthy();
        expect(res.status).toBe(200);
        expect(res.data).toEqual("hello")
    })
})