
import { getAllNav } from '@/request/menu'



export function mapMenu(menuList: any) {		//menuList 传入后台接口返回的路由列表
  //最终动态添加路由返回数组
  const routerList = []
  for (const item of menuList) {
    const UrlSplit = item.nUrl.split('/')
    routerList.push({
      path: `${UrlSplit[0]}`,
      name: `${UrlSplit[0]}`,
      component: () => import(`@/views/${item.nUrl}`),
      meta: {
        icon: 'icon-gongsi',
        title: `${item.nName}`
      }
    })
  }
  return routerList
}
