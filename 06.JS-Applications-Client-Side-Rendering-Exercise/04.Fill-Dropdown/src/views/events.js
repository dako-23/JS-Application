import exportData from "../api/init.js";
import { loadOptions } from "../main.js";


export const postInfo = async (e) => {
    e.preventDefault()

    const { text } = Object.fromEntries(new FormData(e.currentTarget));

    await exportData.postData({ text });

    loadOptions()
    e.target.reset();
};