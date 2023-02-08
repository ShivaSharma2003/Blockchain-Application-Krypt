import {createContext , useState} from 'react'

export const TransactionContext = createContext()

export const TransactionProvider = () =>
{
    return (
        <TransactionContext.Provider value={""}>

        </TransactionContext.Provider>
    )
}

