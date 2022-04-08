<!--
 * @Author: 夏开尧
 * @Description: file content
 * @Date: 2019-08-27 15:22:35
 * @LastEditTime: 2022-01-19 11:21:14
 * @LastEditors: 夏开尧
 * @UpdateLogs: logs
 -->
<template>
    <div class="sign">
        <vue-particles
            color="#7FB6F5"
            :particleOpacity="0.6"
            :particlesNumber="200"
            shapeType="star"
            :particleSize="4"
            linesColor="#FF8ED8"
            :linesWidth="1"
            :lineLinked="true"
            :lineOpacity="0.4"
            :linesDistance="150"
            :moveSpeed="4"
            :hoverEffect="true"
            hoverMode="grab"
            :clickEffect="true"
            clickMode="push"
            style="width: 100%;height: 100vh;"
        >
      </vue-particles>
        <div class="sign_bg">
            <!-- <img src="~@/assets/logo.png" class="sign_logo"> -->
                <div class="login_box">
                    <div class="login_box_inner">
                        <div class="login_box_title">
                            <p class="box_title_item"><strong>后台管理系统</strong></p>
                            <p class="box_title_item font-14">The Backstage Management System</p>
                        </div>
                        <div class="login_box_body">
                            <Input 
                                v-model.trim="username" 
                                class="input_item" 
                                clearable 
                                size="large" 
                                ref="username" 
                                @on-enter="toPassWord" 
                                placeholder="请输入用户名"/>
                            <Input 
                                v-model.trim="password" 
                                class="input_item" 
                                type="password" 
                                clearable 
                                size="large" 
                                @on-enter="login" 
                                ref="password" 
                                placeholder="请输入密码"/>
                            <Button @click="login" type="primary" long size="large">登录</Button>
                        </div>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data () {
        return {
            username: '',
            password: '',
        }
    },        
    methods: {
        checkLogin(username,password) {
            const isValueNull = () => {
                if(username) {  
                    if(password) {
                        return true
                    }
                    else {
                        return 'noPassWord'
                    }
                }
                else {
                    return 'noUserName'
                }
            }
            return new Promise((resolve,reject) => {
                if(isValueNull() === true) {
                    resolve()
                }else{
                    reject(isValueNull())
                }
            })
        },
        toPassWord() {
            if (!this.username) {
                this.$Message.error("请填写用户名称")//iview的写法
                this.$refs.username.focus()
            } else if (!this.password) {
                this.$Message.error("请填写密码")
                this.$refs.password.focus()
            } 
        },
        login (){
            this.$router.push('/home')
            // this.checkLogin(this.username,this.password)
            // // console.log(this.checkLogin(this.username,this.password))
            
            // .then(() => {
            //     // const data = {
            //     //     username: this.username,
            //     //     password: this.password 
            //     // }
            //     // const username = this.username,
            //     // const password = this.password
            //     const username = this.username
            //     const password = this.password
            //     //请求接口，根据不同返回状态给出相应的提示
            //     // this.$axios.post('/api/netflow/v1/xky/login/admin/zhang',data)
            //     // console.log('/api/netflow/v1/xky/login/'+username+'/'+password)
            //     this.$axios.post('api/api/netflow/v1/xky/login/'+username+'/'+password)

            //     // console.log(data)
            //         .then( res => {
            //             console.log(res)
            //             const code = res.data.code
            //             // console.log(code)
            //             if(code == '0000'){
            //                 this.$Notice.success({
            //                     title: '登陆提示',
            //                     desc: '登录成功！'
            //                 })
            //                 this.$router.push('/home')
            //             }
            //             else {
            //                 this.$Notice.error({
            //                     title: '登录失败',
            //                     desc: res.data.errMsg
            //                 })
            //             }
            //         })
            //         .catch( error => {
            //             console.log(error.response)
            //             console.log(error.message)
            //             this.$Notice.error({
            //                 title: '登陆提示',
            //                 desc: '登陆失败！'
            //             })
            //         })
            // })
            // .catch(err => {
            //     const msg = err =='noUserName'?'用户名为空！':'密码为空！'
            //     if(!this.password){
            //         this.$Notice.error({
            //             title: '登陆提示',
            //             desc: msg
            //         })
            //     }
            // })
        }
    }
}
</script>

<style lang="css" scoped>
.sign{
    width:100%;
    height:100vh;
    /* 去除浮动 */
    overflow:hidden;
    /* css linear-gradient() 函数 渐变色从左到右 */
    background: -webkit-linear-gradient(left, #4ABFFF, #3733E4);
    background: -o-linear-gradient(right, #4ABFFF, #3733E4);
    background: -moz-linear-gradient(right, #4ABFFF, #3733E4);
    background: linear-gradient(to right, #4ABFFF, #3733E4);
    /* background: url('~@/assets/bg7.png') no-repeat;
    background-position: 75% 25%;
    background-size:cover; */
}
.sign_bg {
    width:100%;
    height:100vh;
    overflow:hidden;
    padding: 10% 0;
}
.sign_logo{
    /* 绝对定位 */
    position: absolute;
    left: 135px;
    top: 63px;
    width: 144px;
    height: 27px;
}
.login_box{
    position: absolute;
    top: 30%;
    left: 65%;
    width: 20%;
    height: 240px;
}
.login_box_inner {
    width: 100%;
}
.login_box_title{
    text-align: center;
    margin-bottom: 24px;
    color: #fff;
}
.box_title_item{
    font-size: 20px;
    /*font-weight: bold;*/
}
.font-14{
    /* 在firefox,opera,chrome中，这些浏览器支持!important属性，也就是说他们会默认让font-size: 14px !important; 
    这条语句生效，下面的不带!important声明的样式将不会覆盖它，换句话说就是他的级别最高，下面的人都不能取代我！ */
    font-size: 14px !important;
}
.input_item{
    margin-bottom: 24px;
}

</style>