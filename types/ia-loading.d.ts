import { LitElement } from "lit";
/**
 * Presents a loading spinner with the Internet Archive logo
 */
export declare class IALoadingElement extends LitElement {
    static styles: import("lit").CSSResult;
    error: boolean;
    message: string;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "ia-loading": IALoadingElement;
    }
}
