export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  groupClasses?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  link?: string;
  description?: string;
  path?: string;
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'default',
        title: 'Default',
        type: 'item',
        classes: 'nav-item',
        url: '/dashboard',
        icon: 'dashboard',
        breadcrumbs: false
      }
    ]
  },
  // {
  //   id: 'authentication',
  //   title: 'Authentication',
  //   type: 'group',
  //   icon: 'icon-navigation',
  //   children: [
  //     {
  //       id: 'login',
  //       title: 'Login',
  //       type: 'item',
  //       classes: 'nav-item',
  //       url: '/login',
  //       icon: 'login',
  //       target: true,
  //       breadcrumbs: false
  //     },
  //     {
  //       id: 'register',
  //       title: 'Register',
  //       type: 'item',
  //       classes: 'nav-item',
  //       url: '/register',
  //       icon: 'profile',
  //       target: true,
  //       breadcrumbs: false
  //     }
  //   ]
  // },
  {
    id: 'utilities',
    title: 'Master & Transaction',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'patient',
        title: 'Patient',
        type: 'item',
        classes: 'nav-item',
        // url: '/patient',
        url: '/smart_table/1',
        icon: 'font-size'
      },
      {
        id: 'medicine',
        title: 'Medicine',
        type: 'item',
        classes: 'nav-item',
        url: '/smart_table/2',
        icon: 'font-size'
      },
      {
        id: 'precription',
        title: 'Prescription',
        type: 'item',
        classes: 'nav-item',
        url: '/smart_table/3',
        icon: 'font-size'
      },
      {
        id: 'appointment',
        title: 'Appointment',
        type: 'item',
        classes: 'nav-item',
        url: '/smart_table/4',
        icon: 'font-size'
      },
      {
        id: 'users',
        title: 'Users',
        type: 'item',
        classes: 'nav-item',
        url: '/smart_table/5',
        icon: 'font-size'
      },
    ]
  },
  {
    id: 'utilities',
    title: 'Reports',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'patient_list',
        title: 'Patient List',
        type: 'item',
        classes: 'nav-item',
        url: '/report/patient-list',
        icon: 'font-size'
      },
      {
        id: 'medicine_list',
        title: 'Medicine List',
        type: 'item',
        classes: 'nav-item',
        url: '/report/medicine-list',
        icon: 'font-size'
      },
      {
        id: 'users_list',
        title: 'Users List',
        type: 'item',
        classes: 'nav-item',
        url: '/report/users-list',
        icon: 'font-size'
      },
      {
        id: 'patient_history',
        title: 'Patient History',
        type: 'item',
        classes: 'nav-item',
        url: '/report/patient-history',
        icon: 'font-size'
      },
      {
        id: 'appointment_list',
        title: 'Appointment List',
        type: 'item',
        classes: 'nav-item',
        url: '/report/appointment-list',
        icon: 'font-size'
      },
    ]
  }

  // {
  //   id: 'other',
  //   title: 'Other',
  //   type: 'group',
  //   icon: 'icon-navigation',
  //   children: [
  //     {
  //       id: 'sample-page',
  //       title: 'Sample Page',
  //       type: 'item',
  //       url: '/sample-page',
  //       classes: 'nav-item',
  //       icon: 'chrome'
  //     },
  //     {
  //       id: 'document',
  //       title: 'Document',
  //       type: 'item',
  //       classes: 'nav-item',
  //       url: 'https://codedthemes.gitbook.io/mantis-angular/',
  //       icon: 'question',
  //       target: true,
  //       external: true
  //     }
  //   ]
  // }
];
