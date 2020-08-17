import RenovationBase from '../pages/renovation'
import Packets from '../pages/packets'

interface ISideMenuChildren {
  path: string,
  icon?: string,
  title: string,
  component: () => JSX.Element,
}

export interface ISideMenu {
  title: string,
  icon: string,
  children?: ISideMenuChildren[],
}

export const sideMenu: ISideMenu[] = [
{
  title: '装修',
  icon: 'pushpin',
  children: [
    { path: '/renovation/base', title: '硬装', component: RenovationBase },
  ],
},
{
  title: '记账',
  icon: 'money-collect',
  children: [
    { path: '/collect/packets', title: '压岁钱', component: Packets },
  ],
}]