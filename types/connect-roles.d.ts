declare class ConnectRoles
{
    constructor(options: any);
    functionList: any;
    failureHandler: any;
    async: any;
    userProperty: any;
    matchRelativePaths: any;
    can(action: any): any;
    is(action: any): any;
    isAuthenticated(): any;
    middleware(options: any): any;
    test(req: any, action: any): any;
    use(...args: any[]): void;
    use1(fn: any): void;
    use2(action: any, fn: any): void;
    use3(action: any, path: any, fn: any): void;
}
export { ConnectRoles };
