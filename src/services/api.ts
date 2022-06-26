import axios from "axios";

import { Food, Profile, Score } from "@/services/types";
import config from "@/config";

const HOST = config.API_URL;

export async function getProfiles(): Promise<Profile[]> {
    const response = await axios.get(`${HOST}/profiles`);
    return response.data;
}

export async function getActiveProfile(): Promise<Profile> {
    const response = await axios.get(`${HOST}/profiles/active`);
    return response.data;
}

export async function getFood(): Promise<Food[]> {
    const response = await axios.get(`${HOST}/food`);
    return response.data;
}

export async function getFoodById(id: string): Promise<Food> {
    const response = await axios.get(`${HOST}/food/${id}`);
    return response.data;
}

export async function getFoodScoreById(id: string): Promise<Score> {
    const response = await axios.get(`${HOST}/food/${id}/score`);
    return response.data;
}

export async function setActiveProfile(name: string): Promise<void> {
    await axios.post(`${HOST}/profiles/active`, { name });
}

export async function updateCustomProfile(name: string, value: number): Promise<void> {
    await axios.post(`${HOST}/profiles/custom`, { name, value });
}