import { db } from '../Models/firebaseConfig'
import { Futbolista } from '../Models/Futbolista'
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'

export const createFutbolista = async (values) => {
    try{
        const canInsert = await existeOtherDorsal(values.dorsal, values.userId)
        if(canInsert) return false
        const newFutbolista = new Futbolista(values)
        await addDoc(collection(db, 'futbolistas'), newFutbolista.getValuesInJSON())
        return true
    }catch(e){
        console.log(e)
        return false
    }
}

export const getFutbolistas = async (userId) => {
    try{
        const snapshot = await getDocs(collection(db, 'futbolistas'))
        if(!snapshot.empty){
            let data = []
            snapshot.forEach(doc => {
                if(userId == doc.data().userId)
                    data.push({...doc.data(), id: doc.id})
            })
            return data
        }else{
            return []
        }
    }catch(e){
        console.log(e)
        return false
    }
}

export const updateFutbolista = async (values) => {
    try{
        await updateDoc(doc(collection(db, 'futbolistas'), values.id) ,values)
        return true
    }catch(e){
        console.log(e)
        return false
    }
}

export const deleteFutbolista = async (id) => {
    try{
        console.log(id)
        await deleteDoc(doc(collection(db, 'futbolistas'), id))
        return true
    }catch(e){
        console.log(e)
        return false
    }
}

const existeOtherDorsal = async (dorsal, userId) => {
    try{
        const snapshot = await getDocs(collection(db, 'futbolistas'))
        let exist = false
        if(!snapshot.empty){
            snapshot.forEach(doc => {
                if(doc.data().dorsal == dorsal && doc.data().userId == userId){
                    exist = true
                }
            })        
            console.log(exist)
            return exist
        }else{
            return false
        }
    }catch(e){
        console.log(e)
        return true
    }
}