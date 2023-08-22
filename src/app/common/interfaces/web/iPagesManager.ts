export interface IPagesManager {
    setPage(selectorTag: string, templatePage:string): Promise<void>;
}