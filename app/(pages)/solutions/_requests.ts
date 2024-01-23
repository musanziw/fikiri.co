import {api} from "@/app/shared/config/api";

const loadSolution = async (id: number) => {
    const {data} = await api.get(`solutions/${id}`);
    return data.data
}

const loadMappedSolution = async () => {
    const {data} = await api.get(`solutions/approved`);
    return data.data
}

export {loadSolution, loadMappedSolution}