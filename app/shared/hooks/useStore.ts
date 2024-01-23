'use client'

import {create, StoreApi, UseBoundStore} from 'zustand'
import {User} from "@/app/shared/models/User";
import {checkAuth} from "@/app/shared/hooks/_requests";

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

checkAuth()
    .then(user => useStore.setState({user}))
    .catch(() => useStore.setState({user: null}))

export default useStore