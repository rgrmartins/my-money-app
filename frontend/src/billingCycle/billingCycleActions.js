import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { reset as resetForm, initialize } from 'redux-form'
import { showTabs, selectTab } from '../common/tab/tabActions'


const BASE_URL = 'http://localhost:3003/api'
const INITIAL_VALUES = { credits:[{}], debts: [{}] }

export function getList() {
    const request = axios.get(`${BASE_URL}/billingCycles`)
    return {
        type: 'BILLING_CYCLES_FETCHED',
        payload: request
    }
}

//Função para reaproveitar o Axios em (Create, delete e update)
//não será exportada e só será usada somente aqui neste módulo
function submit (values, method) {
    return dispatch => {
        const id = values._id ? values._id : ''
        axios[method](`${BASE_URL}/billingCycles/${id}`, values)
        .then(resp => {
            toastr.success('Sucesso', 'Operação Realizada com sucesso.')
            dispatch(init())
        })
        .catch(e => {
            e.response.data.errors.forEach(error => toastr.error('Erro', error))
        })
    }    
}

//action para usar nos formulários
export function create(values){
    return submit(values, 'post')
}

export function update (values){
    return submit(values, 'put')
}

export function remove (values){
    return submit(values, 'delete')
}

export function showUpdate(billingCycle){
    return [      
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('billingCycleForm', billingCycle)
    ]
}

export function showDelete(billingCycle){
    return [      
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('billingCycleForm', billingCycle)
    ]
}

//Como deve estar o estado inicial do cadastro
export function init(){
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getList(),
        initialize('billingCycleForm', INITIAL_VALUES)
    ]
}

