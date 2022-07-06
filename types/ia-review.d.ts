import { LitElement } from "lit";
/**
 * Presents a review from the Internet Archive API
 */
export declare class ReviewElement extends LitElement {
    static styles: import("lit").CSSResult;
    /**
     * The author of the review.
     */
    reviewer: string;
    /**
     * When the review was posted.
     */
    reviewdate: string;
    /**
     * The main content of the review.
     */
    reviewbody: string;
    /**
     * The subject line of the review.
     */
    reviewtitle: string;
    stars: number;
    private formatDate;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "ia-review": ReviewElement;
    }
}
