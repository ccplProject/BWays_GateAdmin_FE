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
    id: '',
    title: '',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        classes: 'nav-item',
        url: '/dashboard',
        icon: 'dashboard',
      },
      {
        id: 'system',
        title: 'System',
        type: 'collapse',
        classes: 'nav-item',
        icon: 'dashboard',
        children: [
          {
            id: 'emp',
            title: 'Employee',
            type: 'item',
            classes: 'nav-item',
            url: '/pages/smart_table/1',
            icon: 'dashboard'
          },
          {
            id: 'emp',
            title: 'Department',
            type: 'item',
            classes: 'nav-item',
            url: '/pages/smart_table/2',
            icon: 'dashboard'
          },
          {
            id: 'qr',
            title: 'Print QR',
            type: 'item',
            classes: 'nav-item',
            url: '/pages/print-qr',
            icon: 'dashboard'
          },
        ]
      },
       
      {
        id: 'report',
        title: 'Report',
        type: 'collapse',
        classes: 'nav-item',
        icon: 'dashboard', 
        children: [
          {
            id: 'visitor-report',
            title: 'Visitor Report',
            type: 'item',
            classes: 'nav-item',
            url: '/pages/report/visitor-report', 
            icon: 'dashboard'
          },
          {
            id: 'employee-report',
            title: 'Employee Report',
            type: 'item',
            classes: 'nav-item',
            url: '/pages/report/employee-report',
            icon: 'dashboard'
          }
        ]
      }      
    ]
  },
];
