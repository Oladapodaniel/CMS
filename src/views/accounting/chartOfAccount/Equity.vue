<template>
    <div class="row">
        <div class="col-12 py-2 mt-4 account-head">Business Owner Contribution and Drawing<i class="fa fa-question-circle-o help" aria-hidden="true"></i></div>
    </div>
    <div v-if="false" class="row row-border align-items-center py-2">
        <div class="col-10 offset-md-2 text-center text-md-left">You haven't added any discount yet.</div>
    </div>
    <div class="row row-border align-items-center py-2">
        <div class="col-6 col-md-2"></div>
        <div class="col-6 col-md-3">
            <div class="desc-head">Owner Investment / Drawings</div>
            <div class="desc">Last Transaction on January, 10 2021</div>
        </div>
        <div class="col-6 col-md-5">Owner investment reprsssent the amount of money or assets you put intp ypur business.</div>
        <div class="col-6 col-md-2 text-right"><i class="fa fa-pencil" aria-hidden="true"></i></div>
    </div>
    
    <div class="row">
        <div class="col-10 offset-md-2 text-center text-md-left">
            <div class="add-account py-3"><i class="fa fa-plus-circle"></i>&nbsp; &nbsp; Add a new Account</div>
        </div>
    </div>


    <div class="row">
        <div class="col-12 py-2 account-head">Retained Earnings: Profit<i class="fa fa-question-circle-o help" aria-hidden="true"></i></div>
    </div>
    <div v-if="false" class="row row-border align-items-center py-2">
        <div class="col-10 offset-md-2 text-center text-md-left">You haven't added any discount yet.</div>
    </div>
    <div class="row row-border align-items-center py-2">
        <div class="col-6 col-md-2"></div>
        <div class="col-6 col-md-3">
            <div class="desc-head">Owner's Equity</div>
            <div class="desc">Last Transaction on January, 10 2021</div>
        </div>
        <div class="col-6 col-md-5">Owner investment reprsssent the amount of money or assets you put intp ypur business.</div>
        <div class="col-6 col-md-2 text-right"><i class="fa fa-pencil" aria-hidden="true"></i></div>
    </div>
    
    <div class="row">
        <div class="col-10 offset-md-2 text-center text-md-left">
            <div class="add-account py-3"><i class="fa fa-plus-circle"></i>&nbsp; &nbsp; Add a new Account</div>
        </div>
    </div>
</template>

<script>
export default {
    setup () {
        return {}
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