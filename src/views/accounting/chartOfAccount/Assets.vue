<template>
    <div class="row">
        <div class="col-12 py-2 mt-4 account-head">Cash and Bank<i class="fa fa-question-circle-o help" aria-hidden="true"></i></div>
    </div>
    <div class="row row-border align-items-center py-2">
        <div class="col-6 col-md-2">1202</div>
        <div class="col-6 col-md-3">
            <div class="desc-head">asset bank (USD)</div>
            <div class="desc">No transaction for this account</div>
        </div>
        <div class="col-6 col-md-5">Test Account</div>
        <div class="col-6 col-md-2 text-right"><i class="fa fa-pencil" aria-hidden="true"></i></div>
    </div>
    <div class="row row-border align-items-center">
        <div class="col-6 col-md-2"></div>
        <div class="col-6 col-md-3">
            <div>Cash on Hand</div>
            <div>Last Trasaction on Jan 21st, 2021</div>
        </div>
        <div class="col-6 col-md-5">Cash you haven't deposited in the bank. Add your bank and credit card accounts to accurately categorixe transactions that aren't cash</div>
        <div class="col-6 col-md-2 text-right"><i class="fa fa-pencil" aria-hidden="true"></i></div>
    </div>
    <div class="row">
        <div class="col-10 offset-md-2 text-center text-md-left" @click="openModal">
            <div class="add-account py-2"><i class="fa fa-plus-circle"></i>&nbsp; &nbsp; Add a new Account</div>
        </div>
    </div>
    

    <div class="row">
        <div class="col-12 py-2 account-head">
            <div>Money in Transit<i class="fa fa-question-circle-o help" aria-hidden="true"></i></div>
        </div>
    </div>
    <div class="row row-border align-items-center py-2">
        <div class="col-6 col-md-2">Jewwewe</div>
        <div class="col-6 col-md-3">
            <div class="desc-head">Test3</div>
            <div class="desc">Last Trasaction on Jan 21st, 2021</div>
        </div>
        <div class="col-6 col-md-5">wewe</div>
        <div class="col-6 col-md-2 text-right"><i class="fa fa-pencil" aria-hidden="true"></i></div>
    </div>
    <div class="row">
        <div class="col-10 offset-md-2 text-center text-md-left">
            <div class="add-account py-2"><i class="fa fa-plus-circle"></i>&nbsp; &nbsp; Add a new Account</div>
        </div>
    </div>

    <div class="row">
        <div class="col-12 py-2 account-head">
            <div>Expected Payments from Customers<i class="fa fa-question-circle-o help" aria-hidden="true"></i></div>
        </div>
    </div>
    <div class="row row-border align-items-center py-2">
        <div class="col-6 col-md-2"></div>
        <div class="col-6 col-md-3">
            <div class="desc-head">Account Receivable</div>
            <div class="desc">Last Trasaction on Jan 21st, 2021</div>
        </div>
        <div class="col-6 col-md-5"></div>
        <div class="col-6 col-md-2 text-right"><i class="fa fa-pencil" aria-hidden="true"></i></div>
    </div>
    <div class="row">
        <div class="col-10 offset-md-2 text-center text-md-left">
            <div class="add-account py-2"><i class="fa fa-plus-circle"></i>&nbsp; &nbsp; Add a new Account</div>
        </div>
    </div>

    <div class="row">
        <div class="col-12 py-2 account-head">
            <div>Inventory<i class="fa fa-question-circle-o help" aria-hidden="true"></i></div>
        </div>
    </div>
    <div class="row row-border align-items-center py-2">
        <div class="col-10 offset-md-2 text-center text-md-left"> You have not added any inventory yet.</div>
    </div>
    <div v-if="false" class="row row-border align-items-center py-2">
        <div class="col-6 col-md-2"></div>
        <div class="col-6 col-md-3">
            <div class="desc-head">Account Receivable</div>
            <div class="desc">Last Trasaction on Jan 21st, 2021</div>
        </div>
        <div class="col-6 col-md-5"></div>
        <div class="col-6 col-md-2 text-right"><i class="fa fa-pencil" aria-hidden="true"></i></div>
    </div>
    <div class="row">
        <div class="col-10 offset-md-2 text-center text-md-left">
            <div class="add-account py-2"><i class="fa fa-plus-circle"></i> &nbsp; &nbsp;Add a new Account</div>
        </div>
    </div>

    <div class="row">
        <div class="col-12 py-2 account-head">
            <div>Property, Plant, Equipment<i class="fa fa-question-circle-o help" aria-hidden="true"></i></div>
        </div>
    </div>
    <div class="row row-border align-items-center py-2">
        <div class="col-10 offset-md-2 text-center text-md-left"> You have not added any inventory yet.</div>
    </div>
    <div v-if="false" class="row row-border align-items-center py-2">
        <div class="col-6 col-md-2 pl-0"></div>
        <div class="col-6 col-md-3">
            <div class="desc-head">Account Receivable</div>
            <div class="desc">Last Trasaction on Jan 21st, 2021</div>
        </div>
        <div class="col-6 col-md-5"></div>
        <div class="col-6 col-md-2 text-right"><i class="fa fa-pencil" aria-hidden="true"></i></div>
    </div>
    <div class="row">
        <div class="col-10 offset-md-2 text-center text-md-left">
            <div class="add-account py-2"><i class="fa fa-plus-circle"></i>&nbsp; &nbsp; Add a new Account</div>
        </div>
    </div>

    <div class="row">
        <div class="col-12 py-2 account-head">
            <div>Depreciation and Amortization<i class="fa fa-question-circle-o help" aria-hidden="true"></i></div>
        </div>
    </div>
    <div class="row row-border align-items-center py-2">
        <div class="col-6 col-md-2">12345</div>
        <div class="col-6 col-md-3">
            <div class="desc-head">Depreciation</div>
            <div class="desc">No transaction for this account</div>
        </div>
        <div class="col-6 col-md-5">Asset Description</div>
        <div class="col-6 col-md-2 text-right"><i class="fa fa-pencil" aria-hidden="true"></i></div>
    </div>
    <div class="row row-border align-items-center py-2">
        <div class="col-6 col-md-2">2002</div>
        <div class="col-6 col-md-3">
            <div class="desc-head">Test4</div>
            <div class="desc">No transaction for this account</div>
        </div>
        <div class="col-6 col-md-5">21212</div>
        <div class="col-6 col-md-2 text-right"><i class="fa fa-pencil" aria-hidden="true"></i></div>
    </div>
    <div class="row">
        <div class="col-10 offset-md-2 text-center text-md-left">
            <div class="add-account py-2"><i class="fa fa-plus-circle"></i>&nbsp; &nbsp; Add a new Account</div>
        </div>
    </div>

    <div class="row">
        <div class="col-12 py-2 account-head">
            <div>Vendor Payments and Vendor Credits<i class="fa fa-question-circle-o help" aria-hidden="true"></i></div>
        </div>
    </div>
     <div class="row row-border align-items-center py-2">
         <div class="col-10 offset-md-2 text-center text-md-left">You haven't added any Vendor Payments and Vendor Credits accounts yet.</div>
     </div> 
    <div v-if="false" class="row row-border align-items-center py-2">
        <div class="col-6 col-md-2">12345</div>
        <div class="col-6 col-sm-3">
            <div class="desc-head">Depreciation</div>
            <div class="desc">No transaction for this account</div>
        </div>
        <div class="col-6 col-md-5">Asset Description</div>
        <div class="col-6 col-md-2 text-right"><i class="fa fa-pencil" aria-hidden="true"></i></div>
    </div>
    <div class="row">
        <div class="col-10 offset-md-2 text-center text-md-left">
            <div class="add-account py-2"><i class="fa fa-plus-circle"></i>&nbsp; &nbsp; Add a new Account</div>
        </div>
    </div>

    <div class="row">
        <div class="col-12 py-2 account-head">
            <div>One Short-Term Asset<i class="fa fa-question-circle-o help" aria-hidden="true"></i></div>
        </div>
    </div>
    <div class="row row-border align-items-center py-2">
        <div class="col-10 offset-md-2 text-center text-md-left">You haven't added any Vendor Payments and Vendor Credits accounts yet.</div>
    </div>
    <div v-if="false" class="row row-border align-items-center py-2">
        <div class="col-6 col-md-2"></div>
        <div class="col-6 col-md-3">
            <div class="desc-head">Taxes Recoverable/Refundable</div>
            <div class="desc">No transaction for this account</div>
        </div>
        <div class="col-6 col-md-5">A tax is recoverable if ypu can deduct the tax you've paidfrom the tax you've collected. Many sales taxes are considered recoverable</div>
        <div class="col-6 col-md-2 text-right"><i class="fa fa-pencil" aria-hidden="true"></i></div>
    </div>
    <div class="row">
        <div class="col-10 offset-md-2 text-center text-md-left">
            <div class="add-account py-2"><i class="fa fa-plus-circle"></i>&nbsp; &nbsp; Add a new Account</div>
        </div>
    </div>


    <div class="row">
        <div class="col-12 py-2 account-head">
            <div>Other Long-Term Asset<i class="fa fa-question-circle-o help" aria-hidden="true"></i></div>
        </div>
    </div>
    <div class="row row-border align-items-center py-2">
        <div class="col-10 offset-md-2 text-center text-md-left">You haven't added any Vendor Payments and Vendor Credits accounts yet.</div>
    </div>
    <div v-if="false" class="row row-border align-items-center py-2">
        <div class="col-6 col-md-2"></div>
        <div class="col-6 col-md-3">
            <div class="desc-head">Taxes Recoverable/Refundable</div>
            <div class="desc">No transaction for this account</div>
        </div>
        <div class="col-6 col-md-5">A tax is recoverable if ypu can deduct the tax you've paidfrom the tax you've collected. Many sales taxes are considered recoverable</div>
        <div class="col-6 col-md-2 text-right"><i class="fa fa-pencil" aria-hidden="true"></i></div>
    </div>
    <div class="row">
        <div class="col-10 offset-md-2 text-center text-md-left">
            <div class="add-account py-2"><i class="fa fa-plus-circle"></i>&nbsp; &nbsp; Add a new Account</div>
        </div>
    </div>

    <!-- Primevue modal to add new account-->
    <!-- <h5>Modal</h5>
    <Button label="Show" icon="pi pi-external-link" /> -->
    <Dialog header="Add an Account" v-model:visible="displayModal" class="col-12 col-sm-10 col-md-6 p-0" :modal="true">
        <div class="row mt-2">
            <div class="col-12 col-md-4 align-self-center text-md-right">Account Type</div>
            <div class="col-12 col-md-6">

            <div class="codeModal">
                <div class="country-code form-control codeModal" @click="toggleCode"><div class="d-flex justify-content-between align-items-center"><span class="codeModal">Select Account Type</span><i class="pi pi-angle-down"></i></div></div>
            </div>

                <div :class=" { 'flagCode' : showCode, 'hide-code' : !showCode } " class="codeModal ">
                    <input class="codeInput input codeModal" v-model="searchText">
                <div v-for="country in countries" :key="country.id" class="codeModal" >
                    <div class="col-sm-3"><span style="display: inline-block">{{ country.name }}</span></div>
                </div>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-12 col-md-4 align-self-center text-md-right">Account Name</div>
            <div class="col-12 col-md-6">
            <input type="text" class="form-control" />
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-12 col-md-4 align-self-center text-md-right">Account Currency</div>
            <div class="col-12 col-md-6">
            <input type="text" class="form-control" />
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-12 col-md-4 align-self-center text-md-right">Account ID</div>
            <div class="col-12 col-md-6">
            <input type="text" class="form-control" />
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-12 col-md-4 align-self-center text-md-right">Description</div>
            <div class="col-12 col-md-6">
            <input type="text" class="form-control" />
            </div>
        </div>
         <template #footer>
           <!-- <Button label="No" icon="pi pi-times" @click="closeModal" class="p-button-text"/>
            <Button label="Yes" icon="pi pi-check" @click="closeModal" autofocus /> -->
            <div class="col-md-12 d-md-flex justify-content-end p-0">
                <button type="button" class="btn secondary-btn px-4" @click="closeModal">
                    Close
                </button>
                <button type="button" class="btn primary-btn px-4 mr-0 text-white">
                    Save
                </button>
            </div>
        </template>
    </Dialog>

    
</template>

<script>
import { ref } from 'vue'
import Dialog from 'primevue/dialog';
export default {
    components: { Dialog },
    setup () {
        const view = ref('view')
        const displayModal = ref(false)
        const showCode = ref(false)

        const toggleCode = () => {
            showCode.value = !showCode.value
        }
        const countries = ref( [
                {name: 'Australia', code: 'AU'},
                {name: 'Brazil', code: 'BR'},
                {name: 'China', code: 'CN'},
                {name: 'Egypt', code: 'EG'},
                {name: 'France', code: 'FR'},
                {name: 'Germany', code: 'DE'},
                {name: 'India', code: 'IN'},
                {name: 'Japan', code: 'JP'},
                {name: 'Spain', code: 'ES'},
                {name: 'United States', code: 'US'}
            ])
       const openModal = () => {
            displayModal.value = true
        }
        const closeModal = () => {
            displayModal.value = false
        }

        return {
            view, displayModal, openModal, closeModal, countries, showCode, toggleCode
        }
    }
}
</script>

<style scoped>
    .row-border {
        border-bottom: 1px solid rgb(225, 225, 225);
    }

    .account-head {
        background: #E0E7EB;
        font-weight: 800
    }

    .help {
        color: rgb(100, 100, 100);
        margin: 5px;
    }

    .desc {
        color: #190138;
        opacity: 0.6;
    }

    .desc-head {
        font-weight: 600;
    }

    .add-account {
        color: #136ACD;
        font-weight: 800
    }

    .flagCode {
        width: 140px;
        max-height: 15em;
        overflow-y: scroll;
        overflow-x: hidden;
        box-shadow: -3px 3px 15px #797e8159;
        position: absolute;
        /* top: 49.5%; */
        background: white;
        z-index: 10;

    }
    .flagCode div{
        width: 35em;      
    }
    .flagCode div:hover {
        background: rgb(238, 238, 238)
    }

    .hide-code {
  /* display: none */
  height: 0;
  overflow: hidden;
  /* transition: all 0.4s ease-in-out */
}

input.codeInput {
  width: 80%;
  margin-left: 12px;
  margin-top: 5px;
}
</style>