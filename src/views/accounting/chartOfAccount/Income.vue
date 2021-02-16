<template>
    <div class="row">
        <div class="col-12 py-2 mt-4 account-head">Credit Card<i class="fa fa-question-circle-o help" aria-hidden="true"></i></div>
    </div>
    <div v-if="false" class="row row-border align-items-center py-2">
        <div class="col-10 offset-md-2 text-center text-md-left">You haven't added any credit card  yet.</div>
    </div>
    <div class="row row-border align-items-center py-2">
        <div class="col-6 col-md-2"></div>
        <div class="col-6 col-md-3">
            <div class="desc-head">Job Income</div>
            <div class="desc">No transaction for this account</div>
        </div>
        <div class="col-6 col-md-5">Income received for jobs or projects you perfomed.</div>
        <div class="col-6 col-md-2 text-right"><i class="fa fa-pencil" aria-hidden="true"></i></div>
    </div>
    
    <div class="row">
        <div class="col-10 offset-md-2 text-center text-md-left">
            <div class="add-account py-3"><i class="fa fa-plus-circle"></i>&nbsp; &nbsp; Add a new Account</div>
        </div>
    </div>


    <div class="row">
        <div class="col-12 py-2 account-head">Discount<i class="fa fa-question-circle-o help" aria-hidden="true"></i></div>
    </div>
    <div class="row row-border align-items-center py-2">
        <div class="col-10 offset-md-2 text-center text-md-left">You haven't added any discount yet.</div>
    </div>
    <div v-if="false" class="row row-border align-items-center py-2">
        <div class="col-6 col-md-2"></div>
        <div class="col-6 col-md-3">
            <div class="desc-head">Job Income</div>
            <div class="desc">No transaction for this account</div>
        </div>
        <div class="col-6 col-md-5">Income received for jobs or projects you perfomed.</div>
        <div class="col-6 col-md-2 text-right"><i class="fa fa-pencil" aria-hidden="true"></i></div>
    </div>
    
    <div class="row">
        <div class="col-10 offset-md-2 text-center text-md-left">
            <div class="add-account py-3"><i class="fa fa-plus-circle"></i>&nbsp; &nbsp; Add a new Account</div>
        </div>
    </div>



    <div class="row">
        <div class="col-12 py-2 account-head">Other Income<i class="fa fa-question-circle-o help" aria-hidden="true"></i></div>
    </div>
    <div class="row row-border align-items-center py-2">
        <div class="col-10 offset-md-2 text-center text-md-left">You haven't added any other income yet.</div>
    </div>
    <div v-if="false" class="row row-border align-items-center py-2">
        <div class="col-6 col-md-2"></div>
        <div class="col-6 col-md-3">
            <div class="desc-head">Job Income</div>
            <div class="desc">No transaction for this account</div>
        </div>
        <div class="col-6 col-md-5">Income received for jobs or projects you perfomed.</div>
        <div class="col-6 col-md-2 text-right"><i class="fa fa-pencil" aria-hidden="true"></i></div>
    </div>
    
    <div class="row">
        <div class="col-10 offset-md-2 text-center text-md-left">
            <div class="add-account py-3"><i class="fa fa-plus-circle"></i>&nbsp; &nbsp; Add a new Account</div>
        </div>
    </div>


    <div class="row">
        <div class="col-12 py-2 account-head">Uncategorized Income<i class="fa fa-question-circle-o help" aria-hidden="true"></i></div>
    </div>
    <div v-if="false" class="row row-border align-items-center py-2">
        <div class="col-10 offset-md-2 text-center text-md-left">You haven't added any discount yet.</div>
    </div>
    <div class="row row-border align-items-center py-2">
        <div class="col-6 col-md-2"></div>
        <div class="col-6 col-md-3">
            <div class="desc-head">Uncategorized Income</div>
            <div class="desc">Last Transaction on January, 10 2021</div>
        </div>
        <div class="col-6 col-md-5">Income you haven't categorized yet. Categorized it now to keepyour records accurate.</div>
        <div class="col-6 col-md-2 text-right"><i class="fa fa-pencil" aria-hidden="true"></i></div>
    </div>
    



    <div class="row">
        <div class="col-12 py-2 account-head">Gain On Foreign Exchange<i class="fa fa-question-circle-o help" aria-hidden="true"></i></div>
    </div>
    <div v-if="false" class="row row-border align-items-center py-2">
        <div class="col-10 offset-md-2 text-center text-md-left">You haven't added any discount yet.</div>
    </div>
    <div class="row row-border align-items-center py-2">
        <div class="col-6 col-md-2"></div>
        <div class="col-6 col-md-3">
            <div class="desc-head">Gain on Foreign Exchange</div>
            <div class="desc">Last Transaction on January, 10 2021</div>
        </div>
        <div class="col-6 col-md-5">Foreign exchange gains happen when the excdhange ratebetween your business's home currency and a foreign currency transaction changes and results in a gain.</div>
        <div class="col-6 col-md-2 text-right"><i class="fa fa-pencil" aria-hidden="true"></i></div>
    </div>
    
</template>

<script>
import { ref } from 'vue'
export default {
    setup () {
        const view = ref(true)
        return {
            view
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
</style>