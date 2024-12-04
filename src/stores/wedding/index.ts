import { create } from "zustand"
import {devtools } from "zustand/middleware"
import { createPersonSlice, PersonSlice, } from "./person-slice"
import { createGuestSlice, GuestSlice} from './guest-slice';
import { createDateSlice, DateSlice } from "./data-slice";
import { ConfirmationSlice, createConfirmationSlice } from "./confirm-slice";

type ShareState = PersonSlice & GuestSlice & DateSlice & ConfirmationSlice


export const useWeddingBoundStore = create<ShareState>()(
    
    // ? (...a) rest que corresponde al set,get,store
    // ? createPersonSlice(...a) rest que corresponde a las propiedades y metodos

    devtools(
   
        (...a) =>({
        ...createPersonSlice(...a),
        ...createGuestSlice(...a),
        ...createDateSlice(...a),
        ...createConfirmationSlice(...a)
        })

    )
)
