import axios from 'axios';

const url = "https://compendiumBackend.azurewebsites.net/stadia"

describe("Get all stadia", () => {
    test("Ensure connection is made", async () => {
        const res = await axios.get(url)

        expect(res).toBeTruthy();
        expect(res.status).toBe(200);
    })
    test("Validate first table row", async () => {
        const res = await axios.get(url)

        expect(res.data[0].stadium_name).toBe("Old trafford")
    })
})