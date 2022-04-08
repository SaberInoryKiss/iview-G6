<!--
 * @Author: 夏开尧
 * @Description: file content
 * @Date: 2019-08-26 19:29:46
 * @LastEditTime: 2020-07-29 15:09:43
 * @LastEditors: Please set LastEditors
 * @UpdateLogs: logs
 -->
<template>
    <div class="customers container">
        <div class="header clearfix">
            <h2>用户</h2>
            <div class="m-header">
                <!-- <Input 
                v-model="searchText"
                class="global-search-input"
                suffix="ios-search"
                placeholder="请输入">
            </Input> -->
            <Input 
                style="width: 400px"
                v-model="searchText"
                search
                icon="ios-search"
                @on-enter="searchName"
                @on-click="searchName"
                placeholder="请输入用户名">
            </Input>
            <Button  
                shape="circle" type="primary"
                style="margin-left:10px;margin-right: 10px;" 
                @click="getCustomers" 
                icon="md-refresh"
                class="refresh-btn"
                >刷新</Button>
            <Button 
                icon="md-add"
                type="primary"
                @click="showAddModal"
                class="normal-btn"
                >用户添加</Button>
            </div>
        </div>
        <Table 
            height="600"
            :columns="showColumns" 
            :data="showDevices"
            :noDataText="noDataText"
            :stripe="true">
        </Table>
        <Page 
            style="marginTop:20px"
            :total="showData.length"
            show-sizer 
            show-total
            :page-size-opts="[10,25,50,100]"
            @on-change="changePage"
            @on-page-size-change="changePageSize"
        />
        <Modal 
            v-model="isModal"
            :styles="{top:'60px'}" >
            <p slot="header" style="font-size:16px">
                <span>{{modalStatus=='add'?'添加':'编辑'}}用户</span>
            </p>
            <Form label-position="left"  :label-width="100">
                <FormItem 
                    :label="item.label"
                    v-for="item of modalItem" 
                    :key="item.label">
                    <Input 
                        :type="item.type || 'text'" 
                        v-model="item.value" 
                        style="width:300px" />
                </FormItem>
            </Form>
            <div slot="footer">
                <slot name="footer">
                    <Button type="text" size="large" @click="cancel">取消</Button>
                    <Button type="primary" size="large" @click="clickModalEvent">提交</Button>
                </slot>
            </div>
        </Modal>
    </div>
</template>

<script>

import isFilter from '@/utils/IsFilter'
export default {
  name: 'hello',
  data () {
    return {
        showColumns: [
            {
                title: '用户名',
                key: 'name',
                sortable: true
            },
            {
                title: '电话',
                key: 'phone'
            },
            {
                title: '邮箱',
                key: 'email',
            },
            {
                title: 'Action',
                key: 'action',
                width: 150,
                align: 'center',
                render: (h, params) => {
                    return h('div', [
                        h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    // console.log(params.index)
                                    // console.log(this.currentPage)
                                    // console.log( this.currentPageSize)
                                    // this.show(params.index)
                                    const index = params.index + this.currentPage * this.currentPageSize
                                    // console.log(index)
                                    this.show(index)
                                }
                            }
                        }, '详情'),
                        h('Button', {
                            props: {
                                type: 'info',
                                size: 'small'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    const userData = params.row
                                    this.showEditModal(userData)
                                }
                            }
                        }, '编辑'),
                        h('Button', {
                            props: {
                                type: 'error',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                    // this.remove(params.index)
                                    const userId = params.row.id
                                    // console.log(params.row)
                                    this.deleteUser(userId)
                                }
                            }
                        }, '删除 ')
                    ]);
                }
            }
        ],
        modalItem: [
            {
                label: '用户名',
                value: '',
            },
            {
                label: '电话',
                value: '',
            },
            {
                label: '邮箱',
                value: '',
            },
            {
                label: '学历',
                value: '',
            },
            {
                label: '毕业学校',
                value: '',
            },
            {
                label: '职业',
                value: '',
            },
            {
                label: '个人简介',
                value: '',
            }
        ],
        modalStatus: 'add',
        isModal: false,
        showData:[],
        searchText:"",
        currentPage: 0,
        currentPageSize: 10,
        // filter:[],
        noDataText: '<span>当前页面暂无数据~</span>', 
    }
  },
  computed: {
    showDevices() {
        //再截取数据分页展示
        const startIndex = this.currentPage * this.currentPageSize;
        const endIndex = startIndex + this.currentPageSize;
        return this.showData.slice(startIndex, endIndex);
    },
  },
    methods:{
        //切换页码
        changePage(num) {
            this.currentPage = num -1
        },
        //切换页数
        changePageSize(num) {
            this.currentPageSize = num 
        },
        getCustomers(){
        this.$axios.get("api/api/netflow/v1/xky/getAllUserInformation")
            .then((res) => {
                // console.log(res)
                if(res.statusText == 'OK') {
                    // this.$Message.success('刷新成功');
                    this.showData = res.data
                    } else {
                    this.showData = []
                    this.$Message.error('当前页面没有用户信息');
                }
            })
        },
        show (index) {
            this.$Modal.info({
                title: '详细信息',
                content: `
                用户名：${this.showData[index].name}<br>
                电话：${this.showData[index].phone}<br>
                邮箱：${this.showData[index].email}<br>
                学历：${this.showData[index].education}<br>
                毕业学校：${this.showData[index].graduationschool}<br>
                职业：${this.showData[index].profession}<br>
                个人简介：${this.showData[index].profile}<br>
                `
            })
        },
        searchName() {
            const name = this.searchText
            if(name == ''){
                this.getCustomers()
            }else{
                this.$axios.get("api/api/netflow/v1/xky/getUserInformationByName/"+name)
                .then(res => {
                    // console.log(res)
                    if(res.statusText == 'OK') {
                        // this.$Message.success('刷新成功');
                        this.showData = res.data
                    } else {
                        this.showData = []
                        this.$Message.error('当前页面没有用户信息');
                    }
                })
            }
        },
        deleteUser(userId) {
            this.$Modal.confirm({
                title: '删除提醒',
                content: '是否删除用户？',
                closable: true,
                onOk: () => {
                    this.$axios.delete("api/api/netflow/v1/xky/delete/"+userId)
                    .then(res => {
                        this.$Message.success('删除用户成功');
                        this.getCustomers()
                        })
                    .catch(err => {
                        console.log(err)
                        this.$Message.error('删除失败');
                    })
                }
            })
        },
        cancel() {
            this.isModal = false
        },
        clickModalEvent() {
            if(this.modalStatus == 'add') {
                return this.addUser()
            }
            else if(this.modalStatus == 'edit') {
                return this.upateUserConfig()
            }
        },
        showEditModal(userData) {
            //将modal状态变为edit修改用户信息
            this.modalStatus = 'edit'
            this.isModal = true
            //自动填入当前用户原有的信息
            this.modalItem[0].value = userData.name
            this.modalItem[1].value = userData.phone || ''
            this.modalItem[2].value = userData.email || ''
            this.modalItem[3].value = userData.education || ''
            this.modalItem[4].value = userData.graduationschool || ''
            this.modalItem[5].value = userData.profession || ''
            this.modalItem[6].value = userData.profile || ''
            this.userData = userData     
        },
        upateUserConfig() { 
            const Id = this.userData.id
            const updateCustomer = {    
                name:this.modalItem[0].value,
                phone: this.modalItem[1].value,
                email:this.modalItem[2].value,
                education:this.modalItem[3].value,
                graduationschool:this.modalItem[4].value,
                profession:this.modalItem[5].value,
                profile:this.modalItem[6].value
            }
            // console.log(updateCustomer)
            this.$axios.put("api/api/netflow/v1/xky/update/"+Id,updateCustomer)
            .then((response) => {
                this.isModal = false
                this.getCustomers()
                this.$Message.success('编辑成功');
                // console.log(response);
            })
            .catch(err => {
                console.log(err)
                this.$Message.error('编辑失败');
            })
        },
        showAddModal() {
            this.isModal=true
            //将moadal状态变为add添加用户
            this.modalStatus = 'add'
             //清空当前用户所有的信息
            this.modalItem.forEach(a => a.value='')
        },
        //添加用户请求后台接口
        addUser() {
            const updateCustomer = {    
                name:this.modalItem[0].value,
                phone: this.modalItem[1].value,
                email:this.modalItem[2].value,
                education:this.modalItem[3].value,
                graduationschool:this.modalItem[4].value,
                profession:this.modalItem[5].value,
                profile:this.modalItem[6].value
            }
            this.$axios.post("api/api/netflow/v1/xky/add",updateCustomer)
            .then((response) => {
                this.isModal = false
                this.getCustomers()
                this.$Message.success('添加用户成功');
            })
            .catch(err => {
                console.log(err)
                this.$Message.error('添加用户失败');
            })
        },
        
    },
    created(){
        if (this.$route.query.alert) {
            this.alert = this.$route.query.alert;
        }
        this.getCustomers();
    },
  
}
</script>
<style>
.container .ivu-table-cell {
    display: unset;
}
.ivu-dropdown {
    float: right;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style style='css' scoped>
.customers {
    margin: 20px 200px 20px 20px;
}
.page-header{
    display: inline-block;
    margin:0 auto;
}
.header{
    overflow: hidden;
    display: flex; 
    align-items: center; 
    /* justify-content: center;  */
    justify-content:flex-start
}
.header h2{
    padding: 35px 20px;
    display: flex;
    align-items: center;
    font-family: "PingFang SC";
    font-size: 16px;
    color: #464c5b;
}
.m-header {
    display: flex;
}
/* .drop-down {
    display: inline-flex;
} */
</style>
