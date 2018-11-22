<template>
    <el-container class="m-index-page">
        <el-header class="m-header">
            <el-menu 
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                @select="selectMenu"
            >
                <div class="m-logo">MEYO页面搭建系统</div>
                <el-menu-item index="1">管理Proto</el-menu-item>
            </el-menu>
        </el-header>
        <el-container class="m-content">
            <el-aside width="200px">
                <el-menu 
                    default-active="1-4-1" 
                    class="m-left-menu" 
                    :collapse="false"
                    @select="selectMenu">
                    <el-menu-item index="1">
                        <i class="el-icon-circle-plus"></i>
                        <span slot="title">新建原型</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">管理模块原型</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-document"></i>
                        <span slot="title">管理页面原型</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>{{ dialogVisible }}</el-main>
        </el-container>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%">
            <el-form 
                ref="form"
                :model="form"
                :rules="rules"
                label-width="80px">
                <el-form-item 
                    label="原型类型"
                    required
                    prop="type">
                    <el-radio-group v-model="form.type">
                        <el-radio label="模块原型" value="module"></el-radio>
                        <el-radio label="页面原型" value="page"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item 
                    label="原型名称" 
                    required
                    prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item 
                    label="原型描述" 
                    required
                    prop="desc">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleNewProto">确 定</el-button>
            </span>
        </el-dialog>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            dialogVisible: false,
            form: {
                type: '',
                name: '',
                desc: ''
            },
            rules: {
                type: [
                    { required: true, message: '请选择原型类型', trigger: 'blur' },
                ],
                name: [
                    { required: true, message: '请输入原型名称', trigger: 'blur' },
                ],
                desc: [
                    { required: true, message: '请输入原型描述', trigger: 'blur' },
                ]
            }
        };
    },
    methods: {
        startHacking() {
            this.$notify({
                title: "It works!",
                type: "success",
                message:
                "We've laid the ground work for you. It's time for you to build something epic!",
                duration: 5000
            });
        },
        selectMenu(e) {
            if(e == 1){
                //点击新建按钮
                this.dialogVisible = true;
            }
            console.log(e);
        },
        handleNewProto() {
            this.$refs.form.validate(valid => {
                console.log(valid);
                if(valid){
                    this.dialogVisible = false;
                }else{
                    
                }
            });
        },

    }
};
</script>

<style lang="less">
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}

html, body {
    width: 100%;
    height: 100%;
    margin: 0;
}

.m-index-page {
    height: 100%;
}

.m-header {
    padding: 0;
}

.m-content {
    height: calc(100% - 60px);
    .m-left-menu {
        height: 100%;
    }
}

.m-logo {
    width: 200px;
    float: left;
    height: 60px;
    line-height: 60px;
    text-align: center;
}
</style>
