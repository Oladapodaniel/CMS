<template>
<!-- <div>meember data {{ memberList }}</div> -->
    <Table :data="memberList" :headers="memberHeaders" :checkMultipleItem="true"
        >
        <template #pictureUrl="{ item }">
            <el-card shadow="hover" class="c-pointer person-image" v-if="item.pictureUrl"
                style="border-radius: 50%; height: 26px; width: 26px;">
                <el-tooltip class="box-item" effect="dark" content="Click to view" placement="top-start">
                    <el-image style="border-radius: 50%; height: 26px; width: 26px;" :src="item.pictureUrl" fit="cover"
                        @click="(selectedImage = item), (imageDialog = true)" :lazy="true" />
                </el-tooltip>
            </el-card>
            <el-avatar :size="25" v-else><el-icon color="#000000">
                    <UserFilled />
                </el-icon>
            </el-avatar>
        </template>
        <template v-slot:firstName="{ item }">
            <div class="c-pointer" @click="showMemberRow(item)">{{ item.firstName }}</div>
        </template>
        <template v-slot:lastName="{ item }">
            <div class="c-pointer" @click="showMemberRow(item)">{{ item.lastName }}</div>
        </template>
        <template v-slot:mobilePhone="{ item }">
            <div class="c-pointer" @click="showMemberRow(item)">{{ item.mobilePhone }}</div>
        </template>
        <template v-slot:action="{ item }">
            <div>
                <!-- <el-dropdown trigger="click"> -->
                    
                    <!-- <template #dropdown>
                        <el-dropdown-menu> -->
                            <!-- <el-dropdown-item>Dropdown item</el-dropdown-item>
                            <el-dropdown-item>Dropdown item</el-dropdown-item>
                            <el-dropdown-item>Dropdown item</el-dropdown-item>
                            <el-dropdown-item>Dropdown item</el-dropdown-item>
                            <el-dropdown-item>Dropdown item</el-dropdown-item>
                            <el-dropdown-item>Dropdown item</el-dropdown-item>
                            <el-dropdown-item>Dropdown item</el-dropdown-item>
                            <el-dropdown-item>Dropdown item</el-dropdown-item>
                            <el-dropdown-item>Dropdown item</el-dropdown-item>
                            <el-dropdown-item>Dropdown item</el-dropdown-item>
                            <el-dropdown-item>Dropdown item</el-dropdown-item>
                            <el-dropdown-item>Dropdown item</el-dropdown-item>
                            <el-dropdown-item>Dropdown item</el-dropdown-item> -->
                            <!-- <el-dropdown-item>
                                <router-link :to="
                                    item.email
                                        ? `/tenant/email/compose?phone=${item.email}`
                                        : ''
                                " :class="{ 'fade-text': !item.email, 'text-color': item.email }">Send
                                    Email</router-link>
                            </el-dropdown-item>
                            <el-dropdown-item @click="archive(item.id, 'single')">
                                <div class="text-color">Archive</div>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <router-link :to="`/tenant/firsttimermanagement/${item.id}?memberType=1`"
                                    class="text-color">
                                    Follow Up
                                </router-link>
                            </el-dropdown-item>
                            <el-dropdown-item><router-link :to="`/tenant/people/add/${item.id}`"
                                    class="text-color">Edit</router-link></el-dropdown-item>
                            <el-dropdown-item>
                                <div @click.prevent="showConfirmModal(item.id, index)" class="text-color">Delete</div>
                            </el-dropdown-item> -->
                        <!-- </el-dropdown-menu> 
                    </template>
                </el-dropdown> -->
                <div class="dropdown">

  <el-icon data-toggle="dropdown" aria-expanded="false">
                        <MoreFilled />
                    </el-icon>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
  </ul>
</div>
            </div>
        </template>
    </Table>
</template>

<script>
import Table from "@/components/table/Table"
export default {
    components: {
        Table
    },
    data() {
        return {
            memberList: this.$store.getters['prefetchdatatest/members'],
            memberHeaders: [
                { name: 'PICTURE', value: 'pictureUrl' },
                { name: 'FIRSTNAME', value: 'firstName' },
                { name: 'LASTNAME', value: 'lastName' },
                { name: 'PHONE', value: 'mobilePhone' },
                { name: 'ACTION', value: 'action' },
            ]
        }
    },
    computed: {
        // memberList() {
        //     if (this.$store.getters['prefetchdatatest/members'].length == 0) return []
        //     return this.$store.getters['prefetchdatatest/members'];;kk
        // }
    },
    serverPrefetch () {
        console.log('server prefetching')
        return this.fetchMembers()
    },
    // mounted() {
    //     if ( this.$store.getters['prefetchdatatest/members'].length == 0) {
    //         this.fetchMembers();          
    //     }
    // },
    methods: {
        fetchMembers() {
            this.$store.dispatch('prefetchdatatest/getMembers').then(() => {
                this.memberList = this.$store.getters['prefetchdatatest/members']
            })
        }
    }
}
</script>