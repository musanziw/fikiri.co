import {api} from "@/app/shared/config/api";

const loadSolution = async (id: number) => {
    const {data} = await api.get(`solutions/${id}`);
    return data.data
}

const loadMappedSolution = async () => {
    const {data} = await api.get(`solutions/mapped`);
    return data.data
}

const updateSolution = async <T>(id: number, payload: T) => {
    const {data} = await api.patch(`solutions/${id}/user`, payload)
    return data.data
}

export {loadSolution, loadMappedSolution, updateSolution}