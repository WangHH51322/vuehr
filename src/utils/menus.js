import {getRequest} from "./api";
import format from "element-ui/src/locale/format";

/*菜单初始化的方法*/
export const initMenu=(router,store)=>{
  if (store.state.routes.length > 0){
    return;
  }
  getRequest("/api/system/config/menu").then(data=>{
    if (data){
      let fmtRoutes = formatRoutes(data);
      router.addRoutes(fmtRoutes);
      store.commit('initRoutes',fmtRoutes)
    }
  })
}

export const formatRoutes = (routes) =>{
  let fmRoutes = [];
  routes.forEach(router=>{
    let {
      path,
      component,
      name,
      meta,
      iconCls,
      children
    } = router;
    if (children && children instanceof Array){
      children = formatRoutes(children);
    }
    let fmRouter={
      path:path,
      name:name,
      iconCls:iconCls,
      meta:meta,
      children:children,
      component(resolve) {
        if (component.startsWith("Home")){
          require(['@/views/'+component],resolve);
        }else if (component.startsWith("Emp")){
          require(['@/views/emp/'+component],resolve);
        }else if (component.startsWith("Per")){
          require(['@/views/per/'+component],resolve);
        }else if (component.startsWith("Sal")){
          require(['@/views/sal/'+component],resolve);
        }else if (component.startsWith("Sta")){
          require(['@/views/sta/'+component],resolve);
        }else if (component.startsWith("Sys")){
          require(['@/views/sys/'+component],resolve);
        }
      }
    }
    fmRoutes.push(fmRouter)
  })
  return fmRoutes;
}
