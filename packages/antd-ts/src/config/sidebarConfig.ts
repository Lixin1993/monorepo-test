import RenovationBase from '../pages/renovation/RenovationBase/index'
import RenovationSoft from '../pages/renovation/RenovationSoft'
import Team1 from '../pages/team/Team_1'
import Team2 from '../pages/team/Team_2'

interface ISideMenuChildren {
  path: string,
  icon: string,
  title: string,
  component: () => Element,
}

export interface ISideMenu {
  title: string,
  icon: string,
  children: ISideMenuChildren,
}

export const sideMenu = [{
  title: '装修',
  icon: 'pushpin',
  children: [
    { path: '/renovation/base', title: '硬装', component: RenovationBase },
    { path: '/renovation/soft', title: '软装', component: RenovationSoft }
  ],
}]