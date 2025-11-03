export interface DashboardStats {
    totalEmployees: number;
    totalVisitors: {
        today: number;
        week: number;
        month: number;
        total: number;
    };
    totalEmployeeGatePasses: {
        today: number;
        week: number;
        month: number;
        total: number;
    };
    recentVisitors: VisitorInfo[];
    recentEmployeeGatePasses: EmployeeGatePassInfo[];
    recentEmployees: EmployeeInfo[];
    visitorsByDepartment: DepartmentStats[];
    visitorTrends: DailyVisitorCount[];
}

export interface VisitorInfo {
    VISITOR_NAME: string;
    COMPANY_NAME: string;
    GET_IN: string;
    TRAN_DATE: string;
    STATUS: 'APPROVED' | 'PENDING' | 'REJECTED';
    REMARK: string;
}

export interface EmployeeInfo {
    name: string;
    department: string;
    joinDate: Date;
    role: string;
}

export interface DepartmentStats {
    DEPARTMENT: string;
    COUNT: number;
    PERCENTAGE: number;
}

export interface DailyVisitorCount {
    date: string;
    count: number;
}

export interface EmployeeGatePassInfo {
    EMP_NAME: string;
    WORK: string;
    VISIT: string;
    OUT_TIME: string;
    IN_TIME: string;
    STATUS: string;
    TRAN_DATE: string;
}