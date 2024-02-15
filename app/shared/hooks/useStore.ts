'use client'

import {create, StoreApi, UseBoundStore} from 'zustand'
import {User} from "@/app/shared/models/User";
import {api} from "@/app/shared/config/api";
import {getOne} from "@/app/shared/_requests";

interface StoreProps {
    user: User | null,
    setUser: (user: User | null) => void
}

type WithSelectors<S> = S extends { getState: () => infer T }
    ? S & { use: { [K in keyof T]: () => T[K] } }
    : never

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(_store: S) => {
    let store = _store as WithSelectors<typeof _store>
    store.use = {}
    for (let k of Object.keys(store.getState())) {
        (store.use as any)[k] = () => store((s) => s[k as keyof typeof s])
    }
    return store
}

const useStoreBase: UseBoundStore<StoreApi<StoreProps>> = create<StoreProps>()((set): StoreProps => ({
    user: null,
    setUser(user: User | null) {
        set({user})
    },
}))

const useStore = createSelectors(useStoreBase)

const checkAuth = async () => {
    const {data: isAuthenticated} = await api.get('auth/is-authenticated')
    if (!isAuthenticated) return null
    const user = await getOne<User>('auth/profile')
    return await getOne<User>(`users/${user.id}`)
}

checkAuth()
    .then(user => useStore.setState({user}))
    .catch(() => useStore.setState({user: null}))

export default useStore