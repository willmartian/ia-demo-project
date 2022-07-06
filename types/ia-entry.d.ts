import { LitElement, TemplateResult } from "lit";
import "./ia-loading.ts";
import "./ia-review.ts";
/**
 * Presents an item from the Internet Archive Metadata API
 */
export declare class MyElement extends LitElement {
    static styles: import("lit").CSSResult;
    private _id;
    private _metadataTask;
    private _relatedTask;
    connectedCallback(): void;
    private _formatValue;
    private _renderRelated;
    private _renderMetadata;
    render(): TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "ia-entry": MyElement;
    }
}
