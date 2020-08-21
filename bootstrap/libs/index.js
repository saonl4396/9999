class Index{
    constructor(){
        this.list();
        // this.add();
         // 获取tbody
        this.tbody=document.querySelector('tbody');
         // 给保存绑定事件
        this.saveBtn = document.querySelector('#save');
        this.bindEve(this.saveBtn, 'click', this.add);
        this.sure=document.getElementById('sure-del');
        this.bindEve(this.sure,'click',this.sureDel);
        // 给修改的保存绑定事件
        this.update=document.getElementById('update-data');
        this.bindEve(this.update,'click',this.updateData); 
    }
    // 绑定事件的方法   第三个参数值得是是否支持冒泡 默认是true
    bindEve (ele, type, cb) {
        ele.addEventListener(type, cb);
      }
    list(){
      //
        ajax.get('../bootstrap./libs/index.php',{fn:'fnn'}).then(res=>{
            let {stateCode,data}=JSON.parse(res);
            if(stateCode==200){
                let str='';
                data.forEach(ele=>{
                  str += `<tr class="info-${ele.id}"><th scope = "row" >${ele.id} </th ><td>${ele.title}</td><td>${ele.pos}</td><td>${ele.idea}</td><td>  <button type="button" data-toggle="modal" data-target="#delModal" class="btn btn-primary btn-sm del-data" onclick="Index.del(${ele.id})">删除</button>&nbsp;&nbsp;<button type="button" class="btn btn-sm btn-warning" data-toggle="modal" data-target="#updateModal" onclick="Index.update(this)">修改</button></td></tr >`;
                  
                  
                })
                this.tbody.innerHTML=str;
            }
            }).catch(res=>{
                console.log(res);
            })
    }
    // 数据的添加
    add(){
        // console.log(111111)
        let title = document.querySelector('#title').value;
        let pos = document.querySelector('#pos').value;
        let idea = document.querySelector('#idea').value;
        // 有空就终止
        if (!title || !pos || !idea) return;
        // fn=add表示要请求php中的add方法
        ajax.post('../bootstrap./libs/index.php?fn=add', { title: title, pos: pos, idea: idea }).then(res => {
          //console.log(res);
          // 转化为对象
          // json parse----将json字符串转化为对象  json stringfy将json对象转化为字符串
          let { stateCode } = JSON.parse(res);
          if (stateCode == 200) {
            // 关闭模态框,刷新页面
            location.reload();
          }
    
    
        })
    }
    static del(id){
      console.log(id)
       // 将id追加到,关闭按钮上
       document.getElementById('sure-del').setAttribute('del-id', id);
    }
    // 确认删除方法
      sureDel(){
        // console.log(this);
        let id=this.getAttribute('del-id');
        ajax.get('../bootstrap./libs/index.php',{fn:'del',id:id}).then(res=>{
          console.log(res);
          let { stateCode } = JSON.parse(res);
         if (stateCode == 200) {
        // 刷新页面,获取数据
        // location.reload();
        // 1 关闭模态框
        $('#delModal').modal('toggle');
        // 2.将对应的节点删除
        let trObj=document.querySelector('.info-'+id);
        trObj.remove();
      }
        })
      }
      //  数据的修改
      static update(eleObj){
        // console.log(eleObj);
        // ----???????/  父节点-->子节点
        // 获取tr
        let trObj=eleObj.parentElement.parentElement;
        let tds=trObj.children;
        // console.log(trObj);
        // console.log(tds);
        // 获取td中的内容
        let id=tds[0].innerHTML;
        let title=tds[1].innerHTML;
        let pos=tds[2].innerHTML;
        let idea=tds[3].innerHTML;
        // console.log(id,title,pos,idea)
        // 将内容放置弹出框中
        let updateObj=document.querySelector('#updateModal');
        console.log(updateObj);
        // ???子节点
        updateObj.querySelector('#title').value=title;
        updateObj.querySelector('#pos').value=pos;
        updateObj.querySelector('#idea').value=idea;
        // 弹出框中追加id 方便后续修改数据库数据
        let inputObj=document.createElement('input');
        inputObj.type='hidden';
        inputObj.value=id;
        inputObj.className='hidden-id';
        updateObj.querySelector('form').appendChild(inputObj);

      }
      // 修改的方法
      updateData(){
        // 1.收集修改表单的数据
        let updateObj=document.querySelector('#updateModal');
        let title=updateObj.querySelector('#title').value;
        let pos=updateObj.querySelector('#pos').value;
        let idea=updateObj.querySelector('#idea').value;
        let id=updateObj.querySelector('.hidden-id').value;
        //console.log(title,pos,idea,id);
        // 发送请求，刷新页面
       
        ajax.post('../bootstrap./libs/index.php? fn=update',{
          title:title,pos:pos,idea:idea,id:id }).then(res=>{
          // console.log(res);
          
          // let {stateCode}=JSON.parse(res);
          // if(stateCode==200)location.reload();
          let { stateCode } = JSON.parse(res);
          if (stateCode == 200) location.reload();
        })
         
        
}     
}  
new Index();