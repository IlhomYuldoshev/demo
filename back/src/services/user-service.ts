import fs from 'fs/promises'
import path from 'path'

const dataFilePath = path.join(__dirname, '../../static/data.json');

const readDataList = async () => {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(data) as { email: string, number: string }[];
};

const userService = {
    async findUser(email: string, phone: string) {
        await new Promise(r => setTimeout(() => {
            r(1)
        }, 5000))

        const dataList = await readDataList();
        return dataList.filter(i => i.email.includes(email) && i.number.includes(phone))
    }
}

export {
    userService
}