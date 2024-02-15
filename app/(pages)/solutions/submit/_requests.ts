import {api} from "@/app/shared/config/api";
import {Call} from "@/app/shared/models/Call";
import {Thematic} from "@/app/shared/models/Thematic";
import {Challenge} from "@/app/shared/models/Challenge";

const loadCalls = async () => {
    const {data} = await api.get('calls')
    return data.data as Call[]
}

const loadThematics = async (id: number) => {
    const {data} = await api.get(`calls/${id}`)
    return data.data.thematics as Thematic[]
}

const loadChallenges = async (id: number) => {
    const {data} = await api.get(`thematics/${id}`)
    return data.data.challenges as Challenge[]
}



export {loadCalls, loadThematics, loadChallenges}